import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function IntroSection() {
  const { t } = useTranslation()

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 2.0, // Retraso de medio segundo para esperar la carga del fondo
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
    },
  }

  const text = t('intro.welcome', { defaultValue: 'Bienvenido a mi perfil' })

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-bg">
      <motion.div
        className="relative z-10 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={item}
            className="inline-block text-6xl md:text-8xl font-montserrat font-bold text-primary"
            transition={{ duration: 0.5 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}