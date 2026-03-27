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
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    // Animar la línea vertical
    // Al usar pathLength="100" en el SVG, el stroke dashoffset va de 100 a 0.
    gsap.set(path, { strokeDasharray: 100, strokeDashoffset: 100 })

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    })

    // Animar las tarjetas (nodos) de experiencia 
    const nodes = gsap.utils.toArray<HTMLElement>('.experience-node')
    nodes.forEach((nodeElement) => {
      gsap.fromTo(
        nodeElement,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: nodeElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

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
            <line
              ref={pathRef as any}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              className="stroke-primary/50" // Color semitransparente que hereda variable CSS
              strokeWidth="3"
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
                  <div className="bg-bg p-8 rounded-2xl shadow-lg border border-border/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    
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
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-[5px] border-card shadow-md z-20" />
            </div>
          )}))}
        </div>
      </div>
    </section>
  )
}
