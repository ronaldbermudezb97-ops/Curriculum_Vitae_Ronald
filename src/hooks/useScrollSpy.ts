import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

const NAV_IDS = ['#inicio', '#proyectos', '#habilidades', '#experiencia', '#referencias', '#contacto']

export function useScrollSpy() {
  const { setActiveSection } = useAppStore()

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = `#${entry.target.id}`
          if (entry.isIntersecting && NAV_IDS.includes(id)) {
            setActiveSection(id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [setActiveSection])
}