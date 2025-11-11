const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const contentPath = path.join(repoRoot, 'src', 'config', 'content.json')

function usage() {
  console.log('Uso: node scripts\\updatePhotoAlts.js <updates.json>')
  console.log('El archivo updates.json debe tener la forma:')
  console.log('{ "ph1": "Nueva i 1", "ph2": "Otra descripcffión" }')
}

async function main() {
  const arg = process.argv[2]
  if (!arg) {
    usage()
    process.exit(1)
  }

  const updatesPath = path.resolve(process.cwd(), arg)
  if (!fs.existsSync(updatesPath)) {
    console.error('No se encontró el archivo de actualizaciones:', updatesPath)
    process.exit(1)
  }

  const contentRaw = fs.readFileSync(contentPath, 'utf8')
  let content
  try { content = JSON.parse(contentRaw) } catch (e) { console.error('Error parseando content.json:', e); process.exit(1) }

  const updatesRaw = fs.readFileSync(updatesPath, 'utf8')
  let updates
  try { updates = JSON.parse(updatesRaw) } catch (e) { console.error('Error parseando updates.json:', e); process.exit(1) }

  if (!Array.isArray(content.photos)) {
    console.error('content.json no contiene un arreglo "photos"')
    process.exit(1)
  }

  let changed = 0
  content.photos.forEach((p) => {
    if (p && p.id && Object.prototype.hasOwnProperty.call(updates, p.id)) {
      const newAlt = String(updates[p.id] ?? '')
      if (p.alt !== newAlt) {
        p.alt = newAlt
        changed++
      }
    }
  })

  if (changed === 0) {
    console.log('No se realizaron cambios. Comprueba los ids en el archivo de actualizaciones.')
    process.exit(0)
  }

  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2) + '\n', 'utf8')
  console.log(`Actualizadas ${changed} descripciones en ${contentPath}`)
}

main()
