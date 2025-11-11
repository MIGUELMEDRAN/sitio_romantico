import { useState, useEffect } from 'react'
import content from '@/config/content.json'
import type { Photo } from '@/domain/media.types'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ButterfliesEffect } from '@/components/effects/ButterfliesEffect'
import { StorageService } from '@/services/storage.service'

export default function PhotoGrid() {
  const photos = content.photos as Photo[]
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const spawnButterflies = (event: React.MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = `${rect.left + rect.width / 2}px`
    container.style.top = `${rect.top + rect.height / 2}px`
    container.style.pointerEvents = 'none'
    document.body.appendChild(container)
    
    const impl = new ButterfliesEffect()
    impl.spawn(container)
    setTimeout(() => {
      impl.dispose()
      document.body.removeChild(container)
    }, 1500)
  }

  const openAt = (i: number) => { setIndex(i); setOpen(true) }
  const close = () => setOpen(false)
  const next = () => setIndex((i) => (i + 1) % photos.length)
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  // Storage helper
  const storage = new StorageService()

  // Note state for the card at the end
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = storage.getLocal<string>('userNote')
    if (existing) setNote(existing)
  }, [])

  const saveNote = () => {
    storage.setLocal('userNote', note)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const clearNote = () => {
    setNote('')
    storage.setLocal('userNote', '')
    setSaved(false)
  }

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-12 text-center">Nuestros Momentos</h2>
      
      {/* Tres columnas independientes: cada una renderiza la foto en su posición */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[0, 1, 2].map((colIndex) => {
          const photo = photos[colIndex]
          if (!photo) {
            return (
              <div key={colIndex} className="bg-white rounded-2xl shadow-2xl p-6 text-center text-gray-400">
                Sin foto asignada
              </div>
            )
          }
          const meta = (photo as any)
          return (
            <div key={photo.id}>
              {meta.title && (
                <div className="bg-white/60 p-4 rounded-xl shadow-sm text-center mb-4">
                  <h4 className="text-lg font-semibold">{meta.title}</h4>
                  {meta.description && <p className="text-sm text-gray-600 mt-1">{meta.description}</p>}
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300"
              >
                {/* Imagen */}
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <motion.button
                    onClick={(e) => { openAt(colIndex); spawnButterflies(e) }}
                    className="w-full h-full group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={photo.thumb || photo.src} alt={photo.alt} loading="lazy" decoding="async"
                      className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Ver foto</span>
                    </div>
                  </motion.button>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{photo.alt}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Cada instante contigo es una página de nuestro amor, escrita con miradas, risas y abrazos.
                  </p>

                  {/* Botones */}
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => spawnButterflies(e)}
                      className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
                    >
                      💕
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => spawnButterflies(e)}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
                    >
                      🌹
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => spawnButterflies(e)}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
                    >
                      🦋
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Sección tipo carta: mostrar mensaje solo lectura y centrado */}
      <div className="mt-12 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 text-center"
        >
          <h3 className="text-xl font-semibold mb-3 text-center">Carta De Amor</h3>
          

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 min-h-[120px] flex items-center justify-center">
            {note ? (
              <p className="text-gray-800 text-center whitespace-pre-wrap">{note}</p>
            ) : (
              <p className="text-gray-400 italic">Mi amor, no hay palabras que puedan describir todo lo que siento por ti. Te amo con todo mi corazón y me encantas más de lo que imaginas.
                                                  No soy el mejor hombre, ni perfecto, y quizás no tenga nada especial, pero de algo sí estoy completamente seguro: te amo, y de eso no tengas la menor duda.
                                                  Me encantas y me vuelves loco, amor. Gracias por estar a mi lado.</p>
            )}
          </div>

          
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <Dialog open={open} onClose={close} className="relative z-50" static>
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Dialog.Panel className="relative max-w-5xl w-full">
                  <motion.img
                    key={photos[index].id}
                    src={photos[index].src}
                    alt={photos[index].alt}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="mt-4 flex items-center justify-between gap-2 text-white">
                    <motion.button
                      onClick={(e) => { prev(); spawnButterflies(e) }}
                      aria-label="Anterior"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      ←
                    </motion.button>
                    <motion.button
                      onClick={(e) => { close(); spawnButterflies(e) }}
                      aria-label="Cerrar"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Cerrar
                    </motion.button>
                    <motion.button
                      onClick={(e) => { next(); spawnButterflies(e) }}
                      aria-label="Siguiente"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      →
                    </motion.button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
