// Exercise the built portfolio in a clean browser. The CI runner supplies Chrome.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const deps = createRequire(join(process.env.RUNNER_TEMP, 'portfolio-browser', 'package.json'))
const { chromium } = deps('playwright-core')
const port = 4173
const origin = 'http://127.0.0.1:' + port
const profiles = new Map([
  ['GitHub', 'https://github.com/kaw393939'],
  ['LinkedIn', 'https://www.linkedin.com/in/keithwilliams5/']
])

async function checkProfiles(page, width) {
  for (const region of ['banner', 'contentinfo']) {
    const landmark = page.getByRole(region)
    for (const [name, href] of profiles) {
      const link = landmark.getByRole('link', { name: new RegExp(name, 'i') })
        .and(landmark.locator('a[rel~="me"]'))
      const label = width + 'px ' + region + ' ' + name + ' profile'
      assert.equal(await link.count(), 1, label + ' needs one named personal-profile link')
      assert.equal(await link.evaluate(el => el.href), href, label + ' destination')
      assert.ok(await link.isVisible(), label + ' must be visible')
      if (width <= 390 && region === 'banner') {
        const bounds = await link.boundingBox()
        assert.ok(bounds && bounds.x >= 0 && bounds.y >= 0 && bounds.x + bounds.width <= width + 1
          && bounds.y + bounds.height <= page.viewportSize().height, label + ' must be on screen with the menu closed')
      }
      assert.ok(await link.evaluate(el => el.tabIndex >= 0), label + ' must be keyboard reachable')
      await link.click({ trial: true })
    }
  }
}

async function checkArticleType(page, width) {
  const paragraph = '.story-intro ~ p'
  await page.evaluate(() => document.fonts.ready.then(() => true))
  const session = await page.context().newCDPSession(page)
  try {
    await session.send('DOM.enable')
    await session.send('CSS.enable')
    const { root } = await session.send('DOM.getDocument')
    for (const [selector, family] of [['main h1', 'Source Serif 4'], [paragraph, 'Source Serif 4'], ['.story-share a', 'Source Sans 3']]) {
      const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector })
      assert.ok(nodeId, 'Missing typography sample ' + selector)
      // Computed font-family alone also succeeds when a font download fails.
      const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId })
      assert.ok(fonts.some(font => font.isCustomFont && font.glyphCount > 0 && font.familyName.startsWith(family)),
        width + 'px ' + selector + ' must render ' + family + ', found ' + fonts.map(font => font.familyName).join(', '))
    }
  } finally {
    await session.detach()
  }
  if (width === 1440) {
    const measure = await page.locator(paragraph).first().evaluate(el => {
      const style = getComputedStyle(el)
      const ctx = document.createElement('canvas').getContext('2d')
      ctx.font = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily].join(' ')
      return (el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) / ctx.measureText('0').width
    })
    assert.ok(measure >= 45 && measure <= 82, 'Desktop article paragraph should have a readable line length, found ' + measure.toFixed(1) + 'ch')
    await page.emulateMedia({ media: 'print' })
    try {
      assert.ok(await page.getByRole('heading', { level: 1 }).isVisible(), 'Printed article needs its headline')
      const byline = page.locator('.story-intro .byline')
      assert.ok(await byline.isVisible() && /Keith Williams/i.test(await byline.innerText()), 'Printed article needs its author')
      assert.ok(await page.locator('header.site-header').isHidden(), 'Keep site navigation out of the printed article')
      assert.ok(await page.locator('.story-share').isHidden(), 'Keep interactive sharing controls out of the printed article')
    } finally {
      await page.emulateMedia({ media: 'screen' })
    }
  }
}

async function checkEditorialImage(image, width) {
  await image.scrollIntoViewIfNeeded()
  const selected = await image.evaluate(async img => {
    await img.decode()
    return { url: img.currentSrc, naturalWidth: img.naturalWidth }
  })
  assert.ok(selected.naturalWidth > 0, width + 'px editorial image must decode')
  assert.match(new URL(selected.url).pathname, /\.webp$/i, width + 'px browser should choose a WebP candidate')
}

const preview = spawn('node', ['node_modules/vitepress/bin/vitepress.js', 'preview', 'docs', '--port', String(port)], { stdio: 'ignore' })
let browser
try {
  for (let tries = 0; tries < 60; tries++) {
    if (await fetch(origin).then(r => r.ok).catch(() => false)) break
    await delay(250)
  }
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', headless: true
  })
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin })
    // Exercise the manual fallback in one viewport even on runners that allow copying.
    if (width === 320) await context.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: () => Promise.reject(new Error('Clipboard unavailable in this test'))
      } })
    })
    const page = await context.newPage()
    const fit = async path => {
      const geometry = await page.evaluate(() => ({
        available: document.documentElement.clientWidth, used: document.documentElement.scrollWidth
      }))
      assert.ok(geometry.used <= geometry.available + 1, width + 'px horizontal overflow on ' + path + ': ' + JSON.stringify(geometry))
    }
    const open = async path => {
      await page.goto(origin + path, { waitUntil: 'networkidle' })
      await fit(path)
    }

    await open('/')
    await checkEditorialImage(page.locator('.cover-image img'), width)
    const menu = page.getByRole('button', { name: /^Menu/ })
    if (width <= 800) {
      await menu.focus()
      await menu.press('Enter')
      assert.equal(await page.getByRole('button', { name: /^Close/ }).getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Escape')
      assert.ok(await menu.evaluate(button => document.activeElement === button))
      assert.equal(await menu.getAttribute('aria-expanded'), 'false')
    } else {
      assert.ok(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible())
    }
    await checkProfiles(page, width)
    const portrait = page.locator('.profile-image img')
    await portrait.scrollIntoViewIfNeeded()
    await portrait.evaluate(img => img.decode())
    assert.ok(await portrait.evaluate(img => {
      const bounds = img.getBoundingClientRect()
      return img.naturalWidth > 0 && bounds.width > 0 && bounds.width / bounds.height < 1.35
    }), 'Portrait crop should retain the head and shoulders')

    await open('/writing')
    const cards = page.locator('.journal-card')
    assert.ok(await cards.count() >= 14)
    await checkEditorialImage(cards.first().locator('img'), width)
    const columns = await page.locator('.journal-cards').first().evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(' ').length)
    assert.equal(columns, width <= 550 ? 1 : 2, 'Writing index column count')
    await open('/research/systems/personalized-knowledge-artifacts')
    await checkArticleType(page, width)
    await fit('article after fonts loaded')
    const copy = page.getByRole('button', { name: 'Copy link' })
    await copy.click()
    if (width === 320) {
      const manual = page.getByRole('textbox', { name: 'Article link' })
      assert.ok(await manual.isVisible() && await manual.evaluate(field => field.selectionEnd === field.value.length && field.selectionStart === 0))
    } else {
      await page.locator('.share-feedback').filter({ hasText: 'Article link copied.' }).waitFor({ state: 'visible' })
    }
    assert.ok(await page.getByRole('link', { name: /Share on LinkedIn/ }).isVisible())

    await open('/research/systems/dissertation-proposal')
    const contents = page.getByRole('navigation', { name: 'On this page' })
    const toggle = contents.locator('summary')
    await toggle.focus()
    await toggle.press('Enter')
    const methodology = contents.getByRole('link', { name: /methodology/i })
    assert.ok(await methodology.isVisible())
    const fragment = await methodology.getAttribute('href')
    await methodology.click()
    await page.waitForFunction(hash => {
      const heading = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (location.hash !== hash || heading?.tagName !== 'H2') return false
      const bounds = heading.getBoundingClientRect()
      return bounds.bottom > 0 && bounds.top < window.innerHeight
    }, fragment)
    const collection = page.getByRole('navigation', { name: 'Breadcrumb' })
      .getByRole('link', { name: 'Evidence-Governed AI Systems' })
    assert.equal(await collection.getAttribute('href'), '/research/systems/')
    await open('/ai-careers')
    const tables = page.locator('.table-scroll')
    assert.ok(await tables.count() > 0)
    if (width <= 390) {
      const scroll = page.locator('.table-scroll[tabindex="0"]').first()
      await scroll.waitFor({ state: 'visible' })
      await scroll.focus()
      await scroll.press('End')
      assert.ok(await scroll.evaluate(el => el.scrollWidth > el.clientWidth && !!el.getAttribute('aria-describedby')))
    }
    const evidence = page.locator('details.career-evidence').first()
    await evidence.locator('summary').click()
    assert.ok(await evidence.getAttribute('open') !== null)
    assert.ok(await page.locator('meter').first().getAttribute('aria-label'))
    await fit('/ai-careers after expanding evidence')
    assert.ok(await page.locator('footer').getByRole('link', { name: 'Site notes' }).isVisible())
    await context.close()
    console.log('PASS: ' + width + 'px navigation, profiles, author crop, index, article typography, sharing and career evidence.')
  }
} finally {
  await browser?.close()
  preview.kill()
}
