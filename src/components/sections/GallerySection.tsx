import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/utils/gsapConfig'
import { skillCards } from '@/data/skills'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

export function GallerySection() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const indicatorRef  = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    // 1. Pin el indicador lateral mientras dura la sección completa
    ScrollTrigger.create({
      trigger:    sectionRef.current,
      start:      'top 80px',       // justo debajo del navbar fijo
      end:        'bottom bottom',
      pin:        indicatorRef.current,
      pinSpacing: false,
    })

    // 2. Por cada card: detectar cuándo está centrada en viewport
    skillCards.forEach((_, i) => {
      ScrollTrigger.create({
        trigger:    `.skill-card-${i}`,
        start:      'top center',
        end:        'bottom center',
        onEnter:     () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      })
    })
  }, { scope: sectionRef })

  const scrollToCard = (index: number) => {
    const card = document.querySelector(`.skill-card-${index}`)
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section id="habilidades" ref={sectionRef} className="py-20 bg-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
          Habilidades
        </h2>

        {/* Layout: indicator lateral + grid de cards */}
        <div className="flex gap-8">

          {/* ── Lateral Pin Indicator (solo desktop) ── */}
          <div
            ref={indicatorRef}
            className="hidden lg:flex flex-col gap-3 self-start pt-2"
            style={{ minWidth: '12px' }}
          >
            {skillCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => scrollToCard(i)}
                aria-label={`Ir a ${card.title}`}
                title={card.title}
                className="transition-all duration-300 rounded-full focus:outline-none"
                style={{
                  width:           activeIndex === i ? '12px' : '8px',
                  height:          activeIndex === i ? '12px' : '8px',
                  backgroundColor: activeIndex === i ? card.accentColor : '#64748B',
                  opacity:         activeIndex === i ? 1 : 0.4,
                  transform:       activeIndex === i ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          {/* ── Grid de cards ── */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCards.map((skillCard, index) => (
              <div
                key={skillCard.id}
                className={cn(
                  `skill-card-${index}`,
                  'bg-card rounded-xl p-6 border-l-4 transition-all duration-300',
                  'hover:shadow-lg hover:scale-[1.02]',
                )}
                style={{ borderLeftColor: skillCard.accentColor }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${skillCard.accentColor}20` }}
                  >
                    {skillCard.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold font-montserrat"
                    style={{ color: skillCard.accentColor }}
                  >
                    {skillCard.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {skillCard.items.map((item) => (
                    <div key={item.category} className="space-y-1.5">
                      <h4 className="text-xs font-medium text-secondary uppercase tracking-wider">
                        {item.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}