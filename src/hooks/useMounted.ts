import { useState, useEffect } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Add a small delay to simulate loading or ensure CSS/fonts are ready before removing skeletons
    const timer = setTimeout(() => {
      setMounted(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return mounted
}
