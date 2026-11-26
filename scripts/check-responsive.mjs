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
    const columns = await page.locator('.journal-cards').first().evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(' ').length)
    assert.equal(columns, width <= 550 ? 1 : 2, 'Writing index column count')
    await open('/research/systems/personalized-knowledge-artifacts')
    const copy = page.getByRole('button', { name: 'Copy link' })
    await copy.click()
    if (width === 320) {
      const manual = page.getByRole('textbox', { name: 'Article link' })
      assert.ok(await manual.isVisible() && await manual.evaluate(field => field.selectionEnd === field.value.length && field.selectionStart === 0))
    } else {
      await page.locator('.share-feedback').filter({ hasText: 'Article link copied.' }).waitFor({ state: 'visible' })
    }
    assert.ok(await page.getByRole('link', { name: /Share on LinkedIn/ }).isVisible())

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
    console.log('PASS: ' + width + 'px navigation, author crop, article index, sharing and career evidence.')
  }
} finally {
  await browser?.close()
  preview.kill()
}
