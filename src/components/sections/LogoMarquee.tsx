import type { LogoItem } from '@/types'
import { logoItems } from '@/data/logos'

// SVGs importados como raw string (fill="currentColor" en todos)
import bancoBolSVG from '@/svg/BancoBolivariano.svg?raw'
import grupoDifSVG from '@/svg/GrupoDifare.svg?raw'
import telconetSVG from '@/svg/Telconet.svg?raw'
import claroSVG    from '@/svg/claro.svg?raw'

// Mapa id → markup SVG
const svgMap: Record<string, string> = {
  'banco-bolivariano': bancoBolSVG,
  'grupo-difare':      grupoDifSVG,
  'telconet':          telconetSVG,
  'claro':             claroSVG,
}

interface LogoCardProps {
  logo: LogoItem
}

function LogoCard({ logo }: LogoCardProps) {
  const markup = svgMap[logo.id]
  if (!markup) return null

  return (
    /*
     * FIX LOOP: padding simétrico en X en lugar de gap en el contenedor padre.
     * Así el espacio entre el último logo y el primero (al reiniciar)
     * es idéntico al espacio entre cualquier par consecutivo → sin salto visual.
     *
     * h-[62px]: ~10% más grande que h-14 (56px)
     * w-auto + [&_svg]:h-full: el SVG escala por altura, ancho proporcional
     * → elimina el espacio enorme entre logos de diferentes proporciones
     */
    <div
      aria-label={logo.name}
      role="img"
      className="flex-shrink-0 h-[62px] px-8 flex items-center [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-none [&_svg]:block"
      style={{ color: '#64748B' }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export function LogoMarquee() {
  /*
   * Array duplicado [A B C D A B C D].
   * La animación va de translateX(0) → translateX(-50%).
   * Con padding simétrico en cada item, el punto -50% cae exactamente
   * donde empieza el segundo set → reinicio invisible.
   */
  const doubled = [...logoItems, ...logoItems]

  return (
    <section id="empresas" aria-label="Empresas con las que he trabajado" className="py-16 bg-bg">
      <h2 className="text-2xl font-montserrat font-bold text-center mb-10 text-primary">
        Empresas con las que he trabajado
      </h2>

      {/* overflow-hidden: logos salen/entran como el sol en el horizonte */}
      <div className="overflow-hidden w-full">
        <div className="marquee-track flex items-center w-max">
          {doubled.map((logo, index) => (
            <LogoCard key={`${logo.id}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  )
}