import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { heroData } from '@/data/hero'
import { Button } from '@/components/ui/Button'
import { useMounted } from '@/hooks/useMounted'
import { SkeletonText, SkeletonCircle } from '@/components/ui/Skeleton'
import { useAppStore } from '@/store/useAppStore'

export function HeroSection() {
  const { t } = useTranslation()
  const { locale } = useAppStore()
  const mounted = useMounted()

  return (
    <section id="sobre-mi" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          {!mounted ? (
            <>
              <div className="space-y-6">
                <SkeletonText className="w-3/4 h-12 md:h-16" />
                <SkeletonText className="w-1/2 h-8 md:h-10" />
                <SkeletonText className="w-full h-24" />
                <div className="flex gap-4">
                  <SkeletonText className="w-32 h-12 rounded-lg" />
                  <div className="flex gap-4">
                    <SkeletonCircle size="w-12 h-12" />
                    <SkeletonCircle size="w-12 h-12" />
                    <SkeletonCircle size="w-12 h-12" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <SkeletonCircle size="w-80 h-80 md:w-96 md:h-96" />
              </div>
            </>
          ) : (
          <>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-primary flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>{heroData.name}</span>
            
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
                <img src="/josue.jpeg" alt="icon" className="w-full h-full object-cover" />
             
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20" />

            </div>
          </motion.div>
          </>
          )}
        </div>
      </div>
    </section>
  )
}