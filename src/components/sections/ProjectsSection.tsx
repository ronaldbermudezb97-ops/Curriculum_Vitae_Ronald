import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'


export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards   = cardsRef.current
    const section = sectionRef.current
    if (!cards || !section) return

    // Solo en desktop ≥768px — en mobile el overflow-x-auto actua como fallback
    if (!window.matchMedia('(min-width: 768px)').matches) return

    const totalScroll = cards.scrollWidth - window.innerWidth

    gsap.to(cards, {
      x:    -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger:             section,
        start:               'top top',
        end:                 () => `+=${totalScroll}`,
        pin:                 true,
        scrub:               1,
        invalidateOnRefresh: true,
      },
    })
    // useGSAP con scope hace cleanup automático al desmontar
  }, { scope: sectionRef })



  return (
    <section id="proyectos" ref={sectionRef} className="bg-card overflow-hidden">
      <div className="pt-20 px-8">
        <h2 className="text-4xl font-montserrat font-bold text-center mb-12 text-primary">
          Proyectos
        </h2>
      </div>

      {/* Contenedor de cards — sin overflow-x en desktop (GSAP lo maneja) */}
      <div
        ref={cardsRef}
        className="flex gap-8 pb-20 px-8 md:w-max"
        // En mobile: scroll manual como fallback
        style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={cn(
              'flex-shrink-0 w-[320px] bg-bg rounded-xl overflow-hidden',
              'border border-card shadow-sm',
              'transition-transform duration-300 hover:scale-[1.02]',
            )}
          >
            {/* Imagen */}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />

            {/* Contenido */}
            <div className="p-6 space-y-4">
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                <span
                  className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    project.status === 'online'  && 'bg-success/20 text-success',
                    project.status === 'down'    && 'bg-error/20 text-error',
                    project.status === 'pending' && 'bg-warning/20 text-warning',
                  )}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-secondary text-sm leading-relaxed">{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">Ver Demo</Button>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="secondary">Código</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}