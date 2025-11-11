export class StorageService {
  constructor(private readonly scope = 'romantic_site') {}

  private key(k: string) { return `${this.scope}:${k}` }

  getSession<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(this.key(key))
      return raw ? (JSON.parse(raw) as T) : null
    } catch { return null }
  }

  setSession<T>(key: string, value: T) {
    try { sessionStorage.setItem(this.key(key), JSON.stringify(value)) } catch {}
  }

  getLocal<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(this.key(key))
      return raw ? (JSON.parse(raw) as T) : null
    } catch { return null }
  }

  setLocal<T>(key: string, value: T) {
    try { localStorage.setItem(this.key(key), JSON.stringify(value)) } catch {}
  }
}
