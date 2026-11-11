// Build a pinned, public VitePress mirror without forking the project's content.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, cpSync, rmSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join, relative, dirname, sep } from 'node:path'

export const source = {
  repository: 'https://github.com/kaw393939/is373-rag.git',
  revision: '797882fc1043e15db4f210e29cd3e97b35615294',
  base: '/knowledge-lab/',
  origin: 'https://keithwilliams.org'
}
const run = (command, args, dir, env = process.env) => {
  const proc = spawnSync(command, args, { cwd: dir, env, encoding: 'utf8',
    stdio: ['ignore','pipe','pipe'], maxBuffer: 3 * 1024 * 1024 })
  if (proc.status !== 0) throw new Error(
    `${command} ${args.slice(0,3).join(' ')} failed: ${(proc.stderr || proc.stdout || '').slice(-4000)}`
  )
  return (proc.stdout || '').trim()
}
const root = resolve(new URL('..', import.meta.url).pathname)
const destination = join(root, 'docs/.vitepress/dist/knowledge-lab')
const temp = mkdtempSync(join(tmpdir(), 'ordo-docs-source-'))
try {
  run('git', ['init', '-q'], temp)
  run('git', ['remote', 'add', 'origin', source.repository], temp)
  run('git', ['fetch', '--depth=1', 'origin', source.revision], temp)
  run('git', ['checkout', '--detach', 'FETCH_HEAD'], temp)
  const actual = run('git', ['rev-parse', 'HEAD'], temp)
  assert.equal(actual, source.revision, 'Source changed from approved revision')
  run('npm', ['ci', '--no-audit', '--no-fund'], temp)
  const env = {...process.env, DOCS_BASE: source.base, DOCS_ORIGIN: source.origin, GITHUB_SHA: source.revision}
  for (const cmd of [['npm', ['run','check:plan']],
                     ['npm', ['run','test:students']],
                     ['npm', ['run','test:examples']],
                     ['npm', ['run','build']],
                     ['npm', ['run','check:pages']],
                     ['node', ['scripts/check-ia.mjs']]]) run(cmd[0], cmd[1], temp, env)
  if (!existsSync(join(temp, 'dist/students/index.html'))) throw new Error('No built student guide')
  rmSync(destination, { recursive: true, force: true })
  mkdirSync(destination, { recursive: true })
  cpSync(join(temp, 'dist'), destination, { recursive: true })
  writeFileSync(join(destination, 'mirror-manifest.json'),
    JSON.stringify({project:'Ordo Knowledge Lab', repository:source.repository,
      revision:source.revision, base:source.base}, null, 2) + '\n')

  // Static GitHub Pages fallback for the original project URL. Avoid redirecting
  // the canonical docs themselves: one source, one published location.
  const legacyDir = join(root, 'docs/.vitepress/dist/is373-rag')
  rmSync(legacyDir, { recursive: true, force: true })
  const htmlFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = join(dir, entry.name)
    return entry.isDirectory() ? htmlFiles(full) : entry.name.endsWith('.html') ? [full] : []
  })
  for (const page of htmlFiles(destination)) {
    const rel = relative(destination, page).split(sep).join('/')
    const clean = rel === 'index.html' ? '' :
      rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) :
      rel.slice(0, -'.html'.length)
    const target = source.base + clean
    const redirect = join(legacyDir, rel)
    mkdirSync(dirname(redirect), { recursive: true })
    writeFileSync(redirect,
      `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${source.origin}${target}">
<meta http-equiv="refresh" content="0;url=${target}">
<title>Ordo Knowledge Lab — moved</title></head>
<body><main><h1>Ordo Knowledge Lab has moved</h1>
<p>Find the documentation at <a href="${target}">${target}</a>.</p>
</main><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></body></html>\n`)
  }
  process.stdout.write(`Created ${htmlFiles(destination).length} legacy-route redirects at /is373-rag/.\n`)
  process.stdout.write(`Mirrored verified Ordo docs from ${source.revision} at ${source.base}\n`)
} finally {
  rmSync(temp, { recursive: true, force: true })
}
