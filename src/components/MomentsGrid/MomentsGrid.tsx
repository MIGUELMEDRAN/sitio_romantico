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
    title: 'Descripción de la foto 1',
    description: 'Un momento especial capturado en el tiempo.',
    img: '/media/photos/PHOTO_1.jpg'
  },
  {
    id: 2,
    title: 'Descripción de la foto 2',
    description: 'Otro instante inolvidable.',
    img: '/media/photos/PHOTO_2.jpg'
  },
  {
    id: 3,
    title: 'Descripción de la foto 3',
    description: 'Nuestro tercer recuerdo.',
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
