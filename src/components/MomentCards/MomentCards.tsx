import React from 'react'

type Moment = {
  id: number
  titulo: string
  texto: string
  img?: string

}

const placeholder = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='24'>Sin imagen</text></svg>`

const momentos: Moment[] = [
  { id: 1, titulo: 'Donde empieza el amor verdddadero', texto: 'No somos perfectos, pero juntos somos magia. Cada mirada tuya es mi hogar.', img: '/media/foto1.jpg' },
  { id: 2, titulo: 'Entre risas y silencios', texto: 'Tu abrazo tiene el poder de calmar tormentas y encender estrellas en mi cielo.', img: '/media/foto2.jpg' },
  { id: 3, titulo: 'Nuestro amor, sin filtros', texto: 'No hay pose mas perfecta que la de ser nosotros, reales, felices y juntos.', img: '/media/foto3.jpg' }
]


export default function MomentCards(): JSX.Element {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">Nuestros Momentos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {momentos.map((m) => (
          <article
            key={m.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            aria-labelledby={`titulo-${m.id}`}
          >
            <div className="w-full h-48 bg-gray-200">
              <img
                src={m.img || placeholder}
                alt={m.titulo}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="p-5">
              <h3 id={`titulo-${m.id}`} className="text-lg font-bold text-gray-800 mb-2">
                {m.titulo}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{m.texto}</p>

              <div className="flex gap-3">
                <button
                  type="button"
                  aria-label="Me encanta"
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-lg shadow-sm transition-colors text-sm"
                >
                  💖
                </button>

                <button
                  type="button"
                  aria-label="Rosas"
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-3 rounded-lg shadow-sm transition-colors text-sm"
                >
                  🌹
                </button>

                <button
                  type="button"
                  aria-label="Mariposas"
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-sm transition-colors text-sm"
                >
                  🦋
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
