import { type LoveEffect } from '@/domain/effects.types'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

function Butterfly({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x }}
      animate={{ opacity: 1, y: -120, x: x + (Math.random()*40-20) }}
      transition={{ duration: 1.2, ease: 'easeOut', delay }}
      className="absolute"
      aria-hidden
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-rose-400">
        <path d="M12 12c3-6 8-6 8-2s-3 4-8 2zM12 12c-3-6-8-6-8-2s3 4 8 2z"/>
        <circle cx="12" cy="13" r="1" />
      </svg>
    </motion.div>
  )
}

export class ButterfliesEffect implements LoveEffect {
  private host?: HTMLElement
  spawn(container: HTMLElement) {
    this.host = document.createElement('div')
    this.host.className = 'pointer-events-none absolute inset-0 overflow-visible'
    container.appendChild(this.host)
    const Root = () => {
      const [nodes] = useState(Array.from({ length: 12 }, (_, i) => ({ x: Math.random()*300, d: i*0.05 })))
      return <>{nodes.map((n, i) => <Butterfly key={i} x={n.x} delay={n.d} />)}</>
    }
    const portal = createPortal(<Root />, this.host)
    ;(this.host as any).__portal = portal
  }
  dispose() {
    if (this.host?.parentElement) this.host.parentElement.removeChild(this.host)
  }
}
