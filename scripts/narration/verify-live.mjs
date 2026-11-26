import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { setTimeout as delay } from 'node:timers/promises'

const root = 'https://keithwilliams.org'
const release = process.env.GITHUB_SHA || 'manual'
for (const section of ['journal', 'lab']) {
  const expected = JSON.parse(readFileSync('docs/.vitepress/dist/listen/' + section + '.json'))
  let live
  for (let retry = 0; retry < 20; retry++) {
    const reply = await fetch(root + '/listen/' + section + '.json?edition=' + release, { signal: AbortSignal.timeout(15000) })
    if (reply.ok) {
      live = await reply.json()
      if (JSON.stringify(live) === JSON.stringify(expected)) break
    }
    await delay(5000)
  }
  assert.deepEqual(live, expected, section + ' public edition index')
  const entries = Object.entries(live)
  for (let i = 0; i < entries.length; i += 6) {
    await Promise.all(entries.slice(i,i+6).map(async ([route, record]) => {
      const response = await fetch(record.src, { headers: { Range:'bytes=0-2047' }, signal: AbortSignal.timeout(20000) })
      assert.ok(response.status === 200 || response.status === 206, record.src)
      assert.match(response.headers.get('content-type') || '', /audio\/mpeg/i)
      const reader = response.body.getReader()
      const {value} = await reader.read()
      await reader.cancel()
      assert.ok(value?.length && (Buffer.from(value.subarray(0,3)).toString() === 'ID3' || value[0] === 255), route)
      const url = root + (section === 'lab' ? '/knowledge-lab' : '') + route
      const article = await fetch(url+'?edition='+release, {signal: AbortSignal.timeout(20000)})
      assert.ok(article.ok, url)
      assert.ok((await article.text()).includes(record.src), 'Published page has the corresponding recording: '+url)
    }))
  }
  console.log('PASS: '+entries.length+' '+section+' pages serve their own live native MP3 recordings.')
}
