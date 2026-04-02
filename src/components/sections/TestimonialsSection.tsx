import { useState, useRef } from 'react'
import { testimonials } from '@/data/testimonials'
import type { Testimonial } from '@/types'
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useMounted } from '@/hooks/useMounted'
import { SkeletonCard, SkeletonText, SkeletonCircle } from '@/components/ui/Skeleton'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-[320px] bg-card rounded-xl p-6 border border-card shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover select-none pointer-events-none"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`
          }}
        />
        <div>
          <h3 className="font-semibold text-primary">{testimonial.name}</h3>
          <p className="text-sm text-secondary">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-base ${i < testimonial.rating ? 'text-yellow-400' : 'text-secondary opacity-30'} select-none`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-secondary text-sm leading-relaxed italic select-none">
        "{testimonial.quote}"
      </blockquote>
    </div>
  )
}

export function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const baseVelocity = -1 // Velocidad negativa = mueve hacia la izquierda
  
  // Motion value para el desplazamiento
  const baseX = useMotionValue(0)
  
  // Duplicamos 3 o 4 veces para asegurar que haya suficiente contenido visual antes de que envuelva
  const wrapContent = [...testimonials, ...testimonials, ...testimonials, ...testimonials]
  
  // Suponiendo un ancho fijo por tarjeta (320px) + un gap (24px) = 344px por item
  const itemWidth = 344
  // El ancho total original (1 set de testimonios) es itemWidth * array.length
  const totalWidth = itemWidth * testimonials.length

  // Wrap obliga al valor a estar siempre entre `[-totalWidth, 0]` creando el seamless loop
  const x = useTransform(baseX, (v) => `${wrap(-totalWidth, 0, v)}px`)

  // Animación continua (Seamless Loop)
  useAnimationFrame((time, delta) => {
    // Si estemos haciendo hover, ralentizar
    const velocityFactor = isHovered ? 0.2 : 1
    const moveBy = baseVelocity * velocityFactor * (delta / 16)
    // Sumar el offset al base actual
    baseX.set(baseX.get() + moveBy)
  })

  // Funciones para ralentizar en hover si no está arrastrando interactuar
  const handleHoverStart = () => setIsHovered(true)
  const handleHoverEnd = () => setIsHovered(false)

  // Actualizar `baseX` si arrastramos para que la animación continúe desde donde soltamos
  const handleDragUpdate = (event: any, info: any) => {
    baseX.set(baseX.get() + info.delta.x)
  }

  return (
    <section id="referencias" aria-label="Referencias profesionales" className="py-24 bg-bg overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-4xl font-montserrat font-bold text-center text-primary">
          Referencias
        </h2>
        <p className="text-center text-secondary mt-4 max-w-2xl mx-auto">
          Arrastra con el mouse para explorar qué dicen mis colegas y clientes sobre el trabajo que hacemos juntos.
        </p>
      </div>

      {/* Slider Seamless Loop con Framer Motion */}
      <div
        className="w-full relative py-4 touch-pan-y"
        ref={containerRef}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        // Para soportar interacciones touch sin hover
        onTouchStart={handleHoverStart}
        onTouchEnd={handleHoverEnd}
      >
        {!mounted ? (
          <div className="flex gap-6 w-max px-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`test-skel-${i}`} className="w-[320px] bg-card rounded-xl p-6 border border-card">
                <div className="flex items-center gap-3 mb-4">
                  <SkeletonCircle size="w-12 h-12" />
                  <div className="space-y-2">
                    <SkeletonText width="w-32" height="h-4" />
                    <SkeletonText width="w-24" height="h-3" />
                  </div>
                </div>
                <SkeletonText width="w-20" height="h-4" className="mb-4" />
                <div className="space-y-2">
                  <SkeletonText width="w-full" height="h-3" />
                  <SkeletonText width="w-5/6" height="h-3" />
                  <SkeletonText width="w-4/6" height="h-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <motion.div
          className="flex gap-6 w-max cursor-grab active:cursor-grabbing px-6"
          style={{ x }}
          drag="x"
          // Limitamos el drag ficticio, pero no con bounds estrictos porque baseX maneja el wrap dinámicamente.
          // Al no poner dragConstraints permitimos arrastrar libremente a izquierda o derecha.
          dragConstraints={{ left: -10000, right: 10000 }} 
          dragElastic={0}
          onDrag={handleDragUpdate}
          onPan={handleDragUpdate} // Fallback manual de delta para algunos móviles
        >
          {wrapContent.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
        )}
      </div>
    </section>
  )
}