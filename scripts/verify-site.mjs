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

check('Homepage is pre-rendered with one H1 and verified identity', () => {
  assert.equal((home.match(/<h1\b/g) || []).length, 1)
  for (const text of ['Making AI', 'Keith Williams', 'Senior University Lecturer', 'B.S. Enterprise AI', 'consulting', 'Public on GitHub', 'student records']) assert.ok(home.includes(text), text)
  assert.ok(home.includes('<main'))
})
check('Project cases and historical experience include status and source links', () => {
  assert.equal((home.match(/class="project-case"/g) || []).length, 3)
  assert.equal((home.match(/class="experience-entry"/g) || []).length, 2)
  for (const text of ['Educational Design System', 'Everyday AI CLI', 'IS117 Brand Studio', 'First version published', 'Early release · v0.2.2', 'A classroom starting point', 'are planned', 'does not take payments or place orders']) assert.ok(home.includes(text), text)
  for (const url of [
    'https://github.com/kaw393939/educational-design-system',
    'https://github.com/kaw393939/everyday-ai-cli',
    'https://github.com/kaw393939/is117-brand-studio',
    'https://pypi.org/project/everydayai-cli/0.2.2/',
    'https://news.njit.edu/inspiring-students-njit-africa',
    'https://news.njit.edu/njit-lecturer-helps-digitize-government-services-zambia'
  ]) assert.ok(home.includes(`href="${url}"`), url)
})
check('Public copy explains people and purpose without implementation jargon', () => {
  for (const phrase of ['students, educators, and teams', 'Teaching takes enough preparation', 'Turn a recording into text', 'a plain white T-shirt']) assert.ok(home.includes(phrase), phrase)
  for (const phrase of ['Design tokens', 'typed page recipes', 'release-selected', 'observability', 'Spec-driven development', 'plugin architecture']) assert.ok(!home.includes(phrase), phrase)
})
check('Section anchors and accessible heading references resolve uniquely', () => {
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML id')
  for (const [, id] of home.matchAll(/href="\/?#([^"]+)"/g)) assert.ok(ids.includes(id), id)
  for (const [, references] of home.matchAll(/aria-labelledby="([^"]+)"/g)) {
    for (const id of references.split(' ')) assert.ok(ids.includes(id), id)
  }
  assert.ok(home.includes('href="#projects"'))
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
check('Responsive contact rules follow base rules and menu can scroll', () => {
  const css = readFileSync('docs/.vitepress/theme/style.css', 'utf8')
  assert.ok(css.search(/@media\s*\(max-width:\s*640px\)/) > css.indexOf('.contact-actions {'))
  assert.ok(css.includes('max-height: calc(100dvh - 72px)'))
  assert.ok(css.includes('overflow-y: auto'))
})
check('Supporting paragraphs do not inherit small eyebrow typography', () => {
  const css = readFileSync('docs/.vitepress/theme/style.css', 'utf8')
  for (const [, selector, declarations] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!selector.includes('p:not(.eyebrow)')) continue
    const size = declarations.match(/font-size:\s*(\d+)px/)
    if (size) assert.ok(Number(size[1]) >= 15, selector.trim())
  }
})
console.log(`\n${checks.length} static checks passed. Browser and real-device checks remain separate.`)
