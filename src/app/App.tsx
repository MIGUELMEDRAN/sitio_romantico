import { useState } from 'react'
import DateGate from '@/components/DateGate/DateGate'
import Home from '@/pages/Home'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  return unlocked ? <Home /> : <DateGate onUnlock={() => setUnlocked(true)} />
}
