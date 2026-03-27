import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Button } from '@/components/ui/Button'
import { LocaleToggle } from '@/components/ui/LocaleToggle'
import { gsap, ScrollToPlugin } from '@/utils/gsapConfig'
import { useMounted } from '@/hooks/useMounted'
import { SkeletonText } from '@/components/ui/Skeleton'

// ScrollToPlugin ya registrado en gsapConfig — referencia para evitar tree-shaking
void ScrollToPlugin

const navItems = [
  { href: '#inicio',      label: 'Inicio' },
  { href: '#proyectos',   label: 'Proyectos' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#referencias', label: 'Referencias' },
  { href: '#contacto',    label: 'Contacto' },
]

export function Navbar() {
  const { isMenuOpen, toggleMenu, activeSection } = useAppStore()
  const mounted = useMounted()

  useScrollSpy()

  const handleNavClick = (href: string) => {
    // GSAP ScrollToPlugin: desplazamiento suave con curva power3.inOut
    gsap.to(window, {
      duration: 1.2,
      scrollTo: href,
      ease: 'power3.inOut',
      overwrite: 'auto', // cancela scroll anterior si se hace clic rápido
    })
    if (isMenuOpen) toggleMenu()
  }

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-bg font-bold text-sm">RP</span>
            </div>
            <span className="font-montserrat font-bold text-primary">Ronald Preciado</span>
          </div>

          {/* Desktop Navigation */}
          {!mounted ? (
            <div className="hidden md:flex items-center gap-8">
              <SkeletonText width="w-16" height="h-4" />
              <SkeletonText width="w-16" height="h-4" />
              <SkeletonText width="w-16" height="h-4" />
              <SkeletonText width="w-16" height="h-4" />
              <SkeletonText width="w-16" height="h-4" />
            </div>
          ) : (
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.href ? 'text-white font-semibold' : 'text-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LocaleToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-card ${
                      activeSection === item.href ? 'bg-card text-white font-semibold' : 'text-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}