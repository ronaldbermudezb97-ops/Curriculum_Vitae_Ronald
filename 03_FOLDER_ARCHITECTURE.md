# 03 — ARQUITECTURA DE CARPETAS
## Estructura de directorios del proyecto

> Respetar esta estructura sin excepción.
> No crear carpetas fuera de este esquema sin justificación documentada.

---

## Árbol completo

```
/
├── public/
│   ├── images/
│   │   ├── profile.jpg              ← Foto de perfil (Hero)
│   │   ├── projects/                ← Imágenes de tarjetas de proyecto
│   │   │   ├── project-1.jpg
│   │   │   └── project-2.jpg
│   │   ├── gallery/                 ← Imágenes de galería (si aplica)
│   │   └── logos/                   ← Logos PNG para el marquee de empresas
│   │       ├── logo-empresa-1.png
│   │       └── logo-empresa-2.png
│   └── lottie/
│       └── developer.json           ← Animación Lottie del menú (navbar)
│
├── src/
│   │
│   ├── pages/
│   │   └── index.astro              ← ÚNICA página — monta todas las secciones
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro         ← HTML base, <head>, meta tags, fuentes, Vanta
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           ← Menú principal (Lottie + nav links + toggles)
│   │   │   └── Footer.astro         ← Footer estático
│   │   │
│   │   ├── sections/                ← Una sección = un archivo
│   │   │   ├── IntroSection.tsx     ← SEC-00: Pantalla de bienvenida
│   │   │   ├── HeroSection.tsx      ← SEC-02: Nombre, bio, foto, social
│   │   │   ├── ProjectsSection.tsx  ← SEC-04: Scroll horizontal + tarjetas
│   │   │   ├── GallerySection.tsx   ← SEC-05: Skills grid (6 tarjetas)
│   │   │   ├── ExperienceSection.tsx← SEC-06: Timeline SVG animado
│   │   │   ├── LogoMarquee.tsx      ← SEC-03: Marquee infinito de logos
│   │   │   ├── TestimonialsSection.tsx ← SEC-07: 5 tarjetas de testimonio
│   │   │   └── ContactSection.tsx   ← SEC-08: Formulario de contacto
│   │   │
│   │   └── ui/                      ← Átomos y componentes reutilizables
│   │       ├── Button.tsx           ← CVA — variantes: primary/secondary/ghost
│   │       ├── Card.tsx             ← CVA — variantes: project/skill/testimonial
│   │       ├── Badge.tsx            ← Tech stack tags (JetBrains Mono)
│   │       ├── SectionDivider.tsx   ← Scroll velocity marquee reutilizable
│   │       ├── VantaBackground.tsx  ← Fondo Vanta NET (responde a isDark)
│   │       ├── ThemeToggle.tsx      ← Botón dark/light
│   │       └── LocaleToggle.tsx     ← Botón ES/EN
│   │
│   ├── hooks/                       ← Custom hooks — lógica separada del render
│   │   ├── useScrollAnimation.ts    ← GSAP ScrollTrigger reutilizable
│   │   ├── useTimelineAnimation.ts  ← GSAP para el timeline SVG
│   │   ├── useContactForm.ts        ← State Reducer del formulario
│   │   └── useTheme.ts              ← Sincroniza isDark con clase .dark en <html>
│   │
│   ├── store/
│   │   └── useAppStore.ts           ← Zustand — tema, locale, sección, menú
│   │
│   ├── services/
│   │   └── emailService.ts          ← Abstrae la llamada a EmailJS
│   │
│   ├── data/                        ← Datos estáticos — NUNCA en los componentes
│   │   ├── hero.ts                  ← heroData (nombre, bio, social links)
│   │   ├── projects.ts              ← Array ProjectCard[]
│   │   ├── skills.ts                ← Array SkillCard[]
│   │   ├── experience.ts            ← Array TimelineNode[]
│   │   └── testimonials.ts          ← Array Testimonial[]
│   │
│   ├── i18n/                        ← Traducciones
│   │   ├── es.json                  ← Todas las claves en español
│   │   └── en.json                  ← Todas las claves en inglés
│   │
│   ├── types/
│   │   └── index.ts                 ← Todas las interfaces TypeScript del proyecto
│   │
│   ├── utils/
│   │   └── cn.ts                    ← Helper clsx + tailwind-merge
│   │
│   └── styles/
│       └── global.css               ← Variables CSS + reset + fuentes
│
├── .env                             ← Variables de entorno (no commitear)
├── .env.example                     ← Plantilla de variables (sí commitear)
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Reglas de la arquitectura

### Imports — siempre con alias `@/`
```typescript
// ✅ CORRECTO
import { heroData }       from '@/data/hero'
import { useAppStore }    from '@/store/useAppStore'
import { Button }         from '@/components/ui/Button'
import type { HeroData }  from '@/types'

// ❌ INCORRECTO — rutas relativas largas
import { heroData } from '../../../data/hero'
```

Configurar en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### Datos — siempre en `src/data/`
```typescript
// ❌ NUNCA hardcodear en el componente
function SkillsSection() {
  const skills = [{ title: "React", ... }] // PROHIBIDO
}

// ✅ SIEMPRE importar del archivo de datos
import { skillCards } from '@/data/skills'
```

### Tipos — siempre en `src/types/index.ts`
```typescript
// Todas las interfaces del proyecto en un solo lugar
export interface HeroData { ... }
export interface ProjectCard { ... }
export interface SkillCard { ... }
export interface TimelineNode { ... }
export interface Testimonial { ... }
export interface SocialLink { ... }
export interface SectionDividerProps { ... }
```

### Helper `cn` — `src/utils/cn.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Convenciones de nombrado

| Tipo de archivo | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase + `use` | `useScrollAnimation.ts` |
| Stores | camelCase + `use` | `useAppStore.ts` |
| Servicios | camelCase + Service | `emailService.ts` |
| Datos | camelCase | `experience.ts` |
| Utilidades | camelCase | `cn.ts` |
| Archivos Astro | camelCase | `BaseLayout.astro` |
| CSS variables | kebab-case + `--color-` | `--color-bg` |
