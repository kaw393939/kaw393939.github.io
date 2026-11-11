import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve('docs/.vitepress/dist')
const page = name => readFileSync(resolve(root, 'knowledge-lab', name), 'utf8')
const manifest = JSON.parse(page('mirror-manifest.json'))
assert.equal(manifest.repository, 'https://github.com/kaw393939/is373-rag.git')
assert.equal(manifest.revision, '797882fc1043e15db4f210e29cd3e97b35615294')
assert.equal(manifest.base, '/knowledge-lab/')
const homepage = readFileSync(resolve(root,'index.html'),'utf8')
assert.ok(homepage.includes('href="/knowledge-lab/"'), 'Main nav must link to the published Knowledge Lab')
assert.ok(homepage.includes('Knowledge Lab'), 'Main nav project name is missing')
assert.ok(!homepage.includes('href="/is373-rag/"'), 'Do not publish stale main navigation')
assert.ok(homepage.includes('Ordo Knowledge Lab'), 'Portfolio case study is missing')
for (const target of ['index.html','students/index.html','students/prompts.html',
  'guide/vision.html','project/roadmap.html','students/embeddings.html',
  'students/chunking.html','students/library-survey.html','students/from-app-studio.html','assets','sitemap.xml']) {
  assert.ok(existsSync(resolve(root, 'knowledge-lab',target)), `Missing mirrored target ${target}`)
}
const home = page('index.html')
const students = page('students/index.html')
assert.ok(home.includes('Build answers you') && home.includes('ONE COMPLETE RAG EXAMPLE'), 'Expected project landing')
assert.ok(students.includes('Build a small RAG system you can explain'), 'Expected student guide')
assert.ok(students.includes('/knowledge-lab/students/'), 'Local navigation must retain mirror base')
const robots = page('sitemap.xml')
assert.ok(robots.includes('https://keithwilliams.org/knowledge-lab/'), 'Wrong sitemap origin/base')
for (const html of [home,students]) {
  assert.ok(!html.includes('href="/is373-rag/'), 'Old standalone-base URL in mirror')
}
const redirect = readFileSync(resolve(root, 'is373-rag', 'index.html'), 'utf8')
assert.match(redirect, /http-equiv="refresh"/i, 'Legacy URL should have a static redirect')
assert.ok(redirect.includes('/knowledge-lab/'), 'Legacy URL should lead to published docs')
for (const route of ['students/index.html', 'students/prompts.html', 'guide/vision.html']) {
  const alias = readFileSync(resolve(root, 'is373-rag', route), 'utf8')
  assert.ok(alias.includes('/knowledge-lab/'), `Legacy deep link missing redirect: ${route}`)
}
console.log('PASS: pinned full knowledge-lab mirror, correct portfolio links, and legacy/deep-link redirects.')
