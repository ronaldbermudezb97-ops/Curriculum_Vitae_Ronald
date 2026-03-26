import { motion } from 'framer-motion'
import { useRef } from 'react'

// Mock logos - replace with actual logo images
const logos = [
  { name: 'TechCorp', src: '/images/logos/logo-1.png' },
  { name: 'InnovateTech', src: '/images/logos/logo-2.png' },
  { name: 'DevSolutions', src: '/images/logos/logo-3.png' },
  { name: 'CodeMasters', src: '/images/logos/logo-4.png' },
]

export function LogoMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-16 bg-bg">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-montserrat font-bold text-center mb-8 text-primary"
        >
          Empresas donde he trabajado
        </motion.h2>

        <div
          ref={marqueeRef}
          className="flex overflow-hidden"
        >
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [0, -100 * logos.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 bg-card rounded-lg flex items-center justify-center border"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling!.textContent = logo.name
                  }}
                />
                <span className="text-sm font-medium text-muted-foreground hidden">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}