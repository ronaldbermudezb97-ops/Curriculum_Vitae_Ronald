import { useRef, useEffect } from 'react'
import { experienceNodes } from '@/data/experience'
import { Badge } from '@/components/ui/Badge'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Create timeline path
      const pathLength = path.getTotalLength()
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength })

      // Animate path on scroll
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

      // Animate nodes
      experienceNodes.forEach((node, index) => {
        const nodeElement = section.querySelector(`[data-node="${index}"]`)
        if (nodeElement) {
          gsap.fromTo(
            nodeElement,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: nodeElement,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }

    initGSAP()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="experiencia" className="py-20 bg-card relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
          Experiencia Profesional
        </h2>
        <div className="relative max-w-4xl mx-auto">
          {/* SVG Timeline */}
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d="M200,50 Q200,150 200,250 Q200,350 200,450 Q200,550 200,650"
              stroke="var(--color-primary)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* Timeline Nodes */}
          {experienceNodes.map((node, index) => (
            <div
              key={index}
              data-node={index}
              className={`flex items-center mb-16 ${
                node.side === 'left' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-1/2 ${node.side === 'left' ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className="bg-bg p-6 rounded-lg shadow-lg border">
                  <div className="text-sm text-primary font-medium mb-2">{node.year}</div>
                  <h3 className="text-xl font-semibold mb-1">{node.role}</h3>
                  <div className="text-secondary mb-2">
                    {node.company} • {node.location}
                  </div>
                  <p className="text-muted-foreground mb-4">{node.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {node.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {/* Timeline Dot */}
              <div className="w-4 h-4 bg-primary rounded-full border-4 border-bg relative z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}