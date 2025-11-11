import React from 'react'
import MomentCard from '@/components/MomentCard/MomentCard'

interface Moment {
  id: number
  title: string
  description: string
  img?: string
}

interface MomentsGridProps {
  moments?: Moment[]
}

const defaultMoments: Moment[] = [
  {
    id: 1,
    title: 'Donde empieza el amor verdadero',
    description: 'No somos perfectos, pero juntos somos magia. Cada mirada tuya es mi hogar.',
    img: '/media/photos/PHOTO_1.jpg'
  },
  {
    id: 2,
    title: 'Entre risas y silencios',
    description: 'Otro instante inolvidable.',
    img: '/media/photos/PHOTO_2.jpg'
  },
  {
    id: 3,
    title: 'Nuestro amor, sin filtros',
    description: 'No hay pose más perfecta que la de ser nosotros, reales, felices y juntos.',
    img: '/media/photos/PHOTO_3.jpg'
  }
]

export default function MomentsGrid({ moments = defaultMoments }: MomentsGridProps) {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* Título */}
      <h2 className="text-4xl font-bold mb-12 text-center text-rose-900">
        Nuestros Momentos
      </h2>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {moments.map((moment, index) => (
          <MomentCard
            key={moment.id}
            id={moment.id}
            title={moment.title}
            description={moment.description}
            img={moment.img}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
