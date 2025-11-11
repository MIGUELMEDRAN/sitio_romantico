import { useState } from 'react'
import content from '@/config/content.json'
import type { Photo } from '@/domain/media.types'
import { motion, AnimatePresence } from 'framer-motion'
import { ButterfliesEffect } from '@/components/effects/ButterfliesEffect'

export default function PhotoCarousel() {
  const photos = (content.photoCarousel ?? content.photos) as Photo[]
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

  const next = () => {
    setIndex((i) => (i + 1) % photos.length)
  }
  const prev = () => {
    setIndex((i) => (i - 1 + photos.length) % photos.length)
  }

  const current = photos[index]

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-12 text-center">Lindos Momentos❤️😘</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {photos.map((photo, i) => (
            i === index && (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                  {/* Imagen */}
                  <div className="relative overflow-hidden h-80 md:h-96 bg-gray-200">
                    <motion.img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 right-4 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {index + 1} / {photos.length}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{photo.alt}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      No soy perfecto ni el mejor hombre, pero contigo descubrí que el amor verdadero no necesita perfección, solo corazón.
                    </p>

                    {/* Botones de acción */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => spawnButterflies(e)}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                      >
                        💕 Me encanta
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => spawnButterflies(e)}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                      >
                        🌹 Rosas
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => spawnButterflies(e)}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                      >
                        🦋 Mariposas
                      </motion.button>
                    </div>

                    {/* Flechas de navegación */}
                    <div className="flex items-center justify-between gap-4">
                      <motion.button
                        onClick={(e) => { prev(); spawnButterflies(e) }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-full flex items-center justify-center text-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        ←
                      </motion.button>
                      
                      <div className="flex-1 flex justify-center">
                        <div className="flex gap-2">
                          {photos.map((_, i) => (
                            <motion.button
                              key={i}
                              onClick={() => setIndex(i)}
                              className={`h-2 rounded-full transition-all ${
                                i === index
                                  ? 'bg-rose-500 w-8'
                                  : 'bg-gray-300 w-2 hover:bg-gray-400'
                              }`}
                              whileHover={{ scale: 1.2 }}
                            />
                          ))}
                        </div>
                      </div>

                      <motion.button
                        onClick={(e) => { next(); spawnButterflies(e) }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-full flex items-center justify-center text-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        →
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
