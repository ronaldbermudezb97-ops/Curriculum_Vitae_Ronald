import { useRef, useState } from 'react'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useTranslation } from 'react-i18next'
import { useMounted } from '@/hooks/useMounted'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { useAppStore } from '@/store/useAppStore'

export function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useTranslation()
  const { locale } = useAppStore()
  const mounted = useMounted()

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    
    // Evitamos el skeleton al acceder a children, asumimos que mounted ya ocultó el skeleton
    // Si todavía muestra skeleton esto no es un problema grande porque disableamos controles
    if (!mounted) return

    const targetChild = container.children[index] as HTMLElement
    if (targetChild) {
      // Scroll manually estimating padding (container px-4 md:px-8 adds some offsetLeft compared to pure flex)
      // `targetChild.offsetLeft` is relative to closest positioned parent. 
      // If none, it's relative to document. So we subtract container's offsetLeft.
      const offset = targetChild.offsetLeft - container.offsetLeft - 16 // 16px to leave a nice gap
      container.scrollTo({
        left: Math.max(0, offset),
        behavior: 'smooth'
      })
      setActiveIndex(index)
    }
  }

  const scrollLeft = () => scrollToIndex(Math.max(0, activeIndex - 1))
  const scrollRight = () => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1))

  // Sincronizar activeIndex si el usuario arrastra/scrollea manualmente nativamente
  const handleScroll = () => {
    if (!scrollContainerRef.current || !mounted) return
    const container = scrollContainerRef.current
    const containerCenter = container.scrollLeft + container.clientWidth / 2

    let closestIndex = 0
    let minDistance = Infinity

    Array.from(container.children).forEach((child, index) => {
      const el = child as HTMLElement
      const childCenter = el.offsetLeft - container.offsetLeft + el.clientWidth / 2
      const distance = Math.abs(childCenter - containerCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex)
    }
  }

  return (
    <section id="proyectos" className="bg-card py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-4xl font-montserrat font-bold text-primary">
            {t('section.projects')}
          </h2>

          {/* Controles del Slider (Botones) */}
          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              disabled={activeIndex === 0}
              className="p-3 rounded-full bg-bg border border-border/50 text-secondary hover:text-primary hover:border-primary disabled:opacity-40 disabled:hover:text-secondary disabled:hover:border-border/50 transition-colors focus:outline-none"
              aria-label="Proyectos anteriores"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={activeIndex === projects.length - 1}
              className="p-3 rounded-full bg-bg border border-border/50 text-secondary hover:text-primary hover:border-primary disabled:opacity-40 disabled:hover:text-secondary disabled:hover:border-border/50 transition-colors focus:outline-none"
              aria-label="Siguientes proyectos"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenedor relativo para el slider manual */}
        <div className="relative">
          {/* Fila responsiva normal usando snap de CSS */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 md:gap-10 overflow-x-auto snap-x snap-mandatory pt-4 pb-12 custom-scrollbar w-full"
            style={{ 
              scrollbarWidth: 'none', // Ocultar barra scroll en firefox
              msOverflowStyle: 'none'
            }}
          >
            {!mounted ? (
              // Skeleton de 3 tarjetas
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} className="w-full sm:w-[50vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw] h-[450px] flex-shrink-0 snap-center" />
              ))
            ) : (
            projects.map((project, index) => {
              const i18nKey = `projects.${index + 1}`
              return (
                <div
                  key={project.title}
                  className={cn(
                    'snap-center flex-shrink-0 bg-bg rounded-xl overflow-hidden flex flex-col',
                    'border border-card shadow-sm',
                    'transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
                    // Responsive width idéntico al solicitado, sumado full en mobile:
                    'w-[90vw] sm:w-[50vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw]'
                  )}
                >
                  {/* Imagen */}
                  <div className="w-full h-48 md:h-56 overflow-hidden relative group">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Status badge */}
                    <div className="absolute top-3 right-3 bg-bg/80 backdrop-blur border border-card rounded-full px-2.5 py-1 z-10 transition-transform">
                      <span
                        className={cn(
                          'text-xs font-semibold flex items-center gap-1.5',
                          project.status === 'online'  && 'text-success',
                          project.status === 'down'    && 'text-error',
                          project.status === 'pending' && 'text-warning',
                        )}
                      >
                        <span className={cn('w-2 h-2 rounded-full shadow-sm',
                          project.status === 'online'  && 'bg-success shadow-success/50',
                          project.status === 'down'    && 'bg-error shadow-error/50',
                          project.status === 'pending' && 'bg-warning shadow-warning/50',
                        )} />
                        {project.status === 'online' ? t('projects.status.online') : project.status === 'down' ? t('projects.status.down') : t('projects.status.pending')}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 h-full bg-card/50">
                    <h3 className="text-xl md:text-2xl font-bold font-montserrat text-primary mb-3 line-clamp-1" title={t(`${i18nKey}.title`)}>
                      {t(`${i18nKey}.title`)}
                    </h3>

                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-6 line-clamp-3 md:line-clamp-4 flex-1">
                      {t(`${i18nKey}.desc`)}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs md:text-xs font-mono px-2.5 py-1">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="secondary" className="text-xs md:text-xs px-2.5 py-1">
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-shadow">
                          <Button size="md" className="w-full font-semibold">
                            {t('projects.demo')}
                          </Button>
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg transition-shadow">
                          <Button size="md" variant="secondary" className="w-full font-semibold">
                            {t('projects.repo')}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            }))}
          </div>

          {/* Puntos de Paginación */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {projects.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir al proyecto ${index + 1}`}
                className={cn(
                  'transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary',
                  activeIndex === index 
                    ? 'w-8 h-2.5 bg-primary opacity-100' 
                    : 'w-2.5 h-2.5 bg-secondary opacity-40 hover:opacity-70'
                )}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}