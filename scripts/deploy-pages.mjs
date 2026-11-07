import { spawnSync } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, cpSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Publish only the generated static files. No GitHub Actions permissions needed.
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const gitOptions = ['-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential']
const run = (command, args, cwd = root, allow = [0]) => {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: ['inherit', 'pipe', 'pipe'] })
  if (result.stdout) process.stdout.write(result.stdout)
  if (result.stderr) process.stderr.write(result.stderr)
  if (!allow.includes(result.status)) throw new Error(`${command} failed (${result.status})`)
  return result
}
const git = (args, cwd = root, allow = [0]) => run('git', [...gitOptions, ...args], cwd, allow)

run('npm', ['run', 'build'])
const remote = git(['remote', 'get-url', 'origin']).stdout.trim()
const temporaryCheckout = mkdtempSync(join(tmpdir(), 'keith-pages-'))
try {
  git(['init', '-b', 'gh-pages'], temporaryCheckout)
  git(['remote', 'add', 'origin', remote], temporaryCheckout)
  const exists = git(['ls-remote', '--exit-code', '--heads', 'origin', 'gh-pages'], temporaryCheckout, [0, 2]).status === 0
  if (exists) {
    git(['fetch', '--depth=1', 'origin', 'gh-pages'], temporaryCheckout)
    git(['reset', '--hard', 'FETCH_HEAD'], temporaryCheckout)
  }
  for (const entry of readdirSync(temporaryCheckout)) {
    if (entry !== '.git') rmSync(join(temporaryCheckout, entry), { recursive: true, force: true })
  }
  cpSync(join(root, 'docs/.vitepress/dist'), temporaryCheckout, { recursive: true })
  writeFileSync(join(temporaryCheckout, '.nojekyll'), '')
  git(['add', '--all'], temporaryCheckout)
  const unchanged = git(['diff', '--cached', '--quiet'], temporaryCheckout, [0, 1]).status === 0
  if (!unchanged) {
    const source = git(['rev-parse', '--short', 'HEAD']).stdout.trim()
    git(['-c', 'user.name=Keith Williams', '-c', 'user.email=2547801+kaw393939@users.noreply.github.com', 'commit', '-m', `Publish homepage from ${source}`], temporaryCheckout)
    git(['push', 'origin', 'HEAD:gh-pages'], temporaryCheckout)
  }
  console.log('Static files are on gh-pages. Check GitHub Pages deployment before announcing publication.')
} finally {
  rmSync(temporaryCheckout, { recursive: true, force: true })
}
