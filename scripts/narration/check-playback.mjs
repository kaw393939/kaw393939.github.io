// Exercise native media controls against this release's MP3s before the site is published.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const deps = createRequire(join(process.env.RUNNER_TEMP, 'portfolio-browser', 'package.json'))
const { chromium } = deps('playwright-core')
const port = 4183
const origin = 'http://127.0.0.1:' + port
const localMedia = 'docs/.vitepress/dist/listen'
const playerSelector = '.article-narration audio'
const samples = [
  { publication: 'journal', route: '/teaching/when-ai-helps-write-the-code', kind: 'article', base: '' },
  { publication: 'lab', route: '/students/ai-costs', kind: 'chapter', base: '/knowledge-lab' }
]

async function recordingFor(sample) {
  const manifest = JSON.parse(await readFile(join(localMedia, sample.publication + '.json'), 'utf8'))
  const entry = manifest[sample.route]
  assert.ok(entry && Number.isFinite(entry.seconds) && entry.seconds > 4,
    'Missing installed recording for ' + sample.route + '. Run install.py --public-dir before this check.')
  const url = new URL(entry.src)
  assert.equal(url.origin, 'https://keithwilliams.org')
  assert.match(url.pathname, /^\/listen\/audio\/[\w-]+\.mp3$/)
  return { ...entry, url }
}

async function focusUsingTab(page, player) {
  // Start at the preceding visible control. The Lab sidebar can have dozens of unrelated links.
  const preceding = await player.evaluateHandle(audio => {
    const candidates = document.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')
    return Array.from(candidates).filter(el =>
      (el.compareDocumentPosition(audio) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      el.tabIndex >= 0 && !el.matches(':disabled, [inert], [inert] *') && el.checkVisibility()).at(-1)
  })
  try {
    await preceding.asElement()?.focus()
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      if (await player.evaluate(el => el.matches(':focus-within'))) return
    }
    throw new Error('Tab did not reach the native player from the preceding control.')
  } finally {
    await preceding.dispose()
  }
}

async function testPlayback(browser, sample, track, width) {
  const phone = width === 390
  const context = await browser.newContext({
    viewport: { width, height: 900 }, isMobile: phone, hasTouch: phone,
    reducedMotion: 'reduce', serviceWorkers: 'block'
  })
  const page = await context.newPage()
  page.setDefaultTimeout(8000)
  const requests = []
  const responses = []
  const errors = []
  const player = page.locator(playerSelector)
  const label = width + 'px ' + sample.base + sample.route

  try {
    // Chromium still sees the published HTTPS media URL. Get its bytes and Range headers from
    // the local preview so an old live recording cannot accidentally satisfy this release test.
    await context.route('**/*', async route => {
      const req = route.request()
      if (new URL(req.url()).origin === origin) return route.continue()
      if (req.url() !== track.src) return route.abort('blockedbyclient')
      const range = req.headers().range
      requests.push(range || 'full')
      try {
        const response = await context.request.get(origin + track.url.pathname, {
          headers: range ? { Range: range } : {}, timeout: 15000
        })
        try {
          responses.push({ status: response.status(), range: range || null })
          assert.equal(response.status(), range ? 206 : 200, 'Local candidate media HTTP status')
          assert.match(response.headers()['content-type'] || '', /^audio\/(mpeg|mp3)\b/i)
          if (range) assert.match(response.headers()['content-range'] || '', /^bytes \d+-\d+\/\d+$/)
          await route.fulfill({ response })
        } finally {
          await response.dispose()
        }
      } catch (error) {
        errors.push(error.message)
        await route.abort().catch(() => {})
      }
    })

    await page.goto(origin + sample.base + sample.route, { waitUntil: 'networkidle', timeout: 20000 })
    await player.waitFor({ state: 'visible' })
    const title = 'Listen to the ' + sample.kind
    assert.equal(await player.count(), 1)
    assert.equal(await player.getAttribute('src'), track.src)
    assert.equal(await page.getByLabel(title, { exact: true }).count(), 1, 'Missing accessible player label')
    const descriptions = (await player.getAttribute('aria-describedby') || '').split(/\s+/)
    assert.ok(descriptions.includes('narration-details') && descriptions.includes('narration-text'),
      'The player must announce the voice, duration and full-text location')
    assert.match(await page.locator('#narration-details').innerText(), /AI-narrated.+\d/)
    assert.equal(await page.locator('#narration-text').innerText(), 'Read the full text below.')
    await player.scrollIntoViewIfNeeded()
    const bounds = await player.boundingBox()
    assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width + 1, 'Native controls overflow the viewport')
    assert.ok(await player.evaluate(a => a.controls && a.preload === 'none' && !a.autoplay &&
      a.paused && a.currentTime === 0 && a.readyState === HTMLMediaElement.HAVE_NOTHING))
    assert.equal(requests.length, 0, 'Chromium requested recording bytes before any play gesture')

    await focusUsingTab(page, player)
    // Use the real native play/pause button on touch and the focused player on desktop.
    const toggle = phone
      ? () => player.tap({ position: { x: 26, y: Math.floor(bounds.height / 2) } })
      : () => page.keyboard.press('Space')
    await toggle()
    await page.waitForFunction(sel => {
      const a = document.querySelector(sel)
      return !a.paused && a.currentTime >= .25 && Number.isFinite(a.duration)
    }, playerSelector, { timeout: 15000 })
    const duration = await player.evaluate(a => a.duration)
    assert.ok(Math.abs(duration - track.seconds) <= 2, 'Manifest duration differs from decoded audio: ' + duration)
    assert.ok(responses.length > 0, 'Playback did not use candidate recording bytes')

    await toggle()
    await page.waitForFunction(sel => document.querySelector(sel).paused, playerSelector, { timeout: 3000 })
    const pausedAt = await player.evaluate(a => a.currentTime)
    await delay(220)
    assert.ok(Math.abs(await player.evaluate(a => a.currentTime) - pausedAt) < .08, 'Paused playback kept advancing')

    const target = Math.floor(duration * .6)
    await player.evaluate((a, time) => { a.currentTime = time }, target)
    await page.waitForFunction(([sel, time]) => {
      const a = document.querySelector(sel)
      return a.paused && !a.seeking && a.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        Math.abs(a.currentTime - time) < .75
    }, [playerSelector, target], { timeout: 10000 })
    await toggle()
    await page.waitForFunction(([sel, time]) => {
      const a = document.querySelector(sel)
      return !a.paused && a.currentTime > time + .2
    }, [playerSelector, target], { timeout: 10000 })
    await player.evaluate(a => a.pause())
    assert.deepEqual(errors, [])

    await page.emulateMedia({ media: 'print' })
    assert.ok(await player.isHidden(), 'Interactive audio should be hidden in print')
    assert.ok(await page.getByRole('heading', { level: 1 }).first().isVisible(), 'The printed article needs its title')
    console.log('PASS ' + label + ': keyboard focus, on-demand playback, pause, seek and print.')
  } catch (error) {
    const state = await player.evaluate(a => ({
      src: a.currentSrc || a.src, paused: a.paused, position: a.currentTime,
      duration: a.duration, ready: a.readyState, network: a.networkState,
      mediaError: a.error && { code: a.error.code, message: a.error.message }
    })).catch(() => null)
    throw new Error(label + ': ' + error.message + '\n' + JSON.stringify({ state, requests, responses, errors }), { cause: error })
  } finally {
    await context.close()
  }
}

const tracks = await Promise.all(samples.map(recordingFor))
const preview = spawn(process.execPath, ['node_modules/vitepress/bin/vitepress.js', 'preview', 'docs', '--port', String(port)],
  { stdio: ['ignore', 'ignore', 'inherit'] })
let browser
try {
  let ready = false
  for (let i = 0; i < 60; i++) {
    if (preview.exitCode !== null) throw new Error('Site preview exited before playback checks, code ' + preview.exitCode)
    ready = await fetch(origin + '/listen/journal.json', { signal: AbortSignal.timeout(1500) })
      .then(res => res.ok).catch(() => false)
    if (ready) break
    await delay(250)
  }
  assert.ok(ready, 'Local preview did not serve installed narration manifests at ' + origin)
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', headless: true
  })
  for (const width of [390, 1440]) {
    for (const [i, sample] of samples.entries()) await testPlayback(browser, sample, tracks[i], width)
  }
} finally {
  await browser?.close()
  preview.kill()
}
