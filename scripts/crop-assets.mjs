import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const sourceDir = path.join(root, 'generated-source')
const outDir = path.join(root, 'public', 'products')
fs.mkdirSync(outDir, { recursive: true })
const categories = ['furniture','soft','daily','decor','kitchen']
for (const key of categories) {
  const input = path.join(sourceDir, `${key}-sheet.png`)
  if (!fs.existsSync(input)) { console.warn(`Missing ${input}`); continue }
  const meta = await sharp(input).metadata()
  const cellW = Math.floor(meta.width / 5)
  const cellH = Math.floor(meta.height / 2)
  for (let i = 0; i < 10; i++) {
    const left = (i % 5) * cellW
    const top = Math.floor(i / 5) * cellH
    await sharp(input).extract({ left, top, width: cellW, height: cellH }).resize(720, 720, { fit: 'cover' }).webp({ quality: 86 }).toFile(path.join(outDir, `${key}-${i + 1}.webp`))
  }
}
console.log('Prepared 50 local WebP product assets.')
