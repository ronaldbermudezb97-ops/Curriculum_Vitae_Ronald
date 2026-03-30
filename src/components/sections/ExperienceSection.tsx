import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { experienceNodes } from '@/data/experience'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'
import { useTranslation } from 'react-i18next'
import { useMounted } from '@/hooks/useMounted'
import { SkeletonCard, SkeletonCircle } from '@/components/ui/Skeleton'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGLineElement>(null)
  const { t } = useTranslation()
  const mounted = useMounted()

  useGSAP(() => {
    if (!mounted) return

    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    // 1. Animar la línea vertical principal (Efecto dibujo)
    // Usamos pathLength="100" para que el offset vaya de 100 a 0.
    gsap.set(path, { strokeDasharray: 100, strokeDashoffset: 100 })

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 20%', // Inicia un poco después de entrar al viewport
        end: 'bottom 80%', // Termina antes del final
        scrub: 1, // Suaviza la animación siguiendo el scroll
      },
    })

    // 2. Animar los puntos (Dots)
    const dots = gsap.utils.toArray<HTMLElement>('.experience-dot')
    dots.forEach((dot) => {
      gsap.fromTo(dot, 
        { scale: 0, opacity: 0, filter: 'blur(10px)' },
        { 
          scale: 1, 
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%', // Aparece un poco antes de llegar al centro
            toggleActions: 'play none none reverse',
          }
        }
      )
    })

    // 3. Animar las tarjetas (nodos)
    const nodes = gsap.utils.toArray<HTMLElement>('.experience-node-content')
    nodes.forEach((node, i) => {
      const isLeft = node.closest('.experience-node')?.classList.contains('flex-row-reverse')
      
      gsap.fromTo(
        node,
        { 
          opacity: 0, 
          x: isLeft ? 100 : -100, // Desliza desde fuera hacia adentro
          rotateY: isLeft ? -15 : 15,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef, dependencies: [mounted] })

  return (
    <section ref={sectionRef} id="experiencia" className="py-24 bg-card relative">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-montserrat font-bold text-center mb-24 text-primary">
          {t('section.experience')}
        </h2>
        
        <div className="relative max-w-4xl mx-auto pb-10">
          
          {/* SVG Timeline Line */}
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 w-[8px] h-full top-0 bottom-0 pointer-events-none z-0"
            preserveAspectRatio="none"
          >
            {/* Línea de fondo (guía) */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              className="stroke-border/10"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Línea animada de primer plano */}
            <line
              ref={pathRef as any}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              className="stroke-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="100"
            />
          </svg>

          {/* Timeline Nodes */}
          {!mounted ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`exp-skeleton-${index}`}
                className={cn(
                  'experience-node flex items-center mb-16 relative z-10',
                  index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <div className={cn('w-1/2', index % 2 !== 0 ? 'pl-8' : 'pr-8')}>
                  <SkeletonCard className="h-48 w-full" />
                </div>
                {/* Timeline Dot Central Skeleton */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <SkeletonCircle size="w-6 h-6 border-[5px] border-card z-20" />
                </div>
              </div>
            ))
          ) : (
          experienceNodes.map((node, index) => {
            const i18nKey = `experience.${index + 1}`
            return (
              <div
                key={index}
                className={cn(
                  'experience-node flex items-center mb-16 relative z-10',
                  node.side === 'left' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <div className={cn('w-1/2', node.side === 'left' ? 'pl-8' : 'pr-8 text-right')}>
                  <div className="experience-node-content bg-bg p-8 rounded-2xl shadow-lg border border-border/40 transition-all duration-500 hover:border-primary/40 group overflow-hidden relative">
                    {/* Sutil brillo al fondo */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />
                    
                    <div className="text-sm font-semibold text-primary mb-2 py-1 px-3 bg-primary/10 rounded-full inline-block">
                      {t(`${i18nKey}.year`)}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-1 text-primary">{t(`${i18nKey}.role`)}</h3>
                    
                    <div className="text-secondary mb-4 font-medium flex items-center gap-2 justify-start" style={{ justifyContent: node.side === 'left' ? 'flex-start' : 'flex-end' }}>
                      <span>{t(`${i18nKey}.company`)}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                      <span>{t(`${i18nKey}.location`)}</span>
                    </div>
                    
                    <p className="text-secondary/80 mb-6 leading-relaxed">
                      {t(`${i18nKey}.desc`)}
                    </p>
                  
                  <div className={cn('flex flex-wrap gap-2', node.side === 'left' ? 'justify-start' : 'justify-end')}>
                    {node.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-card border-border/50 shadow-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Dot Central */}
              <div className="experience-dot absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-card rounded-full border-[5px] border-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20" />
            </div>
          )}))}
        </div>
      </div>
    </section>
  )
}
