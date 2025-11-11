import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import content from '@/config/content.json'

export default function WelcomeHero() {
  const { t } = useTranslation()
  const names = content.names
  const date = new Date(2023, 2, 8)
  const formatted = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container mx-auto px-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {t('welcome', { name: names.her })}
        </h1>
        <p className="mt-4 text-rose-700">{content.welcomeMessage} — {formatted}</p>
      </motion.div>
    </section>
  )
}
