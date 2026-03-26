import { useEffect, useRef } from 'react'
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

    if (vantaEffect.current) {
      vantaEffect.current.destroy()
      vantaEffect.current = null
    }

    const loadVanta = async () => {
      const THREE = await import('three')
      const { default: NET } = await import('vanta/dist/vanta.net.min.js')

      if (!vantaRef.current) return

      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0x3b82f6 : 0x1e40af,
        backgroundColor: isDark ? 0x0f172a : 0xffffff,
        points: 15.0,
        maxDistance: 23.0,
        spacing: 18.0,
      })
    }

    loadVanta()

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [isDark])

  return <div ref={vantaRef} className={`absolute inset-0 ${className ?? ''}`} />
}