import { useEffect, useRef } from 'react'

interface VantaBackgroundProps {
  className?: string
}

export function VantaBackground({ className }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current) return

    if (vantaEffect.current) {
      vantaEffect.current.destroy()
      vantaEffect.current = null
    }

    const loadVanta = async () => {
      const THREE = await import('three')
      // Import dynamic due to SSR
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
        color: 0x3b82f6,
        backgroundColor: 0x0f172a,
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
  }, []) // Removed isDark dependency

  return <div ref={vantaRef} className={`absolute inset-0 z-0 pointer-events-none opacity-40 ${className ?? ''}`} />
}