import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { heroData } from '@/data/hero'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section id="inicio" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-primary">
              {heroData.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-inter font-medium text-secondary">
              {t(heroData.role)}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(heroData.bio)}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={heroData.ctaHref} className="inline-block">
                <Button size="lg">
                  {t(heroData.ctaLabel)}
                </Button>
              </a>

              {/* Social links */}
              <div className="flex gap-4">
                {heroData.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    {/* Simple icons - replace with actual icons later */}
                    {social.icon === 'github' && '🐙'}
                    {social.icon === 'linkedin' && '💼'}
                    {social.icon === 'youtube' && '📺'}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Columna de foto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={heroData.photo}
                  alt={heroData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}