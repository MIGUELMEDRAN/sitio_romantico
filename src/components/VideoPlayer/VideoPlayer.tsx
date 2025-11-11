import { useEffect, useRef } from 'react'
import type { Video } from '@/domain/media.types'
import { StorageService } from '@/services/storage.service'

const store = new StorageService()

type Props = { video: Video }

export default function VideoPlayer({ video }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const key = `video:${video.id}:time`
    const saved = store.getLocal<number>(key)
    if (saved) el.currentTime = saved

    const onTime = () => store.setLocal(key, el.currentTime)
    el.addEventListener('timeupdate', onTime)

    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return
      if (!el) return
      switch (e.key.toLowerCase()) {
        case 'k': el.paused ? el.play() : el.pause(); break
        case 'j': el.currentTime = Math.max(0, el.currentTime - 10); break
        case 'l': el.currentTime = Math.min(el.duration, el.currentTime + 10); break
        case 'f': if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen(); break
        case 'm': el.muted = !el.muted; break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      window.removeEventListener('keydown', onKey)
    }
  }, [video.id])

  return (
    <figure className="rounded-xl overflow-hidden shadow bg-black">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        controls
        className="w-full h-auto"
        preload="metadata"
      />
      {video.title && <figcaption className="p-2 text-sm text-rose-100">{video.title}</figcaption>}
    </figure>
  )
}
