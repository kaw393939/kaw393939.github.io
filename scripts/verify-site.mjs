import assert from 'node:assert/strict'
import { createMarkdownRenderer } from 'vitepress'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
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
const bikePath = '/teaching/the-question-i-want-students-to-ask'
const notesPath = '/teaching/studio-field-notes'
const studioZip = '/downloads/AI-Studio-Starter.zip'
const writing = read('writing.html')
const feature = read(coverPath.slice(1) + '.html')
const bike = read(bikePath.slice(1) + '.html')
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

const homeEnvironment = {}
const markdown = await createMarkdownRenderer(resolve('docs'))
markdown.render(readFileSync('docs/index.md', 'utf8'), homeEnvironment)
const edition = homeEnvironment.frontmatter.edition
const leadArticle = read(edition.lead.slice(1) + '.html')

check('Homepage renders the configured articles, promotion copy and sharing artwork', () => {
  const main = mainContent(home)
  const cover = main.match(/<section class="cover wrap"[^>]*>([\s\S]*?)<\/section>/)?.[1]
  assert.ok(cover)
  assert.equal((main.match(/<h1\b/g) || []).length, 1)
  const cards = [...main.matchAll(/<article class="(?:dispatch-card|briefing-card)"[^>]*>([\s\S]*?)<\/article>/g)]
    .map(match => match[1])
  assert.equal(cards.length, edition.supporting.length)
  const paths = [edition.lead, ...edition.supporting]
  for (const [index, item] of [cover, ...cards].entries()) {
    const path = paths[index]
    const target = read(path.slice(1) + '.html')
    const article = schemas(target).find(data => data['@type'] === 'Article')
    assert.ok(article, 'Missing article at ' + path)
    const promotion = edition.overrides?.[path] || {}
    const heading = item.match(/<h[13]\b[^>]*>([\s\S]*?)<\/h[13]>/)?.[1]
    assert.ok(heading)
    requireLink(heading, path)
    assert.equal(renderedText(heading.replace(/<br\s*\/?>/g, ' ')),
      (promotion.headline || article.headline).replace(/\s+/g, ' ').trim(), path)
    const deck = index === 0 ? item.match(/<p class="cover-deck">([\s\S]*?)<\/p>/)
      : item.match(/<\/h3>\s*<p>([\s\S]*?)<\/p>/)
    assert.ok(deck, path)
    assert.equal(renderedText(deck[1]), promotion.teaser || article.abstract, path)
    const picture = item.match(/<img\b[^>]*>/)?.[0]
    if (picture || index === 0) {
      const articleImage = mainContent(target).match(/<figure[^>]*class="[^"]*\bstory-cover\b[^"]*"[^>]*>[\s\S]*?(<img\b[^>]*>)/)?.[1]
      assert.ok(picture && articleImage, path)
      assert.equal(attribute(picture, 'src'), attribute(articleImage, 'src'), 'Homepage art must follow article: ' + path)
    }
  }
  for (const key of ['og:image', 'og:image:alt', 'twitter:image']) {
    assert.equal(metadata(home, key), metadata(leadArticle, key), key)
  }
  for (const url of ['/writing', '/teaching', '/research', '/research/systems/', '/ai-careers', '/about']) requireLink(home, url)
})

check('Writing index puts original work and its classroom materials within reach', () => {
  const index = mainContent(writing)
  assert.match(index, /<figure\b[\s\S]*?src="\/images\/editorial\/field-desk\.jpg"[\s\S]*?<figcaption>AI-generated editorial illustration\.<\/figcaption>/)
  const routes = [coverPath, bikePath, notesPath, '/research/systems/', '/research/systems/english-software-engineering',
    '/research/systems/provenance-knowledge-graphs', '/research/systems/human-attention-kanban', '/ai-careers']
  for (const url of routes) {
    requireLink(index, url)
    const file = url.endsWith('/') ? url.slice(1) + 'index.html' : url.slice(1) + '.html'
    const html = read(file)
    assert.equal((mainContent(html).match(/<h1\b/g) || []).length, 1, url)
  }
  for (const html of [index, mainContent(feature), mainContent(bike), mainContent(read('teaching.html'))]) requireLink(html, studioZip)
  for (const html of [feature, bike, notes]) assert.equal((mainContent(html).match(/<h1\b/g) || []).length, 1)
  const files = execFileSync('unzip', ['-Z1', resolve(dist, studioZip.slice(1))], { encoding: 'utf8' })
    .trim().split(/\r?\n/).filter(name => !name.endsWith('/'))
  assert.deepEqual(files.sort(), ['AGENTS.md', 'LESSON.md', 'README.md', 'TEACHER-STUDIO.md']
    .map(name => 'AI-Studio-Starter/' + name).sort())
})

check('The original teaching URL and the separate bike-shop post render distinct articles', () => {
  assert.match(mainContent(feature), /The Tests Passed\. Who Won the Game\?/)
  assert.match(mainContent(feature), /55029c04d60e2c2b19e923defc82af24e9c4b9da/)
  assert.match(mainContent(bike), /The Question I Want Students to Ask Without Me/)
  assert.match(mainContent(bike), /id="bring-a-job-posting-to-the-studio"/)
  requireLink(mainContent(read('teaching.html')), bikePath)
  requireLink(mainContent(read('ai-careers.html')), bikePath + '#bring-a-job-posting-to-the-studio')
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
  assert.match(research, /proposed studies/i)
  for (const path of ['/research/systems/dissertation-proposal', '/research/systems/metavis-evidence-and-evaluation', '/research/systems/literature-and-faculty']) requireLink(mainContent(research), path)
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

check('Research breadcrumbs and long-document contents point to the right destinations', () => {
  const folder = 'research/systems'
  const longDocuments = new Set(['dissertation-proposal.md', 'literature-and-faculty.md'])
  for (const filename of readdirSync('docs/' + folder).filter(name => name.endsWith('.md'))) {
    const main = mainContent(read(folder + '/' + filename.replace(/\.md$/, '.html')))
    const trail = main.match(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/)?.[1]
    assert.ok(trail, 'Missing research breadcrumb in ' + filename)
    requireLink(trail, '/research')
    if (filename === 'index.md') {
      assert.match(trail, /aria-current="page">Evidence-Governed AI Systems</)
      assert.ok(!trail.includes('href="/research/systems/"'), 'Collection links to itself')
    } else {
      assert.match(trail, /href="\/research\/systems\/">Evidence-Governed AI Systems<\/a>/)
    }
    const contents = main.match(/<nav\b[^>]*aria-label="On this page"[^>]*>([\s\S]*?)<\/nav>/)?.[1]
    if (longDocuments.has(filename)) assert.ok(contents, 'Missing contents in ' + filename)
    const source = readFileSync(resolve('docs', folder, filename), 'utf8')
    assert.equal(Boolean(contents), /^\[\[toc\]\]$/m.test(source), 'Contents must be an editorial choice in ' + filename)
    if (!contents) continue
    assert.match(contents, /<details><summary>On this page<\/summary>/)
    const targets = [...contents.matchAll(/href="#([^"]+)"/g)].map(link => link[1])
    const headings = [...main.matchAll(/<h2\b[^>]*\bid="([^"]+)"/g)].map(heading => heading[1])
    assert.ok(targets.length > 0, 'Empty contents in ' + filename)
    assert.deepEqual(targets, headings, 'Contents should match every H2, in order, in ' + filename)
  }
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
    [bikePath, 'Article', bike],
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
    if ([coverPath, bikePath, '/', '/writing'].includes(route)) {
      if (route !== '/') {
        assert.equal(image.pathname, route === coverPath
          ? '/images/editorial/social-rock-paper.jpg' : '/images/editorial/social-field-desk.jpg', route)
      }
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

function renderedText(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&(?:amp|lt|gt|quot|#39|#x27);/g,
    entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" })[entity])
    .replace(/\s+/g, ' ').trim()
}

function attribute(tag, name) {
  return tag.match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'))?.[1]
}

function jpegDimensions(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'JPEG header')
  for (let offset = 2; offset + 9 < bytes.length;) {
    assert.equal(bytes[offset], 0xff, 'Invalid JPEG marker')
    while (bytes[offset] === 0xff) offset++
    const marker = bytes[offset++]
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return [bytes.readUInt16BE(offset + 5), bytes.readUInt16BE(offset + 3)]
    }
    if (marker === 0xda || marker === 0xd9) break
    const length = bytes.readUInt16BE(offset)
    assert.ok(length >= 2, 'Invalid JPEG segment length')
    offset += length
  }
  assert.fail('Missing JPEG frame with dimensions')
}

function checkReaderPicture(html, placement) {
  const picture = html.match(/<picture\b[^>]*>([\s\S]*?)<\/picture>/)?.[1]
  assert.ok(picture, 'Missing responsive picture in ' + placement)
  const source = picture.match(/<source\b[^>]*>/)?.[0] || ''
  const fallback = picture.match(/<img\b[^>]*>/)?.[0] || ''
  assert.equal(attribute(source, 'type'), 'image/webp')
  assert.ok(attribute(source, 'sizes'), 'Missing layout sizes in ' + placement)
  assert.ok(attribute(fallback, 'src') && attribute(fallback, 'alt') !== undefined)
  assert.ok(existsSync(resolve(dist, attribute(fallback, 'src').slice(1))))
  const candidates = (attribute(source, 'srcset') || '').split(/,\s*/)
  const widths = candidates.map(candidate => {
    const match = candidate.match(/^(\/images\/reader\/\S+\.webp) (\d+)w$/)
    assert.ok(match, candidate)
    const bytes = readFileSync(resolve(dist, decodeURIComponent(match[1]).slice(1)))
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', match[1])
    return Number(match[2])
  })
  const originalWidth = Number(attribute(fallback, 'width'))
  for (const width of [480, 768].filter(width => width < originalWidth)) assert.ok(widths.includes(width), placement)
  assert.deepEqual(widths, [...new Set(widths)].sort((a, b) => a - b))
  assert.ok(widths.at(-1) <= originalWidth, 'Avoid upscaling ' + placement)
}

check('Readers get responsive local images across the homepage, Writing index and articles', () => {
  for (const [, figure] of home.matchAll(/<figure class="(?:cover-image|dispatch-image)"[^>]*>([\s\S]*?)<\/figure>/g)) {
    checkReaderPicture(figure, 'homepage')
  }
  checkReaderPicture(mainContent(writing).match(/<figure\b[^>]*>([\s\S]*?)<\/figure>/)?.[1] || '', 'Writing cover')
  for (const [, card] of mainContent(writing).matchAll(/<article class="journal-card"[^>]*>([\s\S]*?)<\/article>/g)) {
    checkReaderPicture(card, 'Writing card')
    const href = attribute(card.match(/<a\b[^>]*>/)[0], 'href')
    const article = read(href.slice(1) + '.html')
    const cover = mainContent(article).match(/<figure\b[^>]*class="[^"]*\bstory-cover\b[^"]*"[^>]*>([\s\S]*?)<\/figure>/)
    checkReaderPicture(cover?.[1] || '', href)
  }
})

check('Every article has its own illustrated teaser, canonical sharing link and searchable card', () => {
  const researchArticles = readdirSync('docs/research/systems')
    .filter(name => name.endsWith('.md') && name !== 'index.md')
    .map(name => '/research/systems/' + name.slice(0, -3))
  const expected = new Set([coverPath, bikePath, notesPath, '/ai-careers', '/life-tracker', ...researchArticles])
  const cards = new Map()
  for (const [, card] of mainContent(writing).matchAll(/<article\b[^>]*class="journal-card"[^>]*>([\s\S]*?)<\/article>/g)) {
    const link = card.match(/<a\b[^>]*\bclass="journal-card-link"[^>]*>/)?.[0]
    assert.ok(link, 'Missing card link')
    const path = attribute(link, 'href')
    assert.ok(path?.startsWith('/') && !cards.has(path), 'Duplicate or invalid card: ' + path)
    const title = card.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1]
    const teaser = card.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)?.[1]
    const image = card.match(/<img\b[^>]*>/)?.[0]
    assert.ok(title && teaser && image, 'Incomplete card: ' + path)
    cards.set(path, { title: renderedText(title), teaser: renderedText(teaser), image: attribute(image, 'src') })
  }
  for (const path of expected) assert.ok(cards.has(path), 'No writing card for ' + path)
  const articlePages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname)
    .filter(path => {
      const name = path.slice(1) + (path.endsWith('/') ? 'index.html' : '.html')
      return metadata(read(name), 'og:type') === 'article'
    })
  assert.deepEqual([...cards.keys()].sort(), articlePages.sort(), 'Writing index must list every published article exactly once')

  const teasers = new Set()
  const descriptions = new Set()
  const images = new Set()
  const hashes = new Set()
  for (const [path, card] of cards) {
    const html = read(path.slice(1) + '.html')
    const main = mainContent(html)
    const canonical = base + path
    const source = readFileSync(resolve('docs', path.slice(1) + '.md'), 'utf8')
    const fm = source.match(/^---\r?\n([\s\S]+?)\r?\n---/)?.[1]
    assert.ok(fm && /^teaser:\s*\S/m.test(fm), 'Missing source teaser: ' + path)
    assert.equal((main.match(/class="story-intro"/g) || []).length, 1, path)
    const deck = main.match(/<p\b[^>]*class="article-deck"[^>]*>([\s\S]*?)<\/p>/)?.[1]
    assert.ok(deck && main.includes('class="byline"'), 'Missing teaser/byline: ' + path)
    const cover = main.match(/<figure\b[^>]*class="[^"]*\bstory-cover\b[^"]*"[^>]*>([\s\S]*?)<\/figure>/)?.[1]
    const image = cover?.match(/<img\b[^>]*>/)?.[0]
    assert.ok(image && attribute(image, 'alt')?.trim() && /<figcaption\b/.test(cover), 'Missing illustrated accessible header: ' + path)
    const coverPath = attribute(image, 'src')
    const coverBytes = readFileSync(resolve(dist, coverPath.slice(1)))
    assert.deepEqual(jpegDimensions(coverBytes), [Number(attribute(image, 'width')), Number(attribute(image, 'height'))], path)

    const article = schemas(html).find(schema => schema['@type'] === 'Article')
    const label = renderedText(deck)
    assert.ok(article, 'Missing Article: ' + path)
    assert.equal(article.abstract, label, path)
    assert.equal(card.teaser, label, path)
    assert.equal(card.title, article.headline, path)
    assert.equal(article.author.name, 'Keith Williams', path)
    assert.equal(article.publisher.name, 'Keith Williams', path)
    assert.equal(metadata(html, 'article:section'), article.articleSection, path)
    const description = renderedText(metadata(html, 'description') || '')
    assert.ok(description && description !== label, 'Search description and teaser must be individually written: ' + path)
    assert.equal(renderedText(metadata(html, 'og:description')), label, path)
    assert.equal(renderedText(metadata(html, 'twitter:description')), label, path)
    assert.equal(article.description, description, path)
    assert.ok(!teasers.has(label) && !descriptions.has(description), 'Reused teaser or description: ' + path)
    teasers.add(label); descriptions.add(description)
    assert.equal(article.url, canonical)
    assert.equal(article.mainEntityOfPage, canonical)
    assert.equal(metadata(html, 'og:url'), canonical)
    requireLink(html, canonical)
    const share = main.match(/<div\b[^>]*class="story-share"[^>]*>([\s\S]*?)<\/div>/)?.[1]
    assert.ok(share && /role="status"/.test(share), 'Missing accessible share controls: ' + path)
    requireLink(share, 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(canonical))
    assert.equal(metadata(html, 'twitter:card'), 'summary_large_image', path)
    const url = new URL(metadata(html, 'og:image'))
    assert.equal(url.origin, base)
    assert.equal(metadata(html, 'twitter:image'), url.href)
    assert.equal(article.image, url.href)
    assert.equal(card.image, url.pathname, path)
    assert.ok(metadata(html, 'og:image:alt')?.trim(), path)
    assert.equal(metadata(html, 'og:image:alt'), metadata(html, 'twitter:image:alt'), path)
    assert.equal(metadata(html, 'og:image:type'), 'image/jpeg', path)
    assert.equal(metadata(html, 'og:image:width'), '1200', path)
    assert.equal(metadata(html, 'og:image:height'), '630', path)
    const bytes = readFileSync(resolve(dist, url.pathname.slice(1)))
    assert.deepEqual(jpegDimensions(bytes), [1200, 630], url.pathname)
    assert.ok(bytes.equals(readFileSync(resolve('docs/public', url.pathname.slice(1)))), 'Share art differs from source: ' + path)
    const digest = createHash('sha256').update(bytes).digest('hex')
    assert.ok(!images.has(url.pathname) && !hashes.has(digest), 'Duplicate article art: ' + path)
    images.add(url.pathname); hashes.add(digest)
  }
})
check('Article share enhancements are shipped with clipboard feedback and a manual fallback', () => {
  const assets = resolve(dist, 'assets')
  const scripts = readdirSync(assets, { recursive: true }).filter(path => path.endsWith('.js'))
  const code = scripts.map(path => readFileSync(resolve(assets, path), 'utf8'))
    .find(js => /clipboard\.writeText\(/.test(js) && js.includes('Copy link'))
  assert.ok(code, 'No shipped article clipboard control')
  const component = readFileSync('docs/.vitepress/theme/components/ArticleShare.vue', 'utf8')
  for (const action of ['copyLink', 'share']) {
    assert.match(component, new RegExp('<button\\b[^>]*type="button"[^>]*@click="' + action + '"'))
  }
  assert.match(component, /<input\b[^>]*type="url"[^>]*readonly/)
  assert.match(component, /role="status"[^>]*aria-live="polite"/)
  assert.match(component, /field\.value\?\.focus\(/)
  assert.match(component, /field\.value\?\.select\(/)
  const shareAnchor = mainContent(feature).match(/<a\b[^>]*href="https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/[^"]+"[^>]*>/)?.[0]
  assert.ok(shareAnchor && /aria-label="[^"]*LinkedIn[^"]*"/i.test(shareAnchor), 'The sharing control must identify its external destination')
})

check('Sitemap excludes the error page; error page is noindex', () => {
  assert.ok(!sitemap.includes('/404'))
  assert.doesNotMatch(sitemap, /<lastmod\b/i, 'Sitemap must be date-free')
  assert.ok((sitemap.match(/<loc>/g) || []).length >= 17, 'Sitemap should include the expanded research site')
  assert.ok(sitemap.includes('/teaching'))
  assert.ok(sitemap.includes('/research'))
  for (const route of ['/writing', coverPath, bikePath, notesPath]) assert.ok(sitemap.includes(base + route), route)
  assert.ok(sitemap.includes('/research/systems/vision-and-interface'))
  assert.ok(sitemap.includes('/research/systems/uap-research-testbed'))
  assert.match(error, /name="robots" content="noindex, follow"/)
  assert.ok(!error.includes('rel="canonical"'))
  assert.ok(!error.includes('application/ld+json'))
  assert.ok(read('robots.txt').includes('Sitemap: https://keithwilliams.org/sitemap.xml'))
})
check('Homepage serves local editorial photographs with accessible, sized images', () => {
  const matches = [...home.matchAll(/<img\b[^>]*>/g)]
  const images = matches.map(match => match[0])
  assert.ok(images.length >= 3)
  for (const match of matches) {
    const img = match[0]
    for (const attr of ['width', 'height', 'src']) assert.match(img, new RegExp('\\b' + attr + '="[^"]+"'))
    assert.match(img, /\balt="[^"]*"/)
    if (img.includes('alt=""')) {
      const beforeImage = home.slice(0, match.index)
      const afterImage = home.slice(match.index + img.length)
      if (img.includes('class="profile-logo"')) {
        assert.match(beforeImage, /<a\b[^>]*rel="me"[^>]*>\s*$/)
        assert.match(afterImage, /^\s*(?:GitHub|LinkedIn)\s*<\/a>/, 'Decorative profile icon needs a visible link label')
      } else {
        assert.match(beforeImage, /<a\b[^>]*aria-hidden="true"[^>]*>\s*$/, 'Decorative linked image must be hidden')
      }
    }
    for (const [, path] of img.matchAll(/\/(images\/[^\s",]+)/g)) assert.ok(existsSync(resolve(dist, path)), path)
  }
  assert.ok(images.some(img => img.includes('fetchpriority="high"') && /\balt="[^"]+"/.test(img)))
  assert.ok(images.some(img => img.includes('loading="lazy"')))
  assert.ok(images.some(img => img.includes('srcset=') && img.includes('sizes=')))
  for (const path of ['images/editorial/field-desk.jpg', 'images/editorial/evidence-desk.jpg',
    'images/teaching/studio-coach-pause.jpg']) {
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
  const approvedExternalLinks = new Set([
    'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(base + '/life-tracker'),
    'https://github.com/kaw393939', 'https://people.njit.edu/profile/kwilliam', 'https://www.linkedin.com/in/keithwilliams5/'])
  for (const [, href] of mainContent(guide).matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/g)) assert.ok(approvedExternalLinks.has(href), href)
  const starterUrls = starter.match(/https?:\/\/\S+/g) || []
  assert.deepEqual(starterUrls, ['https://keithwilliams.org/life-tracker'])
  assert.ok(guide.includes('fictional'))
  assert.ok(guide.includes('not automatically an approved home'))
})
check('Site Notes explains the site practices and is reachable in every portfolio footer', () => {
  const route = '/site-notes'
  const html = read('site-notes.html')
  const main = mainContent(html)
  const text = renderedText(main)
  const url = base + route
  const schema = schemas(html).find(data => data['@type'] === 'WebPage')
  assert.equal(schema?.url, url)
  assert.equal(metadata(html, 'og:type'), 'website')
  assert.match(metadata(html, 'description') || '', /sharing/i)
  assert.equal(metadata(html, 'og:url'), url)
  assert.ok(html.includes('rel="canonical" href="' + url + '"'))
  assert.ok(sitemap.includes('<loc>' + url + '</loc>'))
  assert.ok(!schemas(html).some(data => data['@type'] === 'Article'))
  assert.doesNotMatch(main, /class="(?:story-intro|story-share)"/)
  assert.equal((main.match(/<h1\b/g) || []).length, 1)

  // Verify subject coverage and accountable source/contact routes, not a specific headline or sentence.
  for (const subject of [/GitHub Pages/i, /IP addresses/i, /search/i, /session/i, /sharing/i,
    /portrait/i, /AI-assisted/i, /audio/i, /transcript/i, /reuse/i, /accessib|difficult to use/i]) {
    assert.match(text, subject)
  }
  requireLink(main, 'https://people.njit.edu/profile/kwilliam')
  requireLink(main, 'https://www.linkedin.com/legal/privacy-policy')
  assert.match(main, /href="https:\/\/docs\.github\.com\/[^"]*(?:#data-collection|privacy-statement)/)
  assert.match(main, /href="(?:https:\/\/keithwilliams\.org)?\/downloads\/AI-Studio-Starter\.zip"/)
  for (const page of readdirSync('docs', { recursive: true }).filter(path => path.endsWith('.md') && path !== '404.md' &&
    !path.split(/[\\/]/).some(part => part.startsWith('.') || part === 'public'))) {
    const document = read(page.replace(/\.md$/, '.html'))
    const footer = document.match(/<footer\b[^>]*class="site-footer"[^>]*>([\s\S]*?)<\/footer>/)?.[1] || ''
    requireLink(footer, route)
    assert.doesNotMatch(document, /<(?:script|iframe|img)\b[^>]*\bsrc="(?:https?:)?\/\/(?:[\w.-]+\.)?(?:linkedin\.com|licdn\.com)\//i, 'Sharing must not embed LinkedIn as a reader loads ' + page)
  }
})

check('Custom domain survives the production build', () => {
  assert.equal(read('CNAME').trim(), 'keithwilliams.org')
})
check('Personal story is sourced and proposals are distinguished from accomplishments', () => {
  const about = read('about.html')
  for (const text of ['TRS-80', 'Alcoa', 'AmeriCorps', 'Showedme.net', 'Wrkbench', 'not an operating program']) assert.ok(about.includes(text), text)
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
  for (const phrase of ['annualized', 'experienced professional roles', 'not market averages', 'No employer affiliation']) assert.ok(careers.includes(phrase), phrase)
  for (const host of ['www.google.com', 'nvidia.wd5.myworkdayjobs.com', 'jobs.lever.co', 'openai.com', 'job-boards.greenhouse.io']) assert.ok(careers.includes(host), host)
  assert.ok(careers.includes('https://keithwilliams.org/ai-careers'))
  assert.ok(careers.includes('application/ld+json'))
  requireLink(home, '/ai-careers')
  requireLink(mainContent(writing), '/ai-careers')
  assert.ok(sitemap.includes('/ai-careers'))
})

check('Career skills report has 50 distinct sourced descriptions and honest limits', () => {
  const careers = read('ai-careers.html')
  const resource = 'research/ai-careers.json'
  const legacyResource = 'research/ai-careers-2026-11-12.json'
  const publicData = read(resource)
  assert.equal(read(legacyResource), publicData, 'Legacy data URL must preserve compatibility')
  assert.doesNotMatch(publicData, /"checked_date"\s*:/)
  const dataset = JSON.parse(publicData)
  assert.equal(dataset.families.length, 5)
  const postings = dataset.families.flatMap(f => f.postings)
  assert.equal(postings.length, 50)
  assert.equal(new Set(postings.map(p => p.url)).size, 50)
  for (const family of dataset.families) {
    assert.equal(family.postings.length, 10)
    for (const count of Object.values(family.counts)) assert.ok(count >= 0 && count <= 10)
    for (const p of family.postings) {
      assert.ok(p.url.startsWith('https://') && p.evidence && p.status && p.skills.length)
    }
  }
  for (const phrase of ['50 real posting descriptions', 'purposive convenience sample', 'application status unconfirmed', 'not hiring guarantees']) assert.ok(careers.includes(phrase), phrase)
  assert.equal((careers.match(/class="career-evidence"/g) || []).length, 5)
  requireLink(mainContent(careers), '/' + resource)
  assert.ok(!mainContent(careers).includes('/' + legacyResource), 'Readers should use the stable resource URL')
})

function publicDateFinding(html) {
  // Strip non-visible program data before inspecting reader-facing copy and accessible labels.
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || ''
  const body = (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '')
    .replace(/<!--[^]*?-->/g, '').replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  const clean = value => value.replace(/&(?:amp|quot|#39|apos|nbsp|#160|#xA0);/gi,
    entity => ({ '&amp;': '&', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ', '&#160;': ' ', '&#xa0;': ' ' })[entity.toLowerCase()])
    .replace(/[\s\u200b]+/g, ' ').trim()
  const fields = [body.replace(/<[^>]*>/g, ' '), head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '']
  for (const match of body.matchAll(/<[a-z][^>]*>/gi)) {
    for (const attr of match[0].matchAll(/\s(?:alt|title|aria-label|placeholder|datetime)="([^"]*)"/gi)) fields.push(attr[1])
  }
  const timestamp = /^(?:(?:article|og|video|book|music):(?:published_time|modified_time|updated_time|release_date|expiration_time)|(?:(?:dc|dcterms)[.:])?(?:date(?:created|published|modified|issued|updated)?|created|modified|issued)|last-modified|pubdate)$/i
  for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const key = tag.match(/\s(?:name|property|http-equiv)="([^"]+)"/i)?.[1] || ''
    if (timestamp.test(key)) return 'publishing timestamp metadata: ' + key
    if (/^(?:(?:og|twitter):(?:title|description|image:alt)|description)$/i.test(key)) {
      fields.push(tag.match(/\scontent="([^"]+)"/i)?.[1] || '')
    }
  }
  for (const [, json] of head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    const visit = item => {
      if (!item || typeof item !== 'object') return undefined
      for (const [key, value] of Object.entries(item)) {
        if (/^(?:date(?:Published|Modified|Created|Updated)|uploadDate|releaseDate|copyrightYear|sdDatePublished)$/.test(key)) return key
        if (typeof value === 'string' && /^(?:description|headline|abstract|caption|name)$/.test(key)) fields.push(value)
        const found = visit(value)
        if (found) return found
      }
    }
    const bad = visit(JSON.parse(json))
    if (bad) return 'publishing timestamp in structured data: ' + bad
  }
  const month = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
  const day = '(?:0?[1-9]|[12]\\d|3[01])(?:st|nd|rd|th)?'
  const exact = new RegExp('\\b(?:' + month + '\\.?\\s+(?:the\\s+)?' + day + '|' + day + '\\s+(?:of\\s+)?' + month + '|(?:0?[1-9]|1[0-2])[/.-](?:0?[1-9]|[12]\\d|3[01])[/.-](?:\\d{4}|\\d{2})|(?:0?[1-9]|[12]\\d|3[01])/(?:0?[1-9]|1[0-2])/(?:(?:\\d{4}|\\d{2})))\\b', 'i')
  for (const value of fields) {
    const text = clean(value)
      // Keep actual references and tool identifiers intact (URLs, file paths, and Rust edition flags).
      .replace(/\{#[a-z][\w:.-]*\}|\b[A-Z]{1,5}-\d{1,3}(?:\/(?:[A-Z]{1,5}-)?\d{1,3})+\b/g, ' ')
      .replace(/(?:https?:\/\/|www\.)\S+|(?:^|\s)(?:\.\.?\/|\/)[^\s<>]+/gi, ' ')
      .replace(/\b[\w.-]*\d{4}[-.\w]*\.(?:json|csv|pdf|md|png|jpe?g|webp)\b|--edition(?:\s*=\s*|\s+)\d{4}\b|\b(?:RFC|ISO|IEEE)\s+\d{4}(?=\b)/gi, ' ')
    const visibleYear = /(?<![\w/])(?:1[6-9]|20)\d{2}(?:s)?(?![\w/])/i
    const iso = /\b(?:1[6-9]|20)\d{2}[-/](?:0[1-9]|1[0-2])[-/](?:0[1-9]|[12]\d|3[01])\b/
    const spelledMonth = /\b(?:January|February|April|June|July|August|September|October|November|December)\b/
    const monthContext = /\b(?:in|by|since|during|until|through|of|from|each|every|last|this|next)\s+(?:May|March)\b/
    const shortDate = /\b(?:dated?|updated?|on|due|checked|deadline|as of|posted)\s+(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12]\d|3[01])\b/i
    const date = text.match(iso) || text.match(exact) || text.match(visibleYear) ||
      text.match(spelledMonth) || text.match(monthContext) || text.match(shortDate)
    if (date) return 'reader-facing date: ' + text.slice(Math.max(0, date.index - 26), date.index + date[0].length + 25)
  }
}

check('Public copy, accessible labels and sharing previews omit calendar dates', () => {
  const problems = []
  for (const file of readdirSync(dist, { recursive: true }).filter(file => file.endsWith('.html'))) {
    const problem = publicDateFinding(read(file))
    if (problem) problems.push(file + ': ' + problem)
  }
  assert.deepEqual(problems, [])
})

console.log(`\n${checks.length} static checks passed. Browser and real-device checks remain separate.`)
