import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  open: boolean
  message?: string | null
  onClose: () => void
}

export default function LoveMessageModal({ open, message, onClose }: Props) {
  if (!message) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/60 backdrop-blur-sm px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-xl rounded-3xl bg-white/95 shadow-2xl p-8 text-center border border-rose-100"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
              Con mucho amor
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-rose-900 leading-snug mb-6">
              {message}
            </p>
            <p className="text-rose-500 mb-6">
              Cada visita es una nueva razón para recordarte lo especial que eres.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-rose-700 transition"
            >
              Seguir disfrutando 💞
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
