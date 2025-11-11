const ANNIVERSARY_ISO = '2023-03-08T00:00:00'

export type TimeDiff = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export class DateService {
  constructor(private readonly anniversaryISO = ANNIVERSARY_ISO) {}

  // Strict DD/MM/YYYY parsing; returns Date in local time at 00:00
  parseStrictDMY(input: string): Date | null {
    const m = input.trim().match(/^([0-3]\d)\/(0\d|1[0-2])\/(\d{4})$/)
    if (!m) return null
    const [_, dd, mm, yyyy] = m
    const d = Number(dd), mth = Number(mm), y = Number(yyyy)
    const date = new Date(y, mth - 1, d, 0, 0, 0, 0)
    if (date.getFullYear() !== y || date.getMonth() !== mth - 1 || date.getDate() !== d) {
      return null
    }
    return date
  }

  // compare against March 8, 2023 local date
  isCorrectAnniversary(input: string): boolean {
    const parsed = this.parseStrictDMY(input)
    if (!parsed) return false
    const target = new Date(2023, 2, 8, 0, 0, 0, 0) // months 0-based
    return parsed.getTime() === target.getTime()
  }

  // live diff since anniversary
  diffSinceAnniversary(now = new Date()): TimeDiff {
    const start = new Date(this.anniversaryISO)
    // Convert to local midnight of start
    const localStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0, 0)

    // Years
    let years = now.getFullYear() - localStart.getFullYear()
    const annivThisYear = new Date(localStart)
    annivThisYear.setFullYear(localStart.getFullYear() + years)
    if (now < annivThisYear) years--

    // Months
    let months = now.getMonth() - localStart.getMonth() + years * 12
    if (now.getDate() < localStart.getDate()) months--

    const monthsOnly = months % 12
    // Compute remaining days/h/m/s
    const lastMonthAnniv = new Date(localStart)
    lastMonthAnniv.setFullYear(localStart.getFullYear() + years)
    lastMonthAnniv.setMonth(localStart.getMonth() + monthsOnly)

    let diffMs = now.getTime() - lastMonthAnniv.getTime()
    const sec = Math.floor(diffMs / 1000); diffMs -= sec * 1000
    const min = Math.floor(sec / 60); const seconds = sec % 60
    const hr = Math.floor(min / 60); const minutes = min % 60
    const days = Math.floor(hr / 24); const hours = hr % 24

    return { years, months: monthsOnly, days, hours, minutes, seconds }
  }
}
