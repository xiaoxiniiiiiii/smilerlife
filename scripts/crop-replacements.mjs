import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const input = path.join(root, 'generated-source', 'replacement-sheet.png')
const outDir = path.join(root, 'public', 'products')
const targets = ['furniture-1','furniture-2','furniture-3','furniture-4','furniture-5','furniture-6','furniture-7','furniture-8','soft-5','decor-5']
const meta = await sharp(input).metadata()
const cellW = Math.floor(meta.width / 5)
const cellH = Math.floor(meta.height / 2)
for (let i = 0; i < targets.length; i++) {
  const left = (i % 5) * cellW
  const top = Math.floor(i / 5) * cellH
  await sharp(input).extract({ left, top, width: cellW, height: cellH }).resize(720, 720, { fit: 'cover' }).webp({ quality: 86 }).toFile(path.join(outDir, `${targets[i]}.webp`))
}
console.log(`Replaced ${targets.length} product assets.`)
