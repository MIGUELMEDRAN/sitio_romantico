import React from 'react'
import { motion } from 'framer-motion'
import { ButterfliesEffect } from '@/components/effects/ButterfliesEffect'

interface MomentCardProps {
  id: number
  title: string
  description: string
  img?: string
  index?: number
}

const placeholder = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='32'>Foto no disponible</text></svg>`

export default function MomentCard({ id, title, description, img, index = 0 }: MomentCardProps) {
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

  return (
    <motion.article
      key={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Imagen con proporción 16:9 */}
      <div className="relative overflow-hidden bg-gray-200 aspect-video">
        <motion.img
          src={img || placeholder}
          alt={title}
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {description}
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <motion.button
            type="button"
            aria-label="Me encanta"
            onClick={(e) => spawnButterflies(e)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            💖
          </motion.button>

          <motion.button
            type="button"
            aria-label="Rosas"
            onClick={(e) => spawnButterflies(e)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            🌹
          </motion.button>

          <motion.button
            type="button"
            aria-label="Mariposas"
            onClick={(e) => spawnButterflies(e)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            🦋
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
