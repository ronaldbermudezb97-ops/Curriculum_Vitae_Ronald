import { useState } from 'react'
import { testimonials } from '@/data/testimonials'
import type { Testimonial } from '@/types'
import { cn } from '@/utils/cn'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-card rounded-xl p-6 border border-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
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
            className={`text-base ${i < testimonial.rating ? 'text-yellow-400' : 'text-secondary opacity-30'}`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-secondary text-sm leading-relaxed italic">
        "{testimonial.quote}"
      </blockquote>
    </div>
  )
}

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicar para el loop continuo sin salto visual
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="referencias" aria-label="Referencias profesionales" className="py-20 bg-bg">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-montserrat font-bold text-center text-primary">
          Referencias
        </h2>
      </div>

      {/* Slider — overflow-hidden crea el efecto "entra desde un lado" */}
      <div
        className={cn('overflow-hidden', isPaused && 'testimonials-paused')}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonials-track flex gap-6 w-max px-6">
          {doubled.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}