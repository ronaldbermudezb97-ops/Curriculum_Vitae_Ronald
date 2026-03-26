import { useRef } from 'react'
import { motion, useScroll, useVelocity, useTransform, useAnimationFrame, useMotionValue, wrap } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface SectionDividerProps {
  labelKey: string
  direction?: 'left' | 'right'
  baseVelocity?: number
}

export function SectionDivider({ labelKey, direction = 'left', baseVelocity = 3 }: SectionDividerProps) {
  const { t } = useTranslation()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useTransform(scrollVelocity, [0, 1000], [0, 5])
  const velocityFactor = useTransform(smoothVelocity, [0, 5], [0, 5], {
    clamp: false,
  })

  const directionFactor = direction === 'left' ? -1 : 1

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor === -1 ? (moveBy *= -1) : (moveBy *= 1)
    } else if (velocityFactor.get() > 0) {
      directionFactor === -1 ? (moveBy *= 1) : (moveBy *= -1)
    }
    moveBy += directionFactor * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const label = t(labelKey)

  return (
    <div className="relative flex h-20 w-full items-center overflow-hidden bg-bg">
      <motion.div
        className="flex whitespace-nowrap text-4xl font-bold uppercase tracking-wider text-primary/30"
        style={{ x }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="mr-8">
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  )
}