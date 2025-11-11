import { useId, useState } from 'react'
import { DateService } from '@/services/date.service'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type Props = { onUnlock: () => void }

const ds = new DateService()

export default function DateGate({ onUnlock }: Props) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputId = useId()

  const handleUnlock = () => {
    onUnlock()
  }

  const formatInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (ds.isCorrectAnniversary(value)) {
      handleUnlock()
    } else {
      setError(t('wrongDate'))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value)
    setValue(formatted)
    setError(null)

    if (formatted.length === 10 && ds.isCorrectAnniversary(formatted)) {
      handleUnlock()
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-6 bg-rose-50">
      <form
        onSubmit={submit}
        aria-labelledby={inputId}
        className="w-full max-w-md rounded-2xl bg-white/80 shadow p-6 space-y-4 border"
      >
        <h1 id={inputId} className="text-2xl font-semibold">
          {t('dateLabel')}
        </h1>
        <input
          type="text"
          inputMode="numeric"
          placeholder="DD/MM/AAAA"
          aria-invalid={!!error}
          aria-describedby={error ? inputId + '-err' : undefined}
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
          value={value}
          onChange={handleChange}
          pattern="^([0-3]\d)/(0\d|1[0-2])/(\d{4})$"
          required
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-rose-600 text-white py-3 font-medium hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black transition"
        >
          {t('unlock')}
        </button>
        <AnimatePresence>
          {error && (
            <motion.p
              id={inputId + '-err'}
              role="status"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-rose-700 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </main>
  )
}
