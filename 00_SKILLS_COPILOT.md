# 00 — SKILLS DE COPILOT
## Capacidades técnicas disponibles para este proyecto

> Este archivo define las tecnologías que el modelo puede y debe usar.
> Léelo antes de programar cualquier componente.

---

## Lenguajes

| Lenguaje | Nivel | Uso en este proyecto |
|---|---|---|
| TypeScript | Avanzado | Todo el código — sin `any` |
| JavaScript | Avanzado | Solo cuando TS no aplique |
| CSS / Tailwind | Avanzado | Estilos — sin CSS inline salvo excepciones |
| HTML / JSX | Avanzado | Estructura de componentes |

---

## Frameworks y Entornos

| Tecnología | Uso |
|---|---|
| **Astro** | Framework principal — páginas `.astro`, layouts, SSG |
| **React 18** | Componentes interactivos como Astro Islands |
| **Node.js** | Entorno de ejecución |

---

## Librerías de Animación

| Librería | Qué sabe hacer el modelo |
|---|---|
| **Framer Motion** | `motion.div`, `variants`, `staggerChildren`, `whileInView`, `whileHover`, `useScroll`, `useVelocity`, `useTransform`, `useMotionValue`, `useAnimationFrame`, `AnimatePresence` |
| **GSAP** | `gsap.to/from/set`, `ScrollTrigger`, `pin`, `scrub`, `stroke-dashoffset`, `useGSAP` hook |
| **Vanta.js** | `VANTA.NET()` con `useEffect` + cleanup + reinicialización por tema |

---

## Librerías de Estado y Datos

| Librería | Qué sabe hacer el modelo |
|---|---|
| **Zustand** | `create`, `persist`, slice pattern, acceso desde cualquier componente |
| **react-hook-form** | `useForm`, `register`, `handleSubmit`, `formState.errors` |
| **Zod** | `z.object`, `z.string`, `z.literal`, `z.infer`, mensajes de error custom |
| **i18next + react-i18next** | `useTranslation`, `t('clave')`, `i18n.changeLanguage()` |

---

## Librerías UI

| Librería | Qué sabe hacer el modelo |
|---|---|
| **Tailwind CSS** | Todas las utilidades, `dark:` prefix, variables CSS custom, `@apply` |
| **CVA (class-variance-authority)** | Variantes de componentes con tipos TypeScript |
| **clsx + tailwind-merge** | Merge seguro de clases |
| **@lottiefiles/react-lottie-player** | `<Player>` con animaciones JSON |

---

## Servicios Externos

| Servicio | Cómo usarlo |
|---|---|
| **EmailJS** | `emailjs.send(serviceId, templateId, params, publicKey)` — cliente only |
| **Google Fonts** | Importar en `<head>` de `BaseLayout.astro` |
| **Vanta CDN / npm** | `import VANTA from 'vanta/dist/vanta.net.min'` |

---

## Patrones TypeScript que debe aplicar

```typescript
// ✅ Siempre tipar props con interface
interface Props { title: string; items: string[] }

// ✅ Usar type imports
import type { TimelineNode } from '@/types'

// ✅ Alias de paths — nunca rutas relativas largas
import { heroData } from '@/data/hero'

// ❌ Nunca usar any
const data: any = {} // PROHIBIDO

// ❌ Nunca usar ! (non-null assertion) sin justificación
element!.style.opacity = '1' // EVITAR
```

---

## Lo que el modelo NO debe hacer

- ❌ Usar `useState` para estado global — usar Zustand
- ❌ Hardcodear textos en componentes — usar i18n
- ❌ Hardcodear datos en componentes — usar archivos en `src/data/`
- ❌ Usar CSS inline arbitrario — usar clases Tailwind
- ❌ Importar GSAP entero — importar solo lo necesario
- ❌ Crear componentes de más de 200 líneas sin dividirlos
- ❌ Olvidar cleanup en `useEffect` (especialmente Vanta y GSAP)
