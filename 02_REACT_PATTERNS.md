# 02 — PATRONES DE REACT
## Patrones a aplicar en este proyecto

> Léelo antes de crear cualquier componente.
> Cada patrón indica CUÁNDO y DÓNDE usarlo en el portfolio.

---

## 1. Compound Component

**Cuándo:** Componentes con sub-partes relacionadas que comparten estado implícito.  
**Dónde en este proyecto:** `Navbar`, `ProjectCard`, `TestimonialCard`

```typescript
// Ejemplo: Navbar con sub-componentes
const Navbar = ({ children }: { children: React.ReactNode }) => {
  return <nav className="...">{children}</nav>
}

Navbar.Logo    = function NavLogo()    { return <div>...</div> }
Navbar.Links   = function NavLinks()   { return <ul>...</ul> }
Navbar.Actions = function NavActions() { return <div>...</div> } // theme + locale toggles

// Uso en index.astro:
// <Navbar>
//   <Navbar.Logo />
//   <Navbar.Links />
//   <Navbar.Actions />
// </Navbar>
```

---

## 2. Extensive Style con CVA

**Cuándo:** Componentes UI con múltiples variantes de estilo tipadas.  
**Dónde en este proyecto:** `Button.tsx`, `Card.tsx`, `Badge.tsx`  
**Librería:** `npm install class-variance-authority`

```typescript
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'  // clsx + tailwind-merge

const buttonVariants = cva(
  // clases base
  'inline-flex items-center justify-center rounded-lg font-inter font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:   'bg-primary text-bg hover:opacity-90',
        secondary: 'border border-primary text-primary hover:bg-primary hover:text-bg',
        ghost:     'text-secondary hover:text-primary hover:bg-card',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg',
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}
```

---

## 3. State Reducer

**Cuándo:** Lógica de estado compleja con múltiples transiciones.  
**Dónde en este proyecto:** `ContactSection.tsx` — formulario con múltiples estados

```typescript
// src/hooks/useContactForm.ts
type FormAction =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; payload: string }
  | { type: 'RESET' }

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  errorMessage: string | null
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SUBMIT':  return { status: 'submitting', errorMessage: null }
    case 'SUCCESS': return { status: 'success',    errorMessage: null }
    case 'ERROR':   return { status: 'error',      errorMessage: action.payload }
    case 'RESET':   return { status: 'idle',       errorMessage: null }
    default:        return state
  }
}

export function useContactForm() {
  const [state, dispatch] = useReducer(formReducer, { status: 'idle', errorMessage: null })

  const submit = async (data: ContactFormData) => {
    dispatch({ type: 'SUBMIT' })
    try {
      await sendContactEmail(data)
      dispatch({ type: 'SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: 'Error al enviar. Intenta de nuevo.' })
    }
  }

  return { state, submit, reset: () => dispatch({ type: 'RESET' }) }
}
```

---

## 4. Zustand Store (Global State)

**Cuándo:** Estado compartido entre múltiples componentes no relacionados por árbol.  
**Dónde en este proyecto:** tema, locale, sección activa, menú móvil

```typescript
// src/store/useAppStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  isDark: boolean
  toggleTheme: () => void
  locale: 'es' | 'en'
  setLocale: (locale: 'es' | 'en') => void
  activeSection: string
  setActiveSection: (section: string) => void
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDark:           false,
      toggleTheme:      () => set((s) => ({ isDark: !s.isDark })),
      locale:           'es',
      setLocale:        (locale) => set({ locale }),
      activeSection:    '#inicio',
      setActiveSection: (activeSection) => set({ activeSection }),
      isMenuOpen:       false,
      toggleMenu:       () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
    }),
    { name: 'portfolio-store', partialize: (s) => ({ isDark: s.isDark, locale: s.locale }) }
  )
)
```

---

## 5. Custom Hook (separar lógica de render)

**Cuándo:** Cualquier componente con lógica reutilizable o compleja.  
**Dónde en este proyecto:** animaciones GSAP, formulario, tema, scroll

```typescript
// src/hooks/useScrollAnimation.ts — abstrae GSAP para el timeline
export function useTimelineAnimation(
  sectionRef: RefObject<HTMLDivElement>,
  pathRef: RefObject<SVGPathElement>,
  nodes: TimelineNode[]
) {
  useGSAP(() => {
    const path = pathRef.current
    if (!path) return
    const totalLength = path.getTotalLength()
    gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength })
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'bottom center', scrub: true }
    })
    // ... animación de nodos
  }, { scope: sectionRef })
}

// ExperienceSection.tsx solo llama:
// useTimelineAnimation(sectionRef, pathRef, experienceNodes)
```

---

## 6. Reglas generales de componentes

```typescript
// ✅ Un componente = un archivo
// ✅ Props siempre tipadas con interface, nunca inline
// ✅ Default exports para páginas/secciones, named exports para UI atoms
// ✅ Componentes < 150 líneas — si supera, dividir
// ✅ Children tipados como React.ReactNode
// ✅ Keys estables en listas (id, no índice salvo que sea estático)
// ✅ Cleanup en useEffect — especialmente GSAP y Vanta
// ✅ memo() solo cuando hay evidencia de re-renders innecesarios
// ❌ No pasar más de 5 props — agrupar en un objeto si supera
// ❌ No lógica de negocio en el JSX — mover a hooks o handlers
```

---

## Mapa de patrones por componente

| Componente | Patrón |
|---|---|
| `Navbar.tsx` | Compound Component |
| `Button.tsx` | Extensive Style (CVA) |
| `Card.tsx` | Extensive Style (CVA) |
| `ContactSection.tsx` | State Reducer + Custom Hook |
| `useAppStore.ts` | Zustand |
| `useTimelineAnimation.ts` | Custom Hook |
| `useContactForm.ts` | Custom Hook + State Reducer |
| `SectionDivider.tsx` | Custom Hook (`useScrollVelocity`) |
