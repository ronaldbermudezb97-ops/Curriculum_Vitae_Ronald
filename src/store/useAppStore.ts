import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // Tema
  isDark: boolean
  toggleTheme: () => void

  // Navegación
  activeSection: string
  setActiveSection: (section: string) => void

  // Idioma
  locale: 'es' | 'en'
  setLocale: (locale: 'es' | 'en') => void

  // Menú móvil
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
      activeSection: '#inicio',
      setActiveSection: (activeSection) => set({ activeSection }),
      locale: 'es',
      setLocale: (locale) => set({ locale }),
      isMenuOpen: false,
      toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
    }),
    {
      name: 'portfolio-store',
      partialize: (s) => ({ isDark: s.isDark, locale: s.locale })
    }
  )
)