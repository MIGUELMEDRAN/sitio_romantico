import WelcomeHero from '@/components/WelcomeHero/WelcomeHero'
import PhotoGrid from '@/components/PhotoGrid/PhotoGrid'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import LoveCounter from '@/components/LoveCounter/LoveCounter'
import SurpriseButton from '@/components/SurpriseButton/SurpriseButton'
import content from '@/config/content.json'

export default function Home() {
  return (
    <div>
      <WelcomeHero />
      <LoveCounter />
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Momentos especiales</h2>
        <div className="grid gap-4">
          {content.videos.map((v) => <VideoPlayer key={v.id} video={v} />)}
        </div>
      </section>
      <PhotoGrid />

      <section id="sorpresas" className="container mx-auto px-6 py-16 flex gap-4">
        <SurpriseButton effect="butterflies" label="Mariposas" />
        <SurpriseButton effect="roses" label="Rosas" />
      </section>
    </div>
  )
}
