import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ButterfliesEffect } from '@/components/effects/ButterfliesEffect'
import { RosesEffect } from '@/components/effects/RosesEffect'

type Props = { effect: 'butterflies' | 'roses'; label: string }

export default function SurpriseButton({ effect, label }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onClick = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const host = containerRef.current
    if (!host) return
    const impl = effect === 'butterflies' ? new ButterfliesEffect() : new RosesEffect()
    impl.spawn(host)
    setTimeout(() => impl.dispose(), 1500)
  }

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={onClick}
        className="rounded-2xl bg-rose-600 text-white px-6 py-3 shadow hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      >
        {label}
      </motion.button>
    </div>
  )
}
