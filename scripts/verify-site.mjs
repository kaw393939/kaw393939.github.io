import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('docs/.vitepress/dist')
const read = path => readFileSync(resolve(dist, path), 'utf8')
const home = read('index.html')
const error = read('404.html')
const sitemap = read('sitemap.xml')
const guide = read('life-tracker.html')
const starter = read('life-tracker-starter.txt')
const base = 'https://keithwilliams.org'
const coverPath = '/teaching/when-ai-helps-write-the-code'
const notesPath = '/teaching/studio-field-notes'
const studioZip = '/downloads/AI-Studio-Starter.zip'
const writing = read('writing.html')
const feature = read(coverPath.slice(1) + '.html')
const notes = read(notesPath.slice(1) + '.html')
const checks = []

function mainContent(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)
  assert.ok(main, 'Missing pre-rendered main')
  return main[1]
}
function requireLink(html, href) {
  assert.ok(html.includes(`href="${href}"`), `Missing link to ${href}`)
}
function metadata(html, name) {
  for (const tag of html.match(/<meta\b[^>]+>/g) || []) {
    if (tag.includes(`name="${name}"`) || tag.includes(`property="${name}"`)) {
      return tag.match(/\bcontent="([^"]+)"/)?.[1]
    }
  }
}
function schemas(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]))
}
function check(name, fn) { fn(); checks.push(name); console.log(`PASS ${name}`) }

check('Editorial homepage leads with a linked cover story', () => {
  const main = mainContent(home)
  const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)]
  assert.equal(headings.length, 1)
  assert.match(headings[0][1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '), /The Tests Passed\.\s*Who Won the Game\?/i)
  requireLink(headings[0][1], coverPath)
  requireLink(main, coverPath)
  for (const url of ['/writing', '/teaching', '/research', '/research/systems/', '/ai-careers', '/about']) requireLink(home, url)
  assert.ok(home.includes('Keith Williams'))
})
check('Writing index puts original work and its classroom materials within reach', () => {
  const index = mainContent(writing)
  assert.match(index, /<figure\b[\s\S]*?src="\/images\/editorial\/field-desk\.jpg"[\s\S]*?<figcaption>AI-generated editorial illustration\.<\/figcaption>/)
  const routes = [coverPath, notesPath, '/research/systems/', '/research/systems/english-software-engineering',
    '/research/systems/provenance-knowledge-graphs', '/research/systems/human-attention-kanban', '/ai-careers']
  for (const url of routes) {
    requireLink(index, url)
    const file = url.endsWith('/') ? url.slice(1) + 'index.html' : url.slice(1) + '.html'
    const html = read(file)
    assert.equal((mainContent(html).match(/<h1\b/g) || []).length, 1, url)
  }
  for (const html of [index, mainContent(feature), mainContent(read('teaching.html'))]) requireLink(html, studioZip)
  for (const html of [feature, notes]) assert.equal((mainContent(html).match(/<h1\b/g) || []).length, 1)
  const files = execFileSync('unzip', ['-Z1', resolve(dist, studioZip.slice(1))], { encoding: 'utf8' })
    .trim().split(/\r?\n/).filter(name => !name.endsWith('/'))
  assert.deepEqual(files.sort(), ['AGENTS.md', 'LESSON.md', 'README.md', 'TEACHER-STUDIO.md']
    .map(name => 'AI-Studio-Starter/' + name).sort())
})

check('Project cases and historical experience include status and source links', () => {
  assert.equal((home.match(/class="project-case"/g) || []).length, 5)
  assert.equal((home.match(/class="experience-entry"/g) || []).length, 2)
  for (const text of ['Educational Design System', 'Everyday AI CLI', 'IS117 Brand Studio', 'Published phase-one foundation', 'Published alpha · v0.2.2', 'Public teaching template', 'full publishing roadmap is not complete', 'does not process payments or place orders']) assert.ok(home.includes(text), text)
  for (const url of [
    'https://github.com/kaw393939/educational-design-system',
    'https://github.com/kaw393939/everyday-ai-cli',
    'https://github.com/kaw393939/is117-brand-studio',
    'https://pypi.org/project/everydayai-cli/0.2.2/',
    'https://news.njit.edu/inspiring-students-njit-africa',
    'https://news.njit.edu/njit-lecturer-helps-digitize-government-services-zambia'
  ]) assert.ok(home.includes(`href="${url}"`), url)
})
check('Knowledge Lab is discoverable from the public portfolio and course pages', () => {
  for (const html of [home, read('teaching.html')]) requireLink(html, '/knowledge-lab/')
  assert.ok(home.includes('Ordo Knowledge Lab'))
})

check('Section anchors and accessible heading references resolve uniquely', () => {
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML id')
  for (const [, id] of home.matchAll(/href="\/?#([^"]+)"/g)) assert.ok(ids.includes(id), id)
  for (const [, references] of home.matchAll(/aria-labelledby="([^"]+)"/g)) {
    for (const id of references.split(' ')) assert.ok(ids.includes(id), id)
  }
  for (const id of ['projects', 'about', 'zambia', 'conversation']) assert.ok(ids.includes(id), 'Legacy anchor: ' + id)
})
check('Teaching and research front doors expose the feature and supporting material', () => {
  const teaching = read('teaching.html')
  const research = read('research.html')
  for (const page of [teaching, research]) {
    assert.equal((mainContent(page).match(/<h1\b/g) || []).length, 1)
    requireLink(mainContent(page), coverPath)
    requireLink(mainContent(page), notesPath)
  }
  assert.ok(teaching.includes('AGENTS.md'))
  assert.ok(research.includes('not a list of completed experiments'))
  assert.ok(research.includes('peer-reviewed'))
})

check('Research series and advisor proposal are generated and accessible', () => {
  const paths = [
    'index',
    'personalized-knowledge-artifacts',
    'metavis-evidence-and-evaluation',
    'race-track-pit-stop',
    'provenance-knowledge-graphs',
    'english-software-engineering',
    'human-attention-kanban',
    'literature-and-faculty',
    'dissertation-proposal',
    'vision-and-interface',
    'uap-research-testbed'
  ]
  for (const page of paths) {
    const html = read(`research/systems/${page}.html`)
    assert.equal((html.match(/<h1\b/g) || []).length, 1, page)
    assert.ok(html.includes('Keith Williams') || html.includes('Research'), page)
    assert.ok(!html.includes('https://github.com/kaw393939/uap-corpus'), 'private corpus repo URL leaked: ' + page)
    assert.ok(!html.includes('https://github.com/kaw393939/ordo_executor'), 'private executor repo URL leaked: ' + page)
  }
  const research = read('research.html')
  assert.ok(research.includes('/research/systems/'), 'Research page should link to systems hub')
})

check('Hero narration is accessible and bundled as a local asset', () => {
  assert.ok(home.includes('Listen to introduction'))
  assert.ok(home.includes('AI-narrated'))
  assert.ok(home.includes('Read transcript'))
  assert.ok(home.includes('preload="none"'))
  assert.ok(home.includes('src="/audio/portfolio-intro.mp3"'))
  const audio = resolve(dist, 'audio/portfolio-intro.mp3')
  assert.ok(existsSync(audio))
  assert.ok(statSync(audio).size > 1000 && statSync(audio).size < 2000000)
})

check('Removed homepage popup stays absent', () => {
  const layout = readFileSync('docs/.vitepress/theme/Layout.vue', 'utf8')
  const css = readFileSync('docs/.vitepress/theme/style.css', 'utf8')
  for (const content of [home, guide, error, layout, css]) {
    assert.ok(!content.includes('hello is117'))
    assert.ok(!content.includes('greeting-dialog'))
    assert.ok(!content.includes('greetingDialog'))
    assert.ok(!content.includes('showGreeting'))
  }
  assert.ok(!home.includes('<dialog'))
  assert.ok(!layout.includes('Making AI<br>work for'))
})
check('Unique title, canonical URL and share metadata', () => {
  const title = home.match(/<title>([^<]+)<\/title>/)?.[1]
  assert.ok(title && title.includes('Keith Williams') && title.length > 'Keith Williams'.length)
  assert.equal(metadata(home, 'og:title'), title)

  assert.match(home, /rel="canonical" href="https:\/\/keithwilliams.org\/"/)
  assert.match(home, /property="og:url" content="https:\/\/keithwilliams.org\/"/)
  assert.ok(home.includes('name="description"'))
  assert.ok(home.includes('name="viewport"'))
  assert.ok(home.includes('lang="en-US"'))
})
check('Social previews, canonical URLs and structured data match the reading destination', () => {
  const pages = [
    ['/', 'ProfilePage', home],
    ['/writing', 'CollectionPage', writing],
    ['/teaching', 'CollectionPage', read('teaching.html')],
    ['/research', 'CollectionPage', read('research.html')],
    [coverPath, 'Article', feature],
    [notesPath, 'Article', notes]
  ]
  for (const [route, type, html] of pages) {
    const url = base + route
    assert.ok(html.includes(`rel="canonical" href="${url}"`), url)
    assert.equal(metadata(html, 'og:url'), url)
    assert.ok(metadata(html, 'og:title') && metadata(html, 'og:description'), route)
    assert.equal(metadata(html, 'twitter:card'), 'summary_large_image', route)
    const image = new URL(metadata(html, 'og:image'))
    assert.equal(image.origin, base)
    if (route === coverPath || route === '/' || route === '/writing') {
      const crop = route === coverPath ? 'social-rock-paper.jpg' : 'social-field-desk.jpg'
      assert.equal(image.pathname, '/images/editorial/' + crop, route)
      assert.equal(metadata(html, 'og:image:width'), '1200', route)
      assert.equal(metadata(html, 'og:image:height'), '630', route)
    }
    assert.ok(existsSync(resolve(dist, image.pathname.slice(1))), image.href)
    assert.ok(metadata(html, 'og:image:alt'), image.href)
    const schema = schemas(html).find(data => data['@type'] === type)
    assert.ok(schema, type + ' ' + route)
    assert.equal(schema.url, url)
    if (type === 'Article') {
      assert.equal(schema.author.name, 'Keith Williams')
      assert.equal(schema.image, image.href)
      assert.equal(metadata(html, 'og:type'), 'article')
      requireLink(mainContent(html), 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url))
    }
  }
  const data = schemas(home)
  const person = data.find(s => s['@type'] === 'ProfilePage').mainEntity
  assert.equal(person['@type'], 'Person')
  assert.equal(person.name, 'Keith Williams')
  assert.equal(person.sameAs.length, 3)
  assert.ok(data.some(s => s['@type'] === 'WebSite' && s.url === base + '/'))
})

check('Sitemap excludes the error page; error page is noindex', () => {
  assert.ok(!sitemap.includes('/404'))
  assert.ok((sitemap.match(/<loc>/g) || []).length >= 17, 'Sitemap should include the expanded research site')
  assert.ok(sitemap.includes('/teaching'))
  assert.ok(sitemap.includes('/research'))
  for (const route of ['/writing', coverPath, notesPath]) assert.ok(sitemap.includes(base + route), route)
  assert.ok(sitemap.includes('/research/systems/vision-and-interface'))
  assert.ok(sitemap.includes('/research/systems/uap-research-testbed'))
  assert.match(error, /name="robots" content="noindex, follow"/)
  assert.ok(!error.includes('rel="canonical"'))
  assert.ok(!error.includes('application/ld+json'))
  assert.ok(read('robots.txt').includes('Sitemap: https://keithwilliams.org/sitemap.xml'))
})
check('Homepage serves local editorial photographs with accessible, sized images', () => {
  const images = home.match(/<img\b[^>]*>/g) || []
  assert.ok(images.length >= 3)
  const sources = []
  for (const img of images) {
    for (const attr of ['width', 'height', 'src']) assert.match(img, new RegExp('\\b' + attr + '="[^"]+"'))
    assert.match(img, /\balt="[^"]*"/)
    if (img.includes('alt=""')) {
      const beforeImage = home.slice(0, home.indexOf(img))
      assert.match(beforeImage, /<a\b[^>]*aria-hidden="true"[^>]*>\s*$/, 'Empty alt belongs to a decorative linked image')
    }
    const src = img.match(/\bsrc="([^"]+)"/)[1]
    sources.push(src)
    for (const [, path] of img.matchAll(/\/(images\/[^\s",]+)/g)) assert.ok(existsSync(resolve(dist, path)), path)
  }
  assert.ok(sources.includes('/images/teaching/studio-rock-paper-tests.jpg'))
  assert.ok(images.some(img => img.includes('fetchpriority="high"') && /\balt="[^"]+"/.test(img)))
  assert.ok(images.some(img => img.includes('loading="lazy"')))
  assert.ok(images.some(img => img.includes('srcset=') && img.includes('sizes=')))
  for (const path of ['images/editorial/field-desk.jpg', 'images/editorial/evidence-desk.jpg',
    'images/teaching/studio-rock-paper-tests.jpg', 'images/teaching/studio-coach-pause.jpg']) {
    const bytes = readFileSync(resolve(dist, path))
    assert.ok(bytes.length > 1000 && bytes.readUInt16BE(0) === 0xffd8, path)
  }
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
check('Responsive navigation includes a viewport bound and can scroll', () => {
  const css = readFileSync('docs/.vitepress/theme/style.css', 'utf8')
  assert.match(css, /@media\s*[^{}]*(?:max-width|width\s*<=)/)
  assert.match(css, /max-height:\s*[^;}]*[ds]?vh/)
  assert.match(css, /overflow-y:\s*auto/)
})

check('Supporting paragraphs do not inherit small eyebrow typography', () => {
  const css = readFileSync('docs/.vitepress/theme/style.css', 'utf8')
  for (const [, selector, declarations] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!selector.includes('p:not(.eyebrow)')) continue
    const size = declarations.match(/font-size:\s*(\d+)px/)
    if (size) assert.ok(Number(size[1]) >= 15, selector.trim())
  }
})
check('Life Tracker guide is pre-rendered, discoverable, and has complete setup content', () => {
  assert.equal((guide.match(/<h1\b/g) || []).length, 1)
  for (const text of ['Life Tracker', 'How I use it', 'Set up your own', 'How I work with AI', 'A simple example', 'Keep the work private', 'status:needs-research', 'Completion criteria', 'Do not send messages or change other systems']) assert.ok(guide.includes(text), text)
  assert.ok(home.includes('href="/life-tracker"'))
  assert.ok(guide.includes('href="/life-tracker-starter.txt"'))
  assert.ok(!guide.includes('greeting-title'))
  assert.ok(guide.includes('id="main" tabindex="-1"'))
  const ids = [...guide.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length)
  for (const [, id] of guide.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id)
  assert.ok(starter.includes('Create a new PRIVATE GitHub repository'))
  assert.ok(starter.includes('## Completion criteria'))
})
check('Guide metadata and sitemap resolve to the public article', () => {
  assert.match(guide, /rel="canonical" href="https:\/\/keithwilliams.org\/life-tracker"/)
  assert.match(guide, /property="og:type" content="article"/)
  assert.match(guide, /property="og:url" content="https:\/\/keithwilliams.org\/life-tracker"/)
  assert.ok(sitemap.includes('https://keithwilliams.org/life-tracker'))
  const data = JSON.parse(guide.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(data['@type'], 'Article')
  assert.equal(data.author.name, 'Keith Williams')
})
check('Public guide links only to approved public destinations', () => {
  const approvedExternalLinks = new Set(['https://github.com/kaw393939', 'https://people.njit.edu/profile/kwilliam', 'https://www.linkedin.com/in/keithwilliams5/'])
  for (const [, href] of mainContent(guide).matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/g)) assert.ok(approvedExternalLinks.has(href), href)
  const starterUrls = starter.match(/https?:\/\/\S+/g) || []
  assert.deepEqual(starterUrls, ['https://keithwilliams.org/life-tracker'])
  assert.ok(guide.includes('fictional'))
  assert.ok(guide.includes('not automatically an approved home'))
})
check('Custom domain survives the production build', () => {
  assert.equal(read('CNAME').trim(), 'keithwilliams.org')
})
check('Personal story is sourced and proposals are distinguished from accomplishments', () => {
  const about = read('about.html')
  for (const text of ['TRS-80', '1983', 'Alcoa', 'AmeriCorps', 'Showedme.net', 'Wrkbench', 'not an operating program']) assert.ok(about.includes(text), text)
  assert.ok(home.includes('href="/about"'))
  assert.ok(about.includes('rel="canonical" href="https://keithwilliams.org/about"'))
  assert.ok(sitemap.includes('/about'))
  assert.equal((about.match(/<h1\b/g) || []).length, 1)
})


assert.ok(!home.includes('is373-greeting'))
assert.ok(!home.includes('Hi, IS373! Welcome to my portfolio.'))
for (const width of [480, 960, 1200]) {
  assert.ok(home.includes('/images/keith-williams-editorial-' + width + '.webp'))
}

check('AI careers guide has discoverability, provenance, eligibility and SEO', () => {
  const careers = read('ai-careers.html')
  assert.equal((careers.match(/<h1\b/g) || []).length, 1)
  for (const phrase of ['November 12, 2026', 'November 20, 2026', 'annualized', 'experienced professional roles', 'not market averages', 'No employer affiliation']) assert.ok(careers.includes(phrase), phrase)
  for (const host of ['www.google.com', 'nvidia.wd5.myworkdayjobs.com', 'jobs.lever.co', 'openai.com', 'job-boards.greenhouse.io']) assert.ok(careers.includes(host), host)
  assert.ok(careers.includes('https://keithwilliams.org/ai-careers'))
  assert.ok(careers.includes('application/ld+json'))
  requireLink(home, '/ai-careers')
  requireLink(mainContent(writing), '/ai-careers')
  assert.ok(sitemap.includes('/ai-careers'))
})

check('Career skills report has 50 distinct sourced descriptions and honest limits', () => {
  const careers = read('ai-careers.html')
  const dataset = JSON.parse(read('research/ai-careers-2026-11-12.json'))
  assert.equal(dataset.families.length, 5)
  const postings = dataset.families.flatMap(f => f.postings)
  assert.equal(postings.length, 50)
  assert.equal(new Set(postings.map(p => p.url)).size, 50)
  for (const family of dataset.families) {
    assert.equal(family.postings.length, 10)
    for (const count of Object.values(family.counts)) assert.ok(count >= 0 && count <= 10)
    for (const p of family.postings) {
      assert.ok(p.url.startsWith('https://') && p.evidence && p.status && p.skills.length)
      assert.equal(p.checked_date, '2026-11-12')
    }
  }
  for (const phrase of ['50 real posting descriptions', 'purposive convenience sample', 'current application status unconfirmed', 'expected-fill date', 'not hiring guarantees']) assert.ok(careers.includes(phrase), phrase)
  assert.equal((careers.match(/class="career-evidence"/g) || []).length, 5)
  assert.ok(careers.includes('/research/ai-careers-2026-11-12.json'))
})

console.log(`\n${checks.length} static checks passed. Browser and real-device checks remain separate.`)
