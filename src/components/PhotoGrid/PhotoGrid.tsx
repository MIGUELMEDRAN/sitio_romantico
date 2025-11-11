import { useState } from 'react'
import content from '@/config/content.json'
import type { Photo } from '@/domain/media.types'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

export default function PhotoGrid() {
  const photos = content.photos as Photo[]
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = (i: number) => { setIndex(i); setOpen(true) }
  const close = () => setOpen(false)
  const next = () => setIndex((i) => (i + 1) % photos.length)
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p, i) => (
          <button key={p.id} onClick={() => openAt(i)} className="group relative">
            <img src={p.thumb || p.src} alt={p.alt} loading="lazy" decoding="async"
              className="aspect-square object-cover rounded-xl shadow group-hover:opacity-90 transition" />
          </button>
        ))}
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
                  <div className="mt-4 flex items-center justify-between text-white">
                    <button onClick={prev} aria-label="Anterior" className="px-4 py-2 bg-white/20 rounded-lg">←</button>
                    <button onClick={close} aria-label="Cerrar" className="px-4 py-2 bg-white/20 rounded-lg">Cerrar</button>
                    <button onClick={next} aria-label="Siguiente" className="px-4 py-2 bg-white/20 rounded-lg">→</button>
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
