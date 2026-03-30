import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, ScrollToPlugin } from '@/utils/gsapConfig'
import { skillCards } from '@/data/skills'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'
import { useMounted } from '@/hooks/useMounted'

export function GallerySection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const mounted = useMounted()

  useGSAP(() => {
    // 1. IMPORTANTE: Esperar a que el componente esté 'mounted' para que React haya renderizado las tarjetas en el DOM
    if (!mounted || !sectionRef.current) return

    const section = sectionRef.current
    const cards = gsap.utils.toArray<HTMLElement>('.skill-card-stack')
    
    // Si no hay tarjetas, no iniciamos ScrollTrigger
    if (cards.length === 0) return

    // 2. Preparar estados iniciales
    gsap.set(cards, { autoAlpha: 0, scale: 0.9, y: 50, rotateX: -10 })
    gsap.set(cards[0], { autoAlpha: 1, scale: 1, y: 0, rotateX: 0 })

    // 3. Timeline principal con Pinning
    const scrollDistance = cards.length * 700 // Aumentamos un poco la distancia para mejor control

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * (cards.length)),
            cards.length - 1
          )
          if (index !== activeIndex) {
            setActiveIndex(index)
          }
        }
      }
    })

    // 4. Animaciones de la pila de cartas
    cards.forEach((card, i) => {
      if (i > 0) {
        // La anterior se retira
        tl.to(cards[i - 1], { 
          autoAlpha: 0, 
          scale: 0.8, 
          y: -120, 
          rotateX: 15,
          duration: 1 
        }, i)
        
        // La actual entra
        tl.to(card, { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1 
        }, i)
      }
    })

    // Añadir un pequeño margen al final
    tl.to({}, { duration: 0.5 })

    // 5. Revelado inicial (Entrance) que se repite al volver a la sección
    gsap.fromTo([".skills-header", ".skills-content"], 
      { autoAlpha: 0, y: 40 },
      { 
        autoAlpha: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // 6. REFRESH CRITICAL: Forzar el refresco de ScrollTrigger una vez todo está calculado
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

  }, [mounted]) // Re-ejecutar cuando mounted sea true

  /**
   * Navegación por puntos laterales
   */
  const scrollToCard = (index: number) => {
    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.getAll().find(t => t.vars.trigger === section)
    if (st) {
      const start = st.start
      const end = st.end
      const distance = end - start
      
      const targetScroll = start + (distance / skillCards.length * index) + 20
      
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1,
        ease: 'power3.inOut'
      })
    }
  }

  return (
    <section 
      id="habilidades" 
      ref={sectionRef} 
      className="min-h-screen w-full flex items-center bg-bg relative border-t border-border/10 overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-12 py-12 md:py-16 h-full flex flex-col justify-center relative z-10">
        
        {/* Header (Animado por GSAP) */}
        <div className="skills-header flex flex-col items-center mb-8 md:mb-12 shrink-0 opacity-0 invisible">
          <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-primary tracking-tighter">
            Habilidades
          </h2>
          <div className="w-24 h-1 bg-primary/20 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              style={{ width: `${((activeIndex + 1) / skillCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content (Animado por GSAP) */}
        <div className="skills-content flex flex-row gap-8 md:gap-20 relative items-center w-full max-w-7xl mx-auto h-[550px] md:h-[480px] opacity-0 invisible">
          
          {/* Indicators */}
          <div className="hidden md:flex flex-col gap-6 self-center z-20 w-[60px] relative items-center">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border/50 to-transparent" />
            {skillCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => scrollToCard(i)}
                className="group relative flex items-center justify-center focus:outline-none"
              >
                <div 
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-500 relative z-10",
                    activeIndex === i ? "scale-[1.8] ring-4 ring-offset-4 shadow-xl" : "scale-100 opacity-30"
                  )}
                  style={{ 
                    backgroundColor: activeIndex === i ? card.accentColor : 'currentColor',
                    // @ts-ignore
                    '--tw-ring-color': `${card.accentColor}40`
                  }}
                />
              </button>
            ))}
          </div>

          {/* Cards Stack */}
          <div className="flex-1 relative w-full h-full perspective-2000">
            {/* Solo renderizamos si estamos montados para asegurar que GSAP encuentre los elementos */}
            {!mounted ? (
              <div className="absolute inset-0 bg-card/10 animate-pulse rounded-[2.5rem]" />
            ) : (
              skillCards.map((skillCard, index) => (
                <div
                  key={skillCard.id}
                  className={cn(
                    'skill-card-stack absolute inset-0',
                    'bg-card/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 border-2 border-white/20 shadow-2xl flex flex-col overflow-hidden',
                    'hover:border-white/60 transition-colors duration-500',
                    activeIndex === index && 'animate-border-glow'
                  )}
                >
                  <div 
                    className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] blur-[150px] rounded-full opacity-30 pointer-events-none"
                    style={{ backgroundColor: skillCard.accentColor }}
                  />
                  
                  <div className="relative z-10 flex flex-col lg:flex-row gap-8 h-full items-center lg:items-center">
                    <div className="flex flex-col items-center lg:items-start lg:w-[40%] flex-shrink-0 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-4xl md:text-6xl font-bold font-montserrat tracking-tight leading-[0.9] text-white">
                          {skillCard.title.split(' & ').map((part, i) => (
                            <span key={i} className="block last:opacity-60">{part}</span>
                          ))}
                        </h3>
                      </div>
                    </div>

                    <div className="hidden lg:block w-px h-[70%] bg-gradient-to-b from-transparent via-border/40 to-transparent" />

                    <div className="flex-1 w-full flex flex-col gap-6 overflow-y-auto pr-6 custom-scrollbar h-full justify-center">
                      {skillCard.items.map((item) => (
                        <div key={item.category} className="space-y-4">
                          <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em]">{item.category}</h4>
                          <div className="flex flex-wrap gap-3">
                            {item.skills.map((skill) => (
                              <Badge key={skill} className="bg-white/5 hover:bg-white/20 text-white/50 border-white/10 px-4 py-2 rounded-2xl">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      </div>
    </section>
  )
}