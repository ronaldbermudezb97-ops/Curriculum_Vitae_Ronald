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
    const section = sectionRef.current
    if (!section) return

    const cards = gsap.utils.toArray<HTMLElement>('.skill-card-stack')
    if (cards.length === 0) return

    // 1. Preparamos los estilos iniciales: 
    // Solo la primera carta es visible al inicio, las demás ocultas y escaladas
    gsap.set(cards, { autoAlpha: 0, scale: 0.9, y: 50, rotateX: -10 })
    gsap.set(cards[0], { autoAlpha: 1, scale: 1, y: 0, rotateX: 0 })

    // 2. Creamos el Timeline con ScrollTrigger
    // Distancia de scroll total: número de cartas * 600px para suavizar el efecto
    const scrollDistance = cards.length * 600

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
          // Calculamos el índice activo basado en el progreso
          const index = Math.min(
            Math.floor(self.progress * cards.length),
            cards.length - 1
          )
          if (index !== activeIndex) {
            setActiveIndex(index)
          }
        }
      }
    })

    // 3. Animaciones de apilado (Stack Effect)
    cards.forEach((card, i) => {
      if (i > 0) {
        // Transición: sale la carta anterior y entra la actual
        tl.to(cards[i - 1], { 
          autoAlpha: 0, 
          scale: 0.8, 
          y: -100, 
          rotateX: 10,
          duration: 1 
        }, i) // 'i' como posición relativa en el timeline
        
        tl.to(card, { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1 
        }, i)
      } else {
        // Delay inicial para el primer card
        tl.to({}, { duration: 0.2 })
      }
    })

    // Añadimos un pequeño espacio al final para que la última carta repose
    tl.to({}, { duration: 0.5 })

    // 4. Animación de ENTRADA de la sección (se repite cada vez que entra)
    gsap.fromTo([".skills-header", ".skills-content"], 
      { autoAlpha: 0, y: 30 },
      { 
        autoAlpha: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // Empieza un poco antes de llegar arriba
          toggleActions: 'play none none reverse', // Revierte al salir para que se repita al volver
        }
      }
    )

  }, { scope: sectionRef })


  /**
   * Navega de forma vertical a la posición del scroll de una habilidad específica
   */
  const scrollToCard = (index: number) => {
    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.getAll().find(t => t.vars.trigger === section)
    if (st) {
      const start = st.start
      const end = st.end
      const distance = end - start
      
      // Calculamos la posición exacta dentro del rango de scroll de la sección
      const targetScroll = start + (distance / skillCards.length * index) + 10 // +10px de offset para activar el trigger
      
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 0.8,
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
      <div className="container mx-auto px-4 lg:px-12 py-24 h-full flex flex-col justify-center relative z-10">
        
        {/* Header de la Sección */}
        <div className="skills-header flex flex-col items-center mb-16 lg:mb-24 shrink-0">

          <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-primary tracking-tighter">
            Habilidades <span className="text-secondary opacity-20">/ Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary/20 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              style={{ width: `${((activeIndex + 1) / skillCards.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="skills-content flex flex-row gap-8 md:gap-20 relative items-center w-full max-w-7xl mx-auto h-[700px] md:h-[600px]">

          
          {/* ── Lateral Pin Indicator ── */}
          <div className="hidden md:flex flex-col gap-8 self-center z-20 w-[60px] relative items-center">
            {/* Raíl Vertical */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border/50 to-transparent" />
            
            {skillCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => scrollToCard(i)}
                className="group relative flex items-center justify-center focus:outline-none"
              >
                {/* Punto Visual */}
                <div 
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-500 relative z-10",
                    activeIndex === i ? "scale-[1.8] ring-4 ring-offset-4 ring-offset-bg shadow-xl" : "scale-100 opacity-30 hover:opacity-100"
                  )}
                  style={{ 
                    backgroundColor: activeIndex === i ? card.accentColor : 'currentColor',
                    // @ts-ignore
                    '--tw-ring-color': `${card.accentColor}40`
                  }}
                />
                
                {/* Etiqueta Flotante */}
                <span 
                  className={cn(
                    "absolute left-full ml-6 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-500",
                    activeIndex === i 
                      ? "opacity-100 translate-x-0 bg-card/80 backdrop-blur-md border-border" 
                      : "opacity-0 -translate-x-4 pointer-events-none border-transparent shadow-none"
                  )}
                  style={{ color: card.accentColor }}
                >
                  {card.title}
                </span>
              </button>
            ))}
          </div>

          {/* ── Mobile Indicator (Dots Verticales Simplificados) ── */}
          <div className="flex md:hidden flex-col gap-3 self-center z-10 w-[8px]">
             {skillCards.map((_, i) => (
              <button
                key={`dot-m-${i}`}
                onClick={() => scrollToCard(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  activeIndex === i ? "h-8 bg-primary shadow-lg shadow-primary/50" : "bg-border opacity-50"
                )}
              />
            ))}
          </div>

          {/* ── Card Stack View ── */}
          <div className="flex-1 relative w-full h-full perspective-2000" ref={containerRef}>
            {!mounted ? (
              <div className="absolute inset-0 bg-card/5 animate-pulse rounded-3xl" />
            ) : (
              skillCards.map((skillCard, index) => (
                <div
                  key={skillCard.id}
                  className={cn(
                    'skill-card-stack absolute inset-0',
                    'bg-card/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 border border-white/5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col',
                    'overflow-hidden'
                    // NO usamos clases de opacidad aquí para que GSAP maneje autoAlpha sin interferencias
                  )}
                >
                  {/* Glassmorphism Background Decoration */}
                  <div 
                    className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] blur-[150px] rounded-full opacity-30 pointer-events-none"
                    style={{ backgroundColor: skillCard.accentColor }}
                  />
                  
                  <div className="relative z-10 flex flex-col lg:flex-row gap-12 h-full items-center lg:items-center">
                    
                    {/* LEFT COLUMN: Icon & Large Title */}
                    <div className="flex flex-col items-center lg:items-start lg:w-[40%] flex-shrink-0 text-center lg:text-left gap-8">
                       <div
                        className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl relative group overflow-hidden"
                        style={{ 
                          backgroundColor: `${skillCard.accentColor}15`, 
                          color: skillCard.accentColor,
                          boxShadow: `0 25px 50px ${skillCard.accentColor}25`,
                          border: `1px solid ${skillCard.accentColor}35`
                        }}
                      >
                         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                         {skillCard.icon}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                          <span 
                            className="text-[0.65rem] font-black uppercase tracking-[0.4em] opacity-40 px-3 py-1 rounded-full border border-white/10"
                            style={{ color: skillCard.accentColor }}
                          >
                            Categoría {index + 1}
                          </span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-bold font-montserrat tracking-tight leading-[0.9] text-white">
                          {skillCard.title.split(' & ').map((part, i) => (
                            <span key={i} className="block last:opacity-60">{part}</span>
                          ))}
                        </h3>
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="hidden lg:block w-[1px] h-[70%] bg-gradient-to-b from-transparent via-border/40 to-transparent" />
                    <div className="lg:hidden w-full h-px bg-border/20" />

                    {/* RIGHT COLUMN: Interactive Skills Grid */}
                    <div className="flex-1 w-full flex flex-col gap-12 overflow-y-auto pr-6 custom-scrollbar h-full justify-center">
                      {skillCard.items.map((item) => (
                        <div key={item.category} className="space-y-6">
                          <div className="flex items-center gap-5">
                            <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em] whitespace-nowrap">
                               {item.category}
                            </h4>
                            <div className="h-px flex-1 bg-border/10" />
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            {item.skills.map((skill) => (
                              <Badge 
                                key={skill} 
                                className="group/badge font-mono text-[10px] md:text-xs bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all duration-400 border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl"
                              >
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

      {/* Background Decorative Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[200px]" />
      </div>
    </section>
  )
}