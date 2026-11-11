// One-time import: the resulting MP3 is committed to this repository by the first production release.
// After that commit, this script exits without requesting the temporary ElevenLabs URL again.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const destination = resolve('docs/public/audio/portfolio-intro.mp3')
if (!existsSync(destination)) {
  const url = "https://elevenlabsusercontent.com/database/workspace/188539715daa4dbea3f7981c0b218af1/content_generation/wfX0d5sSJ9NNH4oIJ6f8/tfg1DA2HmQG3Cfqi5FYk/content.mp3?Expires=1794445200&KeyName=assets-cdn-key-1&Signature=ESXF9S-gHK6nxPi0BRH4PSjWFeg="
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`Hero audio download failed: HTTP ${response.status}`)
  const data = new Uint8Array(await response.arrayBuffer())
  if (data.length < 1000 || data.length > 2000000) throw new Error('Hero audio size outside expected range')
  if (!(data[0] === 0x49 && data[1] === 0x44 && data[2] === 0x33) && data[0] !== 0xff) {
    throw new Error('Hero audio is not an MP3')
  }
  mkdirSync(dirname(destination), { recursive: true })
  writeFileSync(destination, data)
  console.log(`Imported portfolio narration (${data.length} bytes)`)
}
