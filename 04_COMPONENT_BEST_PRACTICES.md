# 04 — BUENAS PRÁCTICAS DE COMPONENTES
## Diseño, lógica y patrones de React para este proyecto

> Aplica estas reglas en cada componente que crees.

---

## 1. Anatomía de un componente bien escrito

```typescript
// ─── 1. Imports ──────────────────────────────────────────
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'
import type { ProjectCard } from '@/types'

// ─── 2. Interfaces / Types ───────────────────────────────
interface Props {
  card: ProjectCard
  index: number
  className?: string
}

// ─── 3. Variants / Constantes ───────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' }
  })
}

// ─── 4. Componente ──────────────────────────────────────
export function ProjectCardComponent({ card, index, className }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      whileHover={{ scale: 1.02 }}
      className={cn('bg-card rounded-xl border-l-4 p-6', className)}
      style={{ borderLeftColor: card.accentColor }}
    >
      <h3 className="font-montserrat font-bold text-primary">{card.title}</h3>
      {/* ... */}
    </motion.div>
  )
}
```

---

## 2. Reglas de props

```typescript
// ✅ Máximo 5 props directas — agrupar si supera
interface TooManyProps { a: string; b: string; c: string; d: string; e: string; f: string } // ❌
interface GroupedProps { data: CardData; config: CardConfig }                                 // ✅

// ✅ Siempre incluir className?: string en componentes UI (permite extensión)
interface ButtonProps { variant?: Variant; className?: string; children: React.ReactNode }

// ✅ Props opcionales con valores default explícitos
function SectionDivider({ direction = 'left', baseVelocity = 3 }: SectionDividerProps) {}

// ❌ Nunca pasar objetos como default en la firma (causa re-renders)
function Component({ config = {} }: Props) {}        // MAL
function Component({ config }: Props) {              // BIEN
  const safeConfig = config ?? {}
}
```

---

## 3. Manejo de efectos y cleanup

```typescript
// ✅ SIEMPRE hacer cleanup en useEffect
useEffect(() => {
  const vantaEffect = VANTA.NET({ el: ref.current, ... })
  return () => vantaEffect.destroy()   // ← cleanup obligatorio
}, [isDark])

// ✅ GSAP con useGSAP — el cleanup es automático dentro del scope
useGSAP(() => {
  gsap.to(element, { ... })
  // No necesitas return cleanup — useGSAP lo maneja
}, { scope: containerRef })

// ✅ EventListeners siempre con cleanup
useEffect(() => {
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

---

## 4. Performance — evitar re-renders innecesarios

```typescript
// ✅ useMemo para cálculos costosos
const sortedNodes = useMemo(
  () => experienceNodes.sort((a, b) => a.svgY - b.svgY),
  [experienceNodes]
)

// ✅ useCallback para funciones pasadas como props
const handleSubmit = useCallback(async (data: ContactFormData) => {
  await submit(data)
}, [submit])

// ✅ Keys estables en listas
skillCards.map((card) => <SkillCard key={card.id} card={card} />)  // ✅ id estable
items.map((item, i) => <Item key={i} />)                            // ❌ índice inestable

// ⚠️ memo() solo con evidencia de problema — no por defecto
export const HeavyComponent = memo(function HeavyComponent(props) { ... })
```

---

## 5. Animaciones — reglas Framer Motion

```typescript
// ✅ Definir variants FUERA del componente (no se recrean en cada render)
const variants = { hidden: {}, visible: {} }  // fuera del componente
function MyComponent() {
  return <motion.div variants={variants} />    // referencia estable
}

// ✅ viewport once:true para animaciones de entrada (no repetir)
whileInView="visible"
viewport={{ once: true, margin: '-50px' }}

// ✅ Respetar prefers-reduced-motion
const { prefersReducedMotion } = useReducedMotion()
const animProps = prefersReducedMotion
  ? {}
  : { initial: 'hidden', whileInView: 'visible', variants }

// ✅ AnimatePresence para montaje/desmontaje
<AnimatePresence>
  {isVisible && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

---

## 6. Accesibilidad básica obligatoria

```typescript
// ✅ Imágenes siempre con alt descriptivo
<img src={photo} alt="Foto de perfil de Ronald Preciado" />

// ✅ Botones con label accesible
<button aria-label="Cambiar a modo oscuro"><MoonIcon /></button>
<button aria-label="Cambiar idioma a inglés">EN</button>

// ✅ Links externos con rel
<a href={url} target="_blank" rel="noopener noreferrer">{label}</a>

// ✅ Roles semánticos en secciones
<section id="experiencia" aria-label="Sección de experiencia laboral">

// ✅ Skip link para navegación por teclado (en BaseLayout)
<a href="#main-content" className="sr-only focus:not-sr-only">
  Saltar al contenido principal
</a>

// ✅ Focus visible en elementos interactivos
className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
```

---

## 7. Gestión de i18n en componentes

```typescript
// ✅ Siempre usar hook useTranslation — nunca strings directos
import { useTranslation } from 'react-i18next'

function HeroSection() {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('hero.role')}</h1>        {/* ✅ */}
      <p>Ingeniero en Software</p>     {/* ❌ hardcodeado */}
    </div>
  )
}

// ✅ Para datos (hero.ts), usar claves i18n como valores
// El componente lee la clave y la traduce — no el archivo de datos
export const heroData = {
  role: 'hero.role',   // clave, no texto
  bio:  'hero.bio',
}
// En componente: t(heroData.role) → "Ingeniero en Software" o "Software Engineer"
```

---

## 8. Errores comunes a evitar

```typescript
// ❌ Estado local para cosas que ya viven en el store
const [isDark, setIsDark] = useState(false) // si ya está en Zustand → usar el store

// ❌ Fetch de datos en el componente — los datos son estáticos, importarlos
useEffect(() => { fetch('/api/skills') }, []) // innecesario — usar src/data/skills.ts

// ❌ Estilos condicionales con string concatenation
className={"btn " + (isPrimary ? "btn-primary" : "")} // ❌
className={cn('btn', isPrimary && 'btn-primary')}      // ✅

// ❌ Múltiples useState para estado relacionado
const [loading, setLoading] = useState(false)
const [error, setError]     = useState(null)
const [data, setData]       = useState(null)
// → Usar useReducer (State Reducer pattern) para esto

// ❌ Lógica de negocio en el JSX
return <div onClick={() => { emailjs.send(...); setStatus('sent') }}>  // ❌
return <div onClick={handleSubmit}>                                     // ✅
```
