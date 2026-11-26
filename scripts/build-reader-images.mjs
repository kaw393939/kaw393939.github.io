import { createHash } from 'node:crypto'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const imageDir = fileURLToPath(new URL('../docs/public/images/', import.meta.url))
const outputDir = join(imageDir, 'reader')
const manifestFile = fileURLToPath(new URL('../docs/.vitepress/generated/reader-images.json', import.meta.url))
const manifest = {}
const current = new Set()
await mkdir(outputDir, { recursive: true })

const sources = (await readdir(imageDir, { recursive: true }))
  .filter(path => /\.(?:jpe?g|png)$/i.test(path))
  .sort()

for (const path of sources) {
  const image = sharp(join(imageDir, path)).autoOrient()
  const { autoOrient } = await image.metadata()
  const widths = [480, 768].filter(width => width < autoOrient.width)
  widths.push(Math.min(autoOrient.width, 1600))
  const variants = []
  for (const width of widths) {
    const bytes = await image.clone().resize({ width }).webp({ quality: 80 }).toBuffer()
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12)
    const filename = basename(path, extname(path)) + '-' + hash + '-' + width + '.webp'
    await writeFile(join(outputDir, filename), bytes)
    current.add(filename)
    variants.push({ url: '/images/reader/' + encodeURIComponent(filename), width })
  }
  manifest['/images/' + path.split(sep).join('/')] = variants
}

await mkdir(dirname(manifestFile), { recursive: true })
await writeFile(manifestFile, JSON.stringify(manifest) + '\n')
for (const filename of await readdir(outputDir)) {
  if (/-[a-f0-9]{12}-\d+\.webp$/.test(filename) && !current.has(filename)) await rm(join(outputDir, filename))
}
console.log('Generated ' + current.size + ' reader images from ' + sources.length + ' originals.')
