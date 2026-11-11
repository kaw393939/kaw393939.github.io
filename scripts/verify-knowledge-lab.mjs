import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve('docs/.vitepress/dist')
const page = name => readFileSync(resolve(root, 'knowledge-lab', name), 'utf8')
const manifest = JSON.parse(page('mirror-manifest.json'))
assert.equal(manifest.repository, 'https://github.com/kaw393939/is373-rag.git')
assert.equal(manifest.revision, '55f3b48df36db9a3621f94fc07bcd23d749063c8')
assert.equal(manifest.base, '/knowledge-lab/')
const homepage = readFileSync(resolve(root,'index.html'),'utf8')
assert.ok(homepage.includes('href="/knowledge-lab/"'), 'Main nav must link to the local hosted docs')
assert.ok(homepage.includes('Knowledge Lab'), 'Main nav project name is missing')
assert.ok(homepage.includes('Ordo Knowledge Lab'), 'Portfolio case study is missing')
for (const target of ['index.html','students/index.html','students/prompts.html',
  'guide/vision.html','project/roadmap.html','assets','sitemap.xml']) {
  assert.ok(existsSync(resolve(root, 'knowledge-lab',target)), `Missing mirrored target ${target}`)
}
const home = page('index.html')
const students = page('students/index.html')
assert.ok(home.includes('Knowledge you') && home.includes('Canonical identity'), 'Expected project landing')
assert.ok(students.includes('Build a small RAG system you can explain'), 'Expected student guide')
assert.ok(students.includes('/knowledge-lab/students/'), 'Local navigation must retain mirror base')
const robots = page('sitemap.xml')
assert.ok(robots.includes('https://kaw393939.github.io/knowledge-lab/'), 'Wrong sitemap origin/base')
for (const html of [home,students]) {
  assert.ok(!html.includes('href="/is373-rag/'), 'Old standalone-base URL in mirror')
}
console.log('PASS: pinned full knowledge-lab mirror, student pages, portfolio navigation and base-aware assets.')
