// Production verification after GitHub Pages rebuilds the branch.
import assert from 'node:assert/strict'

const root = 'https://kaw393939.github.io'
const pinned = '797882fc1043e15db4f210e29cd3e97b35615294'
const targets = [
  {path: '/', test: body => body.includes('href="/knowledge-lab/"') && !body.includes('href="/is373-rag/"') && body.includes('Ordo Knowledge Lab')},
  {path: '/knowledge-lab/', test: body => body.includes('Build answers you') && body.includes('ONE COMPLETE RAG EXAMPLE')},
  // The project owns /is373-rag/ when its separate GitHub Pages site is active.
  // If that site is temporarily disabled, the portfolio's static fallback redirects.
  // Both behaviors are healthy; rejecting the direct project site is a false failure.
  {path: '/is373-rag/', test: body =>
    (body.includes('Build answers you') && body.includes('ONE COMPLETE RAG EXAMPLE')) ||
    (body.includes('http-equiv="refresh"') && body.includes('url=/knowledge-lab/'))},
  {path: '/is373-rag/students/', test: body =>
    body.includes('Build a small RAG system you can explain') ||
    (body.includes('http-equiv="refresh"') && body.includes('url=/knowledge-lab/students/'))},
  {path: '/knowledge-lab/students/', test: body => body.includes('Build a small RAG system you can explain')},
  {path: '/knowledge-lab/students/prompts', test: body => body.includes('Ask an AI coding agent')},
  {path: '/knowledge-lab/students/embeddings', test: body => body.includes('Embeddings: how can a computer find related ideas?')},
  {path: '/knowledge-lab/students/chunking', test: body => body.includes('Chunking: where should we cut a document?')},
  {path: '/knowledge-lab/students/from-app-studio', test: body => body.includes('From your existing FastAPI app to a small hosted RAG')},
  {path: '/knowledge-lab/students/library-survey', test: body => body.includes('AI libraries: what they do, and when to use them')},
  {path: '/knowledge-lab/mirror-manifest.json', test: body => {
    const info = JSON.parse(body)
    return info.revision === pinned && info.base === '/knowledge-lab/'
  }},
]
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function verify({path,test}) {
  let last = 'unavailable'
  for (let attempt = 1; attempt <= 24; attempt++) {
    try {
      const url = root + path + (path.includes('?') ? '&' : '?') + 'release=' + pinned.slice(0,8)
      const res = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        headers: {'Cache-Control':'no-cache', 'User-Agent':'Ordo-Knowledge-Lab-Release-Check'}
      })
      const body = await res.text()
      if (res.ok && test(body)) {
        console.log(`PASS: public HTTPS ${path}, verified on attempt ${attempt}`)
        return
      }
      last = `HTTP ${res.status}; content not at expected revision`
    } catch (e) {
      last = String(e.message || e)
    }
    if (attempt < 24) await sleep(6000)
  }
  throw new Error(`GitHub Pages ${path} did not serve expected content: ${last}`)
}
for (const target of targets) await verify(target)
console.log('PASS: actual portfolio and pinned Knowledge Lab pages served over public HTTPS.')
