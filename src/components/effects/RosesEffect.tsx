import { type LoveEffect } from '@/domain/effects.types'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

function Rose({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20, x }}
      animate={{ opacity: 1, scale: 1, y: -100 }}
      transition={{ duration: 1.0, ease: 'easeOut', delay }}
      className="absolute"
      aria-hidden
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-rose-600">
        <path d="M12 22c4-4 6-6 6-10a6 6 0 10-12 0c0 4 2 6 6 10z" />
      </svg>
    </motion.div>
  )
}

export class RosesEffect implements LoveEffect {
  private host?: HTMLElement
  spawn(container: HTMLElement) {
    this.host = document.createElement('div')
    this.host.className = 'pointer-events-none absolute inset-0 overflow-visible'
    container.appendChild(this.host)
    const Root = () => {
      const [nodes] = useState(Array.from({ length: 10 }, (_, i) => ({ x: Math.random()*300, d: i*0.06 })))
      return <>{nodes.map((n, i) => <Rose key={i} x={n.x} delay={n.d} />)}</>
    }
    const portal = createPortal(<Root />, this.host)
    ;(this.host as any).__portal = portal
  }
  dispose() {
    if (this.host?.parentElement) this.host.parentElement.removeChild(this.host)
  }
}
