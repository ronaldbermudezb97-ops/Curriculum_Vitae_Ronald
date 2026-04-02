# 05 — LIBRERÍAS
## Stack completo de dependencias con instalación y uso

---

## Instalación completa (un solo comando)

```bash
# Framework
npx create astro@latest portfolio --template minimal
cd portfolio
npx astro add react tailwind

# Animaciones
npm install framer-motion gsap @gsap/react vanta three

# Estado y formularios
npm install zustand react-hook-form zod @hookform/resolvers

# i18n
npm install i18next react-i18next

# Servicios
npm install @emailjs/browser

# UI utilities
npm install class-variance-authority clsx tailwind-merge

# Lottie
npm install @lottiefiles/react-lottie-player
```

---

## Framework

### Astro + React
```bash
npx create astro@latest
npx astro add react tailwind
```

| Concepto | Uso |
|---|---|
| `.astro` | Layouts y páginas estáticas |
| `client:load` | Isla React que carga inmediatamente |
| `client:visible` | Isla React que carga al entrar en viewport |
| `client:idle` | Isla React que carga cuando el navegador está libre |

---

## Animaciones

### Framer Motion
```bash
npm install framer-motion
```

| Hook / API | Uso en el proyecto |
|---|---|
| `motion.div` | Cualquier elemento animado |
| `variants` | Definir estados de animación |
| `staggerChildren` | Animación en cascada (Intro, Hero) |
| `whileInView` | Entrada al viewport (Skills, Testimonios) |
| `whileHover` | Hover en tarjetas |
| `useScroll` | Detectar posición de scroll |
| `useVelocity` | Velocidad del scroll (SectionDivider) |
| `useTransform` | Mapear valores (SectionDivider) |
| `useMotionValue` | Valor animable mutable |
| `useAnimationFrame` | Loop de animación (marquee) |
| `AnimatePresence` | Animación de desmontaje |
| `wrap` de `@motionone/utils` | Loop continuo para marquee |

### GSAP + ScrollTrigger
```bash
npm install gsap @gsap/react
```

```typescript
// Registro obligatorio al inicio del componente
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Patrón base
useGSAP(() => {
  gsap.to(target, {
    opacity: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      scrub: true,        // ligado al scroll
      pin: true,          // fija el elemento (proyectos)
      // markers: true,   // solo en desarrollo
    }
  })
}, { scope: containerRef })  // cleanup automático
```

### Vanta.js
```bash
npm install vanta three
```

```typescript
import VANTA from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'

useEffect(() => {
  const effect = VANTA.NET({
    el: ref.current,
    THREE,
    color: isDark ? 0x3B82F6 : 0x64748B,
    backgroundColor: isDark ? 0x0F172A : 0xF1F5F9,
    points: 12, maxDistance: 20, spacing: 18,
  })
  return () => effect.destroy()  // cleanup obligatorio
}, [isDark])
```

---

## Estado Global

### Zustand
```bash
npm install zustand
```

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({ /* estado y acciones */ }),
    { name: 'portfolio-store', partialize: (s) => ({ isDark: s.isDark, locale: s.locale }) }
  )
)

// Uso en cualquier componente:
const { isDark, toggleTheme } = useAppStore()
```

---

## Formularios

### react-hook-form + Zod
```bash
npm install react-hook-form zod @hookform/resolvers
```

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name:    z.string().min(2, 'Mínimo 2 caracteres'),
  email:   z.string().email('Email inválido'),
  subject: z.string().min(5, 'Mínimo 5 caracteres'),
  message: z.string().min(20, 'Mínimo 20 caracteres'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Requerido' }) }),
})

type FormData = z.infer<typeof schema>

const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: 'onChange',
})
```

---

## i18n

### i18next + react-i18next
```bash
npm install i18next react-i18next
```

```typescript
// src/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './es.json'
import en from './en.json'

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

export default i18n

// Uso en componentes:
const { t, i18n } = useTranslation()
t('hero.role')                  // → "Ingeniero en Software" o "Software Engineer"
i18n.changeLanguage('en')       // cambiar idioma
```

---

## Servicios

### EmailJS
```bash
npm install @emailjs/browser
```

```typescript
// src/services/emailService.ts
import emailjs from '@emailjs/browser'

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await emailjs.send(
    import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
    import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
    {
      from_name:  data.name,
      from_email: data.email,
      subject:    data.subject,
      message:    data.message,
    },
    import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
  )
}
```

Variables de entorno requeridas en `.env`:
```
PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

---

## UI Utilities

### CVA (class-variance-authority)
```bash
npm install class-variance-authority
```

```typescript
import { cva, type VariantProps } from 'class-variance-authority'
const variants = cva('base', { variants: { size: { sm: '...', md: '...' } } })
```

### clsx + tailwind-merge → `cn()`
```bash
npm install clsx tailwind-merge
```

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

// Uso:
className={cn('base-class', isActive && 'active-class', className)}
```

### Lottie
```bash
npm install @lottiefiles/react-lottie-player
```

```typescript
import { Player } from '@lottiefiles/react-lottie-player'

<Player
  autoplay loop
  src="/lottie/developer.json"
  style={{ height: '80px', width: '80px' }}
/>
```

---

## Tabla resumen de versiones

| Librería | Versión mínima |
|---|---|
| astro | 4.x |
| react | 18.x |
| typescript | 5.x |
| tailwindcss | 3.x |
| framer-motion | 11.x |
| gsap | 3.12.x |
| zustand | 4.x |
| zod | 3.x |
| react-hook-form | 7.x |
| i18next | 23.x |
| react-i18next | 14.x |
| @emailjs/browser | 4.x |
| vanta | 0.5.x |
| three | 0.160.x |
| class-variance-authority | 0.7.x |
