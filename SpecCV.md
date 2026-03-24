# SDD — Software Design Document
## Portfolio Web · Ronald Isaias Preciado Bermúdez
**Versión:** 1.0.0  
**Fecha:** 2025  
**Tipo:** SPA / Landing Page (Currículum Vitae Interactivo)  
**Autor del documento:** Especificación técnica para implementación por agente/modelo LLM

---

## Tabla de Contenidos

1. [Visión General](#1-visión-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Sistema de Diseño](#3-sistema-de-diseño)
4. [Arquitectura del Proyecto](#4-arquitectura-del-proyecto)
5. [Componentes y Secciones](#5-componentes-y-secciones)
6. [Animaciones y Efectos](#6-animaciones-y-efectos)
7. [Gestión de Estado](#7-gestión-de-estado)
8. [Formulario de Contacto](#8-formulario-de-contacto)
9. [Internacionalización](#9-internacionalización)
10. [Requerimientos No Funcionales](#10-requerimientos-no-funcionales)
11. [Estructura de Archivos](#11-estructura-de-archivos)
12. [Convenciones de Código](#12-convenciones-de-código)

---

## 1. Visión General

### 1.1 Descripción
Aplicación web de una sola página (SPA) que funciona como Currículum Vitae interactivo y portafolio personal de **Ronald Isaias Preciado Bermúdez**, Ingeniero en Software. La página debe transmitir identidad técnica, modernidad y nivel profesional senior mediante animaciones fluidas, tipografía cuidada y una experiencia de scroll narrativa.

### 1.2 Objetivos Funcionales
- Presentar información profesional de forma visualmente impactante
- Permitir contacto directo vía formulario integrado con EmailJS
- Mostrar proyectos, habilidades y experiencia con animaciones dirigidas por scroll
- Soportar modo oscuro y modo claro con fondo animado dinámico (Vanta.js)

### 1.3 Audiencia
Reclutadores técnicos, clientes potenciales, colaboradores y evaluadores de perfil profesional.

---

## 2. Stack Tecnológico

### 2.1 Framework Principal
| Tecnología | Versión | Rol |
|---|---|---|
| **Astro** | latest | Framework principal SSG/SSR |
| **React** | ^18 | Componentes interactivos (islas) |
| **TypeScript** | ^5 | Tipado estático |

### 2.2 Librerías de UI y Estilos
| Librería | Instalación | Uso |
|---|---|---|
| **Tailwind CSS** | `npx astro add tailwind` | Estilos utilitarios + variables |
| **Framer Motion** | `npm install framer-motion` | Animaciones declarativas en React |

### 2.3 Animaciones
| Librería | Instalación | Uso |
|---|---|---|
| **GSAP** | `npm install gsap` | Animaciones de scroll avanzadas |
| **@gsap/react** | `npm install @gsap/react` | Hook `useGSAP` para React |
| **GSAP ScrollTrigger** | incluido en gsap | Plugin para animaciones por scroll |
| **Vanta.js** | `npm install vanta` | Fondo animado 3D (NET effect) |
| **Three.js** | `npm install three` | Dependencia peer de Vanta.js |

### 2.4 Formulario y Servicios
| Librería | Instalación | Uso |
|---|---|---|
| **@emailjs/browser** | `npm install @emailjs/browser` | Envío de emails desde el cliente |
| **react-hook-form** | `npm install react-hook-form` | Gestión del formulario de contacto |
| **zod** | `npm install zod` | Validación de esquemas del formulario |

### 2.5 Estado Global
| Librería | Instalación | Uso |
|---|---|---|
| **Zustand** | `npm install zustand` | Store global (tema, UI state) |

### 2.6 Miscelánea
| Librería | Instalación | Uso |
|---|---|---|
| **@lottiefiles/react-lottie-player** | `npm install @lottiefiles/react-lottie-player` | Animación Lottie en el menú |
| **clsx** | `npm install clsx` | Utilidad para clases condicionales |
| **tailwind-merge** | `npm install tailwind-merge` | Merge de clases Tailwind |

---

## 3. Sistema de Diseño

### 3.1 Tipografía
Importar desde Google Fonts en el `<head>` global de Astro.

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

| Rol | Fuente | Peso | Aplicación |
|---|---|---|---|
| Títulos / Nombre | Montserrat | 600 / 700 | `font-montserrat font-semibold` |
| Cuerpo / Descripciones | Inter | 400 | `font-inter font-normal` |
| Tech Stack / Skills | JetBrains Mono | 500 | `font-mono font-medium` |

Declarar en `tailwind.config.mjs`:
```js
fontFamily: {
  montserrat: ['Montserrat', 'sans-serif'],
  inter: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### 3.2 Paleta de Colores — Variables CSS

Declarar en `src/styles/global.css`:

```css
:root {
  /* Modo Claro */
  --color-bg:           #F1F5F9;
  --color-card:         #FFFFFF;
  --color-text-primary: #1E293B;
  --color-text-secondary: #64748B;

  /* Estados semánticos */
  --color-success:  #10B981;
  --color-error:    #EF4444;
  --color-warning:  #F59E0B;
}

.dark {
  /* Modo Oscuro */
  --color-bg:           #0F172A;
  --color-card:         #1E293B;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
}
```

Mapear en `tailwind.config.mjs`:
```js
colors: {
  bg:        'var(--color-bg)',
  card:      'var(--color-card)',
  primary:   'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  success:   'var(--color-success)',
  error:     'var(--color-error)',
  warning:   'var(--color-warning)',
}
```

### 3.3 Breakpoints Responsivos

| Variable | Nombre | Valor | Dispositivo |
|---|---|---|---|
| `sm` | Teléfono | `640px` | Mobile |
| `md` | Tablet | `768px` | Tablet |
| `lg` | Laptop | `1024px` | Laptop |
| `xl` | Desktop | `1280px` | Desktop |

Usar siempre mobile-first: `base → sm → md → lg → xl`

---

## 4. Arquitectura del Proyecto

### 4.1 Patrón de Componentes React
Aplicar los siguientes patrones según el contexto:

| Patrón | Cuándo usarlo |
|---|---|
| **Compound Component** | Menú de navegación, tarjetas de proyecto |
| **State Reducer** | Formulario de contacto con validaciones complejas |
| **Extensive Style (CVA)** | Botones, badges, tarjetas con variantes de estilo |
| **Zustand Store** | Estado global: tema (dark/light), sección activa, estado del formulario |

### 4.2 Integración Astro + React
- Los componentes React se montan como **Astro Islands** con `client:load` o `client:visible`
- Las secciones estáticas se escriben directamente en `.astro`
- El store de Zustand se instancia una sola vez en el cliente

```astro
<!-- Ejemplo de isla React en Astro -->
<HeroSection client:load />
<SkillsSection client:visible />
```

---

## 5. Componentes y Secciones

La página se divide en **8 contenedores/secciones** en secuencia vertical. La navegación es anclas internas (`#seccion`).

---

### 5.0 — Introducción / Text Scroll (CONTENEDOR 0)

**ID de sección:** `#intro`  
**Archivo:** `src/components/sections/IntroSection.tsx`

**Descripción:**  
Pantalla de bienvenida a pantalla completa con texto animado tipo "scroll de texto" que da paso al Contenedor 1.

**Requerimientos funcionales:**
- RF-00-01: Mostrar texto de bienvenida: *"Bienvenido a mi perfil"* con animación de aparición de letras (stagger)
- RF-00-02: Al terminar la animación o al hacer scroll, hacer transición suave al Contenedor 1
- RF-00-03: El fondo Vanta NET debe estar activo desde este contenedor

**Animación:** Framer Motion `motion.div` con `staggerChildren` + `opacity: 0 → 1` + `y: 40 → 0`

---

### 5.1 — Divisores de Sección (COMPONENTE REUTILIZABLE)

**Archivo:** `src/components/ui/SectionDivider.tsx`

**Descripción:**  
Componente reutilizable que aparece entre cada sección mostrando el nombre de la siguiente sección con animación de velocidad de scroll. El texto mostrado se obtiene del sistema i18n según el idioma activo en el store.

**Librería de animación:**

```bash
npm install framer-motion
```

Hooks utilizados de Framer Motion:
- `useScroll` — detecta posición de scroll
- `useVelocity` — deriva velocidad del scroll
- `useTransform` — mapea velocidad a factor de movimiento
- `useAnimationFrame` — actualiza la posición en cada frame
- `useMotionValue` + `wrap` — loop continuo del texto

---

**Requerimientos funcionales:**
- RF-DIV-01: Recibir prop `labelKey: string` con la clave i18n (ej: `"section.about"`, `"section.experience"`)
- RF-DIV-02: Implementar efecto **Scroll Velocity** de Framer Motion: el texto se mueve horizontalmente a velocidad proporcional al scroll del usuario
- RF-DIV-03: El texto debe repetirse en loop horizontal para efecto marquee continuo
- RF-DIV-04: Velocidad y dirección variables según velocidad de scroll del usuario
- RF-DIV-05: El texto renderizado debe leer el idioma activo desde el store de Zustand (`locale: 'es' | 'en'`) y mostrar la traducción correspondiente

---

**Props:**

```typescript
interface SectionDividerProps {
  labelKey: string;              // Clave i18n (en lugar de string directo)
  direction?: 'left' | 'right'; // Dirección base del movimiento
  baseVelocity?: number;        // Velocidad base (default: 3)
}
```

---

**Archivos i18n requeridos:**

Crear los siguientes dos archivos con las claves de los divisores:

**`src/i18n/es.json`** — fragmento relevante:
```json
{
  "section.about":      "Acerca de Mí",
  "section.experience": "Experiencia",
  "section.skills":     "Habilidades",
  "section.projects":   "Proyectos",
  "section.contact":    "Contacto",
  "section.gallery":    "Galería",
  "section.companies":  "Empresas",
  "section.references": "Referencias"
}
```

**`src/i18n/en.json`** — fragmento relevante:
```json
{
  "section.about":      "About Me",
  "section.experience": "Experience",
  "section.skills":     "Skills",
  "section.projects":   "Projects",
  "section.contact":    "Contact",
  "section.gallery":    "Gallery",
  "section.companies":  "Companies",
  "section.references": "References"
}
```

---

**Ejemplo de uso en `index.astro`:**

```astro
<SectionDivider labelKey="section.about"      direction="left"  client:visible />
<SectionDivider labelKey="section.experience" direction="right" client:visible />
<SectionDivider labelKey="section.skills"     direction="left"  client:visible />
<SectionDivider labelKey="section.projects"   direction="right" client:visible />
<SectionDivider labelKey="section.contact"    direction="left"  client:visible />
```

---

**Actualizaciones requeridas en otros archivos:**
- `src/i18n/es.json` — crear con todas las claves en español
- `src/i18n/en.json` — crear con todas las claves en inglés
- `src/store/useAppStore.ts` — debe exponer `locale: 'es' | 'en'` para que el componente lo consuma
- `src/types/index.ts` — agregar interfaz `SectionDividerProps`
### 5.2 — Hero / Presentación (CONTENEDOR 1)

**ID de sección:** `#inicio`  
**Archivo:** `src/components/sections/HeroSection.tsx`

**Descripción:**  
Sección principal de presentación. Layout de dos columnas.

**Layout:**
```
[ Columna 1 (texto)          ] [ Columna 2 (foto)  ]
  Nombre completo              Foto de perfil
  Cargo / título               (imagen local)
  Descripción / Bio
  Íconos de redes sociales
  Botón CTA "Contáctame"
```

**Requerimientos funcionales:**
- RF-01-01: Columna 1, Fila 1 — Nombre: **Ronald Isaias Preciado Bermúdez** (fuente Montserrat Bold)
- RF-01-02: Columna 1, Fila 2 — Cargo: **Ingeniero en Software** (fuente Inter, color secondary)
- RF-01-03: Columna 1, Fila 3 — Descripción breve (fuente Inter Regular, color secondary, max-width legible):

  > "Ingeniero de Software con experiencia sólida participando en la migración y desarrollo de soluciones tecnológicas. Cuento con dominio de herramientas tanto en Frontend como en Backend y gestión de bases de datos. Profesional orientado al trabajo en equipo y a la mejora continua, que busca integrarse en proyectos desafiantes con retos técnicos que impulsen mi crecimiento profesional y aporten valor estratégico a la organización."

- RF-01-04: Columna 1, Fila 4 — Íconos de redes sociales con links externos (abrir en `target="_blank"`):
  - GitHub
  - LinkedIn
  - YouTube

- RF-01-05: Columna 1, Fila 5 — Botón primario "Contáctame" que ancla a `#contacto`
- RF-01-06: Columna 2 — Foto de perfil circular con borde animado (gradiente rotatorio), fuente de imagen: `/public/images/profile.jpg`
- RF-01-07: Implementar animación **Transform scroll position to any value** con GSAP: al hacer scroll, los elementos de la columna 1 se desplazan en paralaje
- RF-01-08: Al continuar el scroll, el contenedor hace fade-out y da paso al Contenedor 2

**Animación de entrada:** Framer Motion `variants` con `staggerChildren`

```typescript
// Orden de aparición con stagger (de arriba a abajo):
// 1. Nombre        delay: 0s
// 2. Cargo         delay: 0.1s
// 3. Descripción   delay: 0.2s
// 4. Redes sociales delay: 0.3s
// 5. Botón CTA     delay: 0.4s
// 6. Foto perfil   delay: 0.2s (columna derecha, paralelo)
```

**Fuente de datos — `src/data/hero.ts`:**

```typescript
export const heroData = {
  name:     "Ronald Isaias Preciado Bermúdez",
  role:     "Ingeniero en Software",
  bio:      "Ingeniero de Software con experiencia sólida participando en la migración y desarrollo de soluciones tecnológicas. Cuento con dominio de herramientas tanto en Frontend como en Backend y gestión de bases de datos. Profesional orientado al trabajo en equipo y a la mejora continua, que busca integrarse en proyectos desafiantes con retos técnicos que impulsen mi crecimiento profesional y aporten valor estratégico a la organización.",
  ctaLabel: "Contáctame",
  ctaHref:  "#contacto",
  photo:    "/images/profile.jpg",
  social: [
    {
      label: "GitHub",
      href:  "https://github.com/TU_USUARIO",   // ← reemplazar
      icon:  "github",
    },
    {
      label: "LinkedIn",
      href:  "https://linkedin.com/in/TU_USUARIO", // ← reemplazar
      icon:  "linkedin",
    },
    {
      label: "YouTube",
      href:  "https://youtube.com/@TU_CANAL",    // ← reemplazar
      icon:  "youtube",
    },
  ],
};
```

**Actualizaciones requeridas en otros archivos:**
- `src/data/hero.ts` — crear con el objeto `heroData` exportado
- `src/types/index.ts` — agregar interfaces `HeroData` y `SocialLink`
**Animación de entrada:** Framer Motion `variants` con `staggerChildren`

```typescript
// Orden de aparición con stagger (de arriba a abajo):
// 1. Nombre        delay: 0s
// 2. Cargo         delay: 0.1s
// 3. Descripción   delay: 0.2s
// 4. Botón CTA     delay: 0.35s
// 5. Foto perfil   delay: 0.2s (columna derecha, paralelo)
```

**Texto fuente para `src/data/hero.ts`:**

```typescript
export const heroData = {
  name:     "Ronald Isaias Preciado Bermúdez",
  role:     "Ingeniero en Software",
  bio:      "Ingeniero de Software con experiencia sólida participando en la migración y desarrollo de soluciones tecnológicas. Cuento con dominio de herramientas tanto en Frontend como en Backend y gestión de bases de datos. Profesional orientado al trabajo en equipo y a la mejora continua, que busca integrarse en proyectos desafiantes con retos técnicos que impulsen mi crecimiento profesional y aporten valor estratégico a la organización.",
  ctaLabel: "Contáctame",
  ctaHref:  "#contacto",
  photo:    "/images/profile.jpg",
};
```

**Actualizaciones requeridas en otros archivos:**
- `src/data/hero.ts` — crear con el objeto `heroData` exportado
- `src/types/index.ts` — agregar interfaz `HeroData`

---

### 5.3 — Marquee de Logos / Empresas (SECCIÓN)

**ID de sección:** `#empresas`  
**Archivo:** `src/components/sections/LogoMarquee.tsx`

**Descripción:**  
Scroll horizontal infinito con logotipos de empresas/tecnologías.

**Requerimientos funcionales:**
- RF-07-01: Implementar **Infinite Horizontal Scroll Marquee** con CSS animation o Framer Motion
- RF-07-02: Fuente de logos: `/public/images/logos/` (archivos PNG)
- RF-07-03: Dos filas: una moviéndose hacia la izquierda y otra hacia la derecha
- RF-07-04: Pausa en hover sobre el marquee
- RF-07-05: Los logos deben tener filtro de escala de grises en reposo y color en hover

---

----

### 5.4 — Proyectos / Scroll Horizontal (CONTENEDOR 2 + 3)

**ID de sección:** `#proyectos`  
**Archivo:** `src/components/sections/ProjectsSection.tsx`

**Descripción:**  
El Contenedor 2 actúa como transición de ocultamiento del Hero. El Contenedor 3 implementa un **scroll horizontal** que muestra tarjetas de proyectos.

**Requerimientos funcionales:**
- RF-02-01: Al llegar a esta sección, el Contenedor 1 debe ocultarse con efecto de "push hacia arriba" (GSAP ScrollTrigger `scrub`)
- RF-03-01: Implementar **Horizontal Scroll Section** con GSAP: la sección queda "pinned" y el scroll vertical mueve las tarjetas horizontalmente
- RF-03-02: Mostrar mínimo **4 tarjetas de proyecto** con la siguiente estructura por tarjeta:

- Solo dejame las tarjetas para poner el titulo , descripcion y link porque aun no tengo proyectos 

```typescript
interface ProjectCard {
  title: string;
  description: string;
  techStack: string[];   // Array de tecnologías (JetBrains Mono)
  imageUrl: string;      // /public/images/projects/
  liveUrl?: string;
  repoUrl?: string;
  status: 'online' | 'down' | 'pending'; // Usa colores semánticos
}
```

- RF-03-03: Cada tarjeta tiene indicador de estado con colores semánticos (`--color-success/error/warning`)
- RF-03-04: Hover effect con Framer Motion `whileHover` (escala + sombra)

---
### 5.5 — Habilidades Técnicas / Skills Grid (CONTENEDOR 4)

**ID de sección:** `#habilidades`  
**Archivo:** `src/components/sections/GallerySection.tsx`

**Descripción:**  
Sección que presenta las habilidades técnicas agrupadas en 6 tarjetas temáticas con animaciones scroll-triggered. Reemplaza la galería de imágenes original.

**Requerimientos funcionales:**
- RF-04-01: Grid responsivo de tarjetas (1 col mobile, 2 col tablet, 3 col desktop)
- RF-04-02: Cada tarjeta entra con animación `whileInView` de Framer Motion en cascada (stagger 0.15s)
- RF-04-03: Efecto hover con elevación (`scale: 1.02`) y borde con color de acento de la tarjeta
- RF-04-04: Cada tarjeta tiene un color de acento izquierdo (borde `border-l-4`) según su categoría

**Fuente de datos:** `src/data/skills.ts`

**Estructura de datos:**

```typescript
interface SkillCard {
  id: number;
  title: string;
  accentColor: string;   // color hex o clase Tailwind
  icon: string;          // emoji o nombre de ícono
  items: {
    category: string;
    skills: string[];    // JetBrains Mono
  }[];
}
```

**Datos de las 6 tarjetas:**

```typescript
export const skillCards: SkillCard[] = [
  {
    id: 1,
    title: "Lenguajes & Core",
    accentColor: "#3B82F6",
    icon: "🔷",
    items: [
      { category: "Lenguajes", skills: ["C#", "Java", "JavaScript", "TypeScript"] },
      { category: "Entornos de Ejecución", skills: ["Node.js"] },
    ]
  },
  {
    id: 2,
    title: "Frameworks & Librerías (Backend)",
    accentColor: "#F97316",
    icon: "🔶",
    items: [
      { category: "Ecosistema .NET", skills: [".NET 6/Core", "Entity Framework"] },
      { category: "Ecosistema Java",  skills: ["Spring Boot"] },
      { category: "Ecosistema Node",  skills: ["NestJS"] },
      { category: "API Querying",     skills: ["PostGraphile", "API REST"] },
    ]
  },
  {
    id: 3,
    title: "Frontend & UI",
    accentColor: "#A855F7",
    icon: "🟣",
    items: [
      { category: "Frameworks / Librerías", skills: ["React.js", "Next.js", "Angular"] },
      { category: "Arquitectura Web",       skills: ["Microfrontends"] },
    ]
  },
  {
    id: 4,
    title: "Arquitectura & Patrones",
    accentColor: "#EAB308",
    icon: "🟡",
    items: [
      { category: "Estructura",    skills: ["Microservicios"] },
      { category: "Principios",    skills: ["SOLID", "Patrones de Diseño"] },
      { category: "Metodologías",  skills: ["Scrum (Agile)"] },
    ]
  },
  {
    id: 5,
    title: "Bases de Datos & Optimización",
    accentColor: "#10B981",
    icon: "🟢",
    items: [
      { category: "Relacionales",    skills: ["SQL Server", "PostgreSQL", "MySQL"] },
      { category: "Especialización", skills: ["Query Tuning"] },
    ]
  },
  {
    id: 6,
    title: "Infraestructura & Herramientas",
    accentColor: "#94A3B8",
    icon: "⚙️",
    items: [
      { category: "Contenedores",         skills: ["Docker"] },
      { category: "Control de Versiones", skills: ["Git"] },
    ]
  },
];
```

**Animación de entrada (Framer Motion):**

```typescript
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.15 }}
viewport={{ once: true, margin: '-40px' }}
whileHover={{ scale: 1.02 }}
```

**Actualizaciones requeridas:**
- `src/data/skills.ts` — crear archivo con el array `skillCards` exportado
- `src/types/index.ts` — agregar interfaz `SkillCard`

### 5.6 — Experiencia / Timeline (CONTENEDOR 5)

**ID de sección:** `#experiencia`  
**Archivo:** `src/components/sections/ExperienceSection.tsx`

**Descripción:**  
Línea de tiempo vertical animada con GSAP + ScrollTrigger que representa la trayectoria profesional. Replica la técnica SVG de stroke-dashoffset: el path se "dibuja" conforme el usuario hace scroll, y cada nodo de experiencia aparece al llegar a su posición.

**Requerimientos funcionales:**
- RF-05-01: Renderizar un SVG de línea de tiempo vertical con path curvo (viewBox dinámico según número de nodos)
- RF-05-02: Implementar efecto `stroke-dashoffset` para dibujar el path con scroll — GSAP ScrollTrigger `scrub: true`
- RF-05-03: Cada nodo representa una experiencia laboral; se posiciona alternando izquierda/derecha del path
- RF-05-04: Los nodos (círculos SVG) pasan de `visibility: hidden` a `visibility: visible` al alcanzar su `svgY`
- RF-05-05: Las tarjetas de texto (año, cargo, empresa, descripción, techStack) aparecen con `opacity: 0 → 1` al activarse su nodo
- RF-05-06: El componente lee los datos desde `src/data/experience.ts`

---

**Interfaz TypeScript:**

```typescript
// src/types/index.ts
interface TimelineNode {
  year: string;         // Período visible en la tarjeta
  role: string;         // Cargo / título del puesto
  company: string;      // Nombre de la empresa
  location: string;     // Ciudad / región
  description: string;  // Descripción del rol
  techStack: string[];  // Tecnologías usadas (JetBrains Mono)
  svgX: number;         // Coordenada X del nodo en el SVG
  svgY: number;         // Coordenada Y del nodo en el SVG
  side: 'left' | 'right'; // Lado donde aparece la tarjeta de texto
}
```

---

**Datos reales — `src/data/experience.ts`:**

```typescript
import type { TimelineNode } from '@/types';

export const experienceNodes: TimelineNode[] = [
  {
    year: "Ago 2025 – Presente",
    role: "Desarrollador Full Stack",
    company: "Sudamericana de Software",
    location: "Guayas",
    description:
      "Desarrollo de migración de portales .NET MVC hacia una arquitectura moderna de Microfrontends (React.js) y Microservicios (.NET 6). Gestión de bases de datos en SQL Server y creación de Stored Procedures.",
    techStack: [".NET 6", "React.js", "Microfrontends", "SQL Server", "Stored Procedures"],
    svgX: 380,
    svgY: 120,
    side: "right",
  },
  {
    year: "Dic 2024 – Jun 2025",
    role: "Desarrollador Full Stack",
    company: "Sudamericana de Software",
    location: "Guayas",
    description:
      "PPI Pharmacys: Desarrollo de funcionalidades en aplicativo de farmacias con React.js y PostGraphile. Diseño de funciones en PostgreSQL para el consumo en vista y optimización de consultas.",
    techStack: ["React.js", "PostGraphile", "PostgreSQL", "Query Tuning"],
    svgX: 220,
    svgY: 380,
    side: "left",
  },
  {
    year: "Jun 2024 – Dic 2024",
    role: "Desarrollador Full Stack",
    company: "Sudamericana de Software",
    location: "Guayas",
    description:
      "Desarrollo de funcionalidades Full Stack para gestión de suscripciones con Next.js y PostGraphile. Migración hacia arquitectura de microservicios con Spring Boot, mejorando escalabilidad y mantenimiento. Gestión de bases de datos en SQL Server.",
    techStack: ["Next.js", "PostGraphile", "Spring Boot", ".NET 6", "SQL Server", "Microservicios"],
    svgX: 420,
    svgY: 640,
    side: "right",
  },
  {
    year: "Mar 2024 – Jun 2024",
    role: "Desarrollador Backend",
    company: "Sudamericana de Software",
    location: "Guayas",
    description:
      "Desarrollo de endpoints en NestJS para gestión, asignación y consulta de vacaciones de colaboradores internos. Modificación de consultas e implementación de Pipes para validaciones.",
    techStack: ["NestJS", "TypeScript", "Pipes", "REST API"],
    svgX: 200,
    svgY: 900,
    side: "left",
  },
  {
    year: "Dic 2023 – Feb 2024",
    role: "Desarrollador Frontend",
    company: "Sudamericana de Software",
    location: "Guayas",
    description:
      "SASF Facturación: Participación en aplicativo de facturación electrónica. Desarrollo de vistas en módulo de impuestos, proveedores y generación de facturas.",
    techStack: ["Angular 15", "TypeScript", "Facturación Electrónica"],
    svgX: 370,
    svgY: 1160,
    side: "right",
  },
];
```

---

**Lógica de animación GSAP — patrón de implementación:**

```typescript
// src/components/sections/ExperienceSection.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceNodes } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    // 1. Calcular longitud total del path
    const totalLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    // 2. Animar el dibujo del path con el scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    // 3. Animar cada nodo y su tarjeta al llegar a su svgY
    experienceNodes.forEach((node, i) => {
      const nodeEl = document.querySelector(`.timeline-node-${i}`);
      const cardEl = document.querySelector(`.timeline-card-${i}`);
      const progress = node.svgY / 1300; // normalizar contra el viewBox height

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `${progress * 80}% center`,
        onEnter: () => {
          gsap.to(nodeEl, { visibility: 'visible', scale: 1.2, duration: 0.3 });
          gsap.to(cardEl, { opacity: 1, y: 0, duration: 0.4, delay: 0.15 });
        },
      });

      // Estado inicial de las tarjetas
      gsap.set(cardEl, { opacity: 0, y: 20 });
    });

  }, { scope: sectionRef });

  // ...JSX con SVG + tarjetas
}
```

---

**Estructura del SVG (viewBox y path de referencia):**

```
viewBox: "0 0 600 1350"

Path curvo que atraviesa los 5 nodos de arriba a abajo,
alternando entre x≈200 (izquierda) y x≈400 (derecha)
para crear efecto serpentino visual.

Nodos SVG: círculos <circle> con clase .timeline-node-{i}
Tarjetas HTML: <foreignObject> o divs absolutos con clase .timeline-card-{i}
```

---

**Actualizaciones requeridas en otros archivos:**
- `src/data/experience.ts` — crear con el array `experienceNodes` exportado
- `src/types/index.ts` — agregar interfaz `TimelineNode`
- `src/pages/index.astro` — montar con `<ExperienceSection client:visible />`



### 5.7 — Testimonios / Referencias (SECCIÓN)

**ID de sección:** `#testimonios`  
**Archivo:** `src/components/sections/TestimonialsSection.tsx`

**Descripción:**  
Sección de tarjetas de testimoniales con layout de grid.

**Requerimientos funcionales:**
- RF-08-01: Renderizar exactamente **5 tarjetas de testimonio**
- RF-08-02: Estructura de datos por tarjeta:

```typescript
interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;      // URL de imagen
  quote: string;       // Texto del testimonio
  rating: number;      // 1-5 estrellas
}
```

- RF-08-03: Diseño de tarjeta con estilo Tailwind CSS (card oscura/clara según tema)
- RF-08-04: Animación de entrada `whileInView` con Framer Motion

---

### 5.8 — Formulario de Contacto (SECCIÓN)

**ID de sección:** `#contacto`  
**Archivo:** `src/components/sections/ContactSection.tsx`

**Descripción:**  
Formulario de contacto completo con validación, integración EmailJS y textos legales.

**Requerimientos funcionales:**
- RF-09-01: Campos del formulario:
  - `name` — Nombre completo (requerido, min 2 chars)
  - `email` — Correo electrónico (requerido, formato válido)
  - `subject` — Asunto (requerido, min 5 chars)
  - `message` — Mensaje (requerido, min 20 chars)
  - `consent` — Checkbox de consentimiento (requerido = true)

- RF-09-02: Texto del checkbox de consentimiento:  
  *"Acepto el uso de cookies y el procesamiento de los datos ingresados según se describe en la Política de Cookies y Política de Privacidad."*

- RF-09-03: Texto legal bajo el formulario:  
  *"Este sitio está protegido por reCAPTCHA y aplican la Política de Privacidad y los Términos de Servicio de Google."*

- RF-09-04: Integración con **EmailJS**: usar `@emailjs/browser` con variables de entorno:
  ```
  PUBLIC_EMAILJS_SERVICE_ID=
  PUBLIC_EMAILJS_TEMPLATE_ID=
  PUBLIC_EMAILJS_PUBLIC_KEY=
  ```

- RF-09-05: El botón de envío debe estar **deshabilitado** si el checkbox `consent` no está marcado

- RF-09-06: Estados del formulario gestionados con **State Reducer pattern** (Zustand):
  - `idle` → `submitting` → `success` | `error`

- RF-09-07: Mostrar feedback visual por estado:
  - `submitting`: spinner + texto "Enviando..."
  - `success`: mensaje en color `--color-success`
  - `error`: mensaje en color `--color-error`

---

### 5.9 — Footer

**Archivo:** `src/components/layout/Footer.astro`

**Requerimientos funcionales:**
- RF-10-01: Mostrar texto: *"© 2025 Ronald Preciado. Todos los derechos reservados."*
- RF-10-02: Links a redes sociales (LinkedIn, GitHub)
- RF-10-03: Link de retorno a `#inicio`

---

## 6. Animaciones y Efectos

### 6.1 Fondo Vanta.js

**Archivo:** `src/components/ui/VantaBackground.tsx`

```typescript
// Requerimientos técnicos:
// - Inicializar VANTA.NET() en useEffect con cleanup
// - Escuchar cambios del store de Zustand (isDark)
// - Modo oscuro: color: 0x0F172A, color2: 0x1E293B, points azules
// - Modo claro: color: 0xF1F5F9, color2: 0xFFFFFF, points grises
// - Destruir y reinicializar al cambiar de tema
```

### 6.2 Tabla de Animaciones

| Efecto | Tecnología | Sección | Trigger |
|---|---|---|---|
| Text scroll bienvenida | Framer Motion `staggerChildren` | Intro | `onMount` |
| Scroll velocity (divisores) | Framer Motion `useVelocity` | Divisores | `useScroll` |
| Paralaje Hero | GSAP ScrollTrigger | Hero | scroll |
| Fade-out Hero | GSAP ScrollTrigger `scrub` | Hero → Proyectos | scroll |
| Scroll horizontal proyectos | GSAP ScrollTrigger `pin` | Proyectos | scroll |
| SVG stroke-dashoffset | GSAP ScrollTrigger `scrub` | Experiencia | scroll |
| Nodos timeline | GSAP ScrollTrigger | Experiencia | scroll |
| Cards skills entrada | Framer Motion `whileInView` | Skills | viewport |
| Barras de progreso skills | GSAP | Skills | viewport |
| Marquee logos | CSS animation / Framer Motion | Empresas | continuo |
| Cards testimonios | Framer Motion `whileInView` | Testimonios | viewport |
| Hover cards proyectos | Framer Motion `whileHover` | Proyectos | hover |

### 6.3 GSAP ScrollTrigger — Patrón Base

```typescript
// Patrón estándar para todos los efectos GSAP en React
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.to(elementRef.current, {
    // propiedades animadas
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,  // Para animaciones ligadas al scroll
      // markers: true, // Solo en desarrollo
    }
  });
}, { scope: sectionRef });
```

### 6.4 Framer Motion — Patrón Base whileInView

```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

// Uso:
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-50px' }}
  custom={index}
/>
```

---

## 7. Gestión de Estado

### 7.1 Zustand Store

**Archivo:** `src/store/useAppStore.ts`

```typescript
interface AppState {
  // Tema
  isDark: boolean;
  toggleTheme: () => void;

  // Navegación
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Formulario de contacto
  formStatus: 'idle' | 'submitting' | 'success' | 'error';
  setFormStatus: (status: AppState['formStatus']) => void;
  
  // Menú móvil
  isMenuOpen: boolean;
  toggleMenu: () => void;
}
```

### 7.2 Persistencia de Tema
- Guardar preferencia de tema en `localStorage`
- Respetar preferencia del sistema con `prefers-color-scheme` como valor inicial

---

## 8. Formulario de Contacto

### 8.1 Esquema de Validación (Zod)

```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name:    z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email:   z.string().email('Correo electrónico inválido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la política de privacidad' })
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### 8.2 Integración EmailJS

```typescript
import emailjs from '@emailjs/browser';

const sendEmail = async (data: ContactFormData) => {
  await emailjs.send(
    import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
    import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
    {
      from_name:    data.name,
      from_email:   data.email,
      subject:      data.subject,
      message:      data.message,
    },
    import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
  );
};
```

---

## 9. Internacionalización

- **Idioma por defecto:** Español
- Todos los textos de UI deben estar en español
- No se requiere sistema de i18n dinámico (idioma único)
- Los atributos `lang` del HTML deben ser `lang="es"`

### 9.1 Textos Clave

| Clave | Texto |
|---|---|
| nav.skills | Habilidades |
| nav.experience | Experiencia |
| nav.contact | Contacto |
| nav.projects | Proyectos |
| hero.role | Ingeniero en Software |
| hero.cta | Contáctame |
| contact.title | Contáctame |
| contact.name | Nombre completo |
| contact.email | Correo electrónico |
| contact.subject | Asunto |
| contact.message | Mensaje |
| contact.submit | Enviar mensaje |
| contact.sending | Enviando... |
| contact.success | ¡Mensaje enviado correctamente! |
| contact.error | Error al enviar. Intenta de nuevo. |
| footer.rights | © 2025 Ronald Preciado. Todos los derechos reservados. |

---

## 10. Requerimientos No Funcionales

### 10.1 Performance
- RNF-01: Lighthouse Performance score ≥ 85
- RNF-02: Las animaciones deben correr a 60fps (usar `will-change`, `transform`, `opacity`)
- RNF-03: Lazy loading en imágenes (`loading="lazy"`)
- RNF-04: El bundle de GSAP debe importarse solo donde se use (tree-shaking)

### 10.2 Accesibilidad
- RNF-05: `prefers-reduced-motion` debe desactivar animaciones no esenciales
- RNF-06: Contraste de texto mínimo WCAG AA
- RNF-07: Navegación por teclado funcional en el menú y formulario

### 10.3 Responsividad
- RNF-08: Diseño completamente funcional en 320px (mobile mínimo)
- RNF-09: El scroll horizontal de proyectos debe convertirse en scroll vertical en mobile
- RNF-10: El timeline SVG debe escalar correctamente en todos los breakpoints

### 10.4 SEO
- RNF-11: Meta tags Open Graph y Twitter Card configurados en `BaseLayout.astro`
- RNF-12: Título de página: *"Ronald Preciado — Ingeniero en Software"*

---

## 11. Estructura de Archivos

```
/
├── public/
│   ├── images/
│   │   ├── profile.jpg           ← Foto de perfil del héroe
│   │   ├── projects/             ← Imágenes de proyectos
│   │   ├── gallery/              ← Imágenes de galería
│   │   └── logos/                ← Logos PNG para el marquee
│   └── lottie/
│       └── developer.json        ← Animación Lottie del menú
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        ← Menú principal (Lottie + Nav links)
│   │   │   └── Footer.astro
│   │   ├── sections/
│   │   │   ├── IntroSection.tsx       ← Contenedor 0
│   │   │   ├── HeroSection.tsx        ← Contenedor 1
│   │   │   ├── ProjectsSection.tsx    ← Contenedor 2 + 3
│   │   │   ├── GallerySection.tsx     ← Contenedor 4
│   │   │   ├── ExperienceSection.tsx  ← Contenedor 5 (Timeline SVG)
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── LogoMarquee.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── VantaBackground.tsx
│   │       ├── SectionDivider.tsx
│   │       ├── Button.tsx          ← Variantes con CVA (Extensive Style)
│   │       ├── Card.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── store/
│   │   └── useAppStore.ts         ← Zustand store global
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts  ← Hook GSAP reutilizable
│   │   └── useTheme.ts
│   │
│   ├── styles/
│   │   └── global.css             ← Variables CSS + fuentes
│   │
│   ├── types/
│   │   └── index.ts               ← Interfaces globales (ProjectCard, TimelineNode, etc.)
│   │
│   ├── data/
│   │   ├── projects.ts            ← Datos de proyectos
│   │   ├── experience.ts          ← Datos de experiencia / timeline
│   │   ├── skills.ts              ← Datos de habilidades
│   │   └── testimonials.ts        ← Datos de testimonios
│   │
│   └── pages/
│       └── index.astro            ← Página principal (importa todas las secciones)
│
├── .env                           ← Variables de entorno EmailJS
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 12. Convenciones de Código

### 12.1 Nombrado
- Componentes React: `PascalCase` (ej: `HeroSection.tsx`)
- Hooks: `camelCase` con prefijo `use` (ej: `useScrollAnimation.ts`)
- Stores: `camelCase` con prefijo `use` (ej: `useAppStore.ts`)
- Archivos de datos: `camelCase` (ej: `projects.ts`)
- CSS variables: `kebab-case` con prefijo `--color-` o `--font-`

### 12.2 Imports
- Paths con alias `@/` apuntando a `src/`
- Configurar en `tsconfig.json`:
  ```json
  { "paths": { "@/*": ["./src/*"] } }
  ```

### 12.3 Variables de Entorno
- Prefijo `PUBLIC_` para variables accesibles en el cliente (requerimiento de Astro)
- Nunca commitear el archivo `.env`; incluir `.env.example` en el repo

### 12.4 Acceso a Datos
- Todos los datos estáticos (proyectos, skills, etc.) deben estar en `/src/data/`
- No hardcodear datos en los componentes
- Usar TypeScript interfaces definidas en `/src/types/index.ts`

---

*Documento generado como especificación técnica SDD para implementación automatizada.*  
*Versión 1.0.0 — Portfolio Ronald Isaias Preciado Bermúdez*
