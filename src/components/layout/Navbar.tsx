import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Button } from '@/components/ui/Button'
import { LocaleToggle } from '@/components/ui/LocaleToggle'
import { cn } from '@/utils/cn'
import { gsap, ScrollToPlugin } from '@/utils/gsapConfig'
import { useMounted } from '@/hooks/useMounted'
import { SkeletonText } from '@/components/ui/Skeleton'

// ScrollToPlugin ya registrado en gsapConfig — referencia para evitar tree-shaking
void ScrollToPlugin

export function Navbar() {
  const { t } = useTranslation()
  const { isMenuOpen, toggleMenu, activeSection, theme, toggleTheme, locale } = useAppStore()
  const mounted = useMounted()

  useScrollSpy()

  const navItems = [
    { href: '#inicio',      label: t('nav.home') },
    { href: '#proyectos',   label: t('nav.projects') },
    { href: '#habilidades', label: t('nav.skills') },
    { href: '#experiencia', label: t('nav.experience') },
    { href: '#referencias', label: t('nav.references') },
    { href: '#contacto',    label: t('nav.contact') },
  ]

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
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-bg font-bold text-sm">JC</span>
            </div>
            <span className="font-montserrat font-bold text-primary">Josué Caballero</span>
          </div>

          {/* Desktop Navigation */}
          {!mounted ? (
            <div className="hidden md:flex items-center gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonText key={i} width="w-16" height="h-4" />
              ))}
            </div>
          ) : (
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-primary relative group py-2',
                  activeSection === item.href 
                    ? 'text-primary font-bold' 
                    : 'text-secondary'
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                  activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </button>
            ))}
          </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-card transition-all active:scale-90"
              aria-label="Cambiar tema"
            >
              {!mounted ? (
                <div className="w-5 h-5 animate-pulse bg-secondary/20 rounded-full" />
              ) : theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
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
              <div className="py-4 space-y-2 border-t border-border/10">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all',
                      activeSection === item.href 
                        ? 'bg-primary/10 text-primary font-bold shadow-inner' 
                        : 'text-secondary hover:bg-card/50'
                    )}
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