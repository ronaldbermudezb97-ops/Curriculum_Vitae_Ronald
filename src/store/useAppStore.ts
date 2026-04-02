import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // Navegación
  activeSection: string
  setActiveSection: (section: string) => void

  // Idioma
  locale: 'es' | 'en'
  setLocale: (locale: 'es' | 'en') => void

  // Tema (Oscuro / Claro)
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // Menú móvil
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeSection: '#inicio',
      setActiveSection: (activeSection) => set({ activeSection }),
      locale: 'es',
      setLocale: (locale) => set({ locale }),
      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      isMenuOpen: false,
      toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
    }),
    {
      name: 'portfolio-store',
      partialize: (s) => ({ locale: s.locale, theme: s.theme })
    }
  )
)