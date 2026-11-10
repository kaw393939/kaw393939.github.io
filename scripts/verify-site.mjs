import assert from 'node:assert/strict'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('docs/.vitepress/dist')
const read = path => readFileSync(resolve(dist, path), 'utf8')
const home = read('index.html')
const error = read('404.html')
const sitemap = read('sitemap.xml')
const checks = []
function check(name, fn) { fn(); checks.push(name); console.log(`PASS ${name}`) }

check('Homepage is pre-rendered with one H1 and original content', () => {
  assert.equal((home.match(/<h1\b/g) || []).length, 1)
  for (const text of ['Exploring AI.', 'Keith Williams', 'Senior University Lecturer', 'B.S. Enterprise AI', 'Human judgment', 'Public on GitHub', 'student records']) assert.ok(home.includes(text), text)
  assert.ok(home.includes('<main'))
})
check('Unique title, canonical URL and share metadata', () => {
  assert.match(home, /<title>Keith Williams · AI educator &amp; explorer<\/title>/)
  assert.match(home, /rel="canonical" href="https:\/\/kaw393939.github.io\/"/)
  assert.match(home, /property="og:url" content="https:\/\/kaw393939.github.io\/"/)
  assert.ok(home.includes('name="description"'))
  assert.ok(home.includes('name="viewport"'))
  assert.ok(home.includes('lang="en-US"'))
})
check('Valid profile structured data', () => {
  const data = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(data['@type'], 'ProfilePage')
  assert.equal(data.mainEntity['@type'], 'Person')
  assert.equal(data.mainEntity.name, 'Keith Williams')
  assert.equal(data.mainEntity.sameAs.length, 2)
})
check('Sitemap excludes the error page; error page is noindex', () => {
  assert.ok(!sitemap.includes('/404'))
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1)
  assert.match(error, /name="robots" content="noindex, follow"/)
  assert.ok(!error.includes('rel="canonical"'))
  assert.ok(!error.includes('application/ld+json'))
  assert.ok(read('robots.txt').includes('Sitemap: https://kaw393939.github.io/sitemap.xml'))
})
check('All homepage images have alt text, dimensions, and responsive sources', () => {
  const images = home.match(/<img\b[^>]*>/g)
  assert.equal(images.length, 2)
  for (const img of images) {
    for (const attr of ['alt', 'width', 'height', 'srcset', 'sizes']) assert.match(img, new RegExp(`${attr}="[^\"]+"`))
    for (const match of img.matchAll(/\/(images\/[^\s",]+)/g)) assert.ok(existsSync(resolve(dist, match[1])), match[1])
  }
  assert.ok(images[0].includes('fetchpriority="high"'))
  assert.ok(images[1].includes('loading="lazy"'))
  assert.ok(statSync(resolve(dist, 'images/keith-williams-480.webp')).size < 60000)
  assert.ok(statSync(resolve(dist, 'images/explorer-horizon-480.webp')).size < 60000)
})
check('Accessible controls and reduced-motion support remain', () => {
  assert.ok(home.includes('class="skip-link"'))
  assert.ok(home.includes('aria-controls="site-nav"'))
  assert.ok(home.includes('aria-expanded="false"'))
  assert.ok(home.includes('aria-describedby="conversation-privacy"'))
  assert.ok(home.includes('id="main" tabindex="-1"'))
  const cssPath = home.match(/href="(\/assets\/style[^\"]+\.css)"/)[1].slice(1)
  assert.ok(read(cssPath).includes('prefers-reduced-motion:reduce'))
})
check('Muted text exceeds AA contrast for normal text', () => {
  const luminance = hex => {
    const rgb = hex.match(/[a-f0-9]{2}/gi).map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4)
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722
  }
  const css = readFileSync('docs/.vitepress/theme/style.css', 'utf8')
  const paper = css.match(/--paper:\s*(#[a-f0-9]+)/i)[1]
  const muted = css.match(/--muted:\s*(#[a-f0-9]+)/i)[1]
  assert.ok((luminance(paper) + .05) / (luminance(muted) + .05) >= 4.5)
})
console.log(`\n${checks.length} static checks passed. Browser and real-device checks remain separate.`)
