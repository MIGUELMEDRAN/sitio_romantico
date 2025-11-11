import { describe, it, expect } from 'vitest'
import { DateService } from './date.service'

describe('DateService', () => {
  const ds = new DateService()
  it('parses strict DMY', () => {
    expect(ds.parseStrictDMY('08/03/2023')?.toISOString()).toContain('2023-03-08')
    expect(ds.parseStrictDMY('31/02/2023')).toBeNull()
  })
  it('validates anniversary', () => {
    expect(ds.isCorrectAnniversary('08/03/2023')).toBe(true)
    expect(ds.isCorrectAnniversary('09/03/2023')).toBe(false)
  })
})
