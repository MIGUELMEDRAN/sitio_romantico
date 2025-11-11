import { useEffect, useState } from 'react'
import { DateService, type TimeDiff } from '@/services/date.service'

const ds = new DateService()

export default function LoveCounter() {
  const [diff, setDiff] = useState<TimeDiff>(ds.diffSinceAnniversary())

  useEffect(() => {
    const id = setInterval(() => setDiff(ds.diffSinceAnniversary()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
        {(['years','months','days','hours','minutes','seconds'] as const).map((k) => (
          <div key={k} className="rounded-2xl bg-white shadow p-4">
            <div className="text-3xl font-bold">{(diff as any)[k]}</div>
            <div className="text-xs uppercase tracking-wide text-rose-700">{k}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
