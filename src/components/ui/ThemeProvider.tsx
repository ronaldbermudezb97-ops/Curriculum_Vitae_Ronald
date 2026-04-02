import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function ThemeProvider() {
  const { theme } = useAppStore()

  useEffect(() => {
    // Sincronizar el tema con la clase del documentElement (html)
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }, [theme])

  return null
}
