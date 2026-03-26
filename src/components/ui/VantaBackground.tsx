import { useEffect, useRef } from 'react'
// @ts-ignore
import NET from 'vanta/dist/vanta.net.min'
import { useAppStore } from '@/store/useAppStore'

interface VantaBackgroundProps {
  className?: string
}

export function VantaBackground({ className }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)
  const { isDark } = useAppStore()

  useEffect(() => {
    if (!vantaRef.current) return

    vantaEffect.current = NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: isDark ? 0x3b82f6 : 0x1e40af, // blue-500 : blue-700
      backgroundColor: isDark ? 0x0f172a : 0xffffff, // slate-900 : white
      points: 20.0,
      maxDistance: 25.0,
      spacing: 15.0,
    })

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [isDark])

  return <div ref={vantaRef} className={`absolute inset-0 ${className}`} />
}