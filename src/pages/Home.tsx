import { useMemo, useState } from 'react'
import WelcomeHero from '@/components/WelcomeHero/WelcomeHero'
import PhotoGrid from '@/components/PhotoGrid/PhotoGrid'
import PhotoCarousel from '@/components/PhotoCarousel/PhotoCarousel'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import LoveCounter from '@/components/LoveCounter/LoveCounter'
import LoveMessageModal from '@/components/LoveMessageModal/LoveMessageModal'
import content from '@/config/content.json'

export default function Home() {
  const loveMessages =
    (content as { loveMessages?: string[] }).loveMessages ?? []
  const randomMessage = useMemo(() => {
    if (!loveMessages.length) return null
    const randomIndex = Math.floor(Math.random() * loveMessages.length)
    return loveMessages[randomIndex]
  }, [loveMessages])
  const [showLoveMessage, setShowLoveMessage] = useState(() => loveMessages.length > 0)

  return (
    <div>
      <LoveMessageModal
        open={showLoveMessage && !!randomMessage}
        message={randomMessage}
        onClose={() => setShowLoveMessage(false)}
      />
      <WelcomeHero />
      <LoveCounter />
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Momentos especiales</h2>
        <div className="grid gap-4">
          {content.videos.map((v) => <VideoPlayer key={v.id} video={v} />)}
        </div>
      </section>
      <PhotoGrid />
      <PhotoCarousel />
    </div>
  )
}
