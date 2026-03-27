# Especificaciones de Mejoras — Portfolio Ronald Preciado
**Versión:** 2.0.0  
**Fecha:** 2025  
**Destino:** Agente / Modelo LLM para implementación automatizada

---

## Tabla de Contenidos

1. [Skeleton Loading — Todos los Componentes](#1-skeleton-loading--todos-los-componentes)
2. [Sección de Proyectos — Horizontal Scroll Inmersivo](#2-sección-de-proyectos--horizontal-scroll-inmersivo)
3. [Sección de Skills — Rediseño de Tarjetas en 2 Columnas](#3-sección-de-skills--rediseño-de-tarjetas-en-2-columnas)
4. [Footer — Iconos PNG en lugar de texto](#4-footer--iconos-png-en-lugar-de-texto)
5. [Eliminar Funcionalidad Dark/Light Mode](#5-eliminar-funcionalidad-darklight-mode)
6. [Internacionalización Global (i18n)](#6-internacionalización-global-i18n)
7. [Lenguaje de Proyectos — Verbos en Tiempo Correcto](#7-lenguaje-de-proyectos--verbos-en-tiempo-correcto)

---

## 1. Skeleton Loading — Todos los Componentes

### Objetivo
Implementar un skeleton de carga en **todos los componentes y secciones** de la página, que se muestre mientras el contenido no ha terminado de renderizarse.

### Requerimientos

- RF-SK-01: Cada sección debe mostrar un skeleton placeholder mientras carga: `HeroSection`, `ProjectsSection`, `SkillsSection`, `ExperienceSection`, `TestimonialsSection`, `ContactSection`, `LogoMarquee`, `Navbar`.
- RF-SK-02: El skeleton debe replicar la forma aproximada del contenido real (mismo alto, mismo layout de columnas/tarjetas).
- RF-SK-03: Usar animación de pulso (`animate-pulse` de Tailwind) en todos los skeletons.
- RF-SK-04: El skeleton debe desaparecer únicamente cuando el componente ha terminado su render completo y los datos están disponibles.
- RF-SK-05: Implementar un componente reutilizable `SkeletonCard` y `SkeletonText` para no duplicar código.

### Estructura sugerida del componente skeleton

```tsx
// src/components/ui/Skeleton.tsx
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-card rounded-xl ${className}`} />
  )
}

export function SkeletonText({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
  return (
    <div className={`animate-pulse bg-secondary/30 rounded ${width} ${height}`} />
  )
}
```

### Skeleton por sección

| Sección | Forma del skeleton |
|---|---|
| Hero | 2 columnas: bloque de texto izquierda + círculo derecha |
| Projects | Fila de 3 rectángulos del tamaño de las tarjetas |
| Skills | Grid de 6 rectángulos del tamaño de las tarjetas |
| Experience | Línea vertical central + 5 bloques alternados |
| Testimonials | Fila de tarjetas rectangulares |
| Contact | Bloques de inputs apilados verticalmente |
| Navbar | Barra horizontal con puntos |

---

## 2. Sección de Proyectos — Horizontal Scroll Inmersivo

**ID de sección:** `#proyectos`  
**Archivo:** `src/components/sections/ProjectsSection.tsx`

### Objetivo
Cambiar la navegación vertical por un desplazamiento horizontal inmersivo.

### Requerimientos

- RF-PROJ-01: Al llegar a la sección de Proyectos, el scroll vertical del ratón debe desplazar el contenido de **derecha a izquierda**.
- RF-PROJ-02: Usar **GSAP ScrollTrigger** con `pin: true` sobre el contenedor principal.
- RF-PROJ-03: Animar el `xPercent` de la fila de proyectos hacia `-100%` (o el valor necesario para mostrar todas las tarjetas).
- RF-PROJ-04: Los proyectos deben deslizarse lateralmente mientras la sección permanece **fija en el viewport**.
- RF-PROJ-05: Mostrar exactamente **3 tarjetas visibles** por vez, con espacio generoso entre ellas (`gap-8` o `gap-10`).
- RF-PROJ-06: Cada tarjeta debe tener un ancho fijo proporcional: `w-[30vw]` en desktop, `w-[80vw]` en mobile.
- RF-PROJ-07: Mostrar **skeleton de 3 tarjetas** mientras carga la sección (ver sección 1).
- RF-PROJ-08: En mobile, reemplazar el scroll horizontal con pin por un **scroll vertical normal** de tarjetas apiladas.

### Implementación GSAP sugerida

```tsx
useEffect(() => {
  const initGSAP = async () => {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const totalWidth = track.scrollWidth - section.offsetWidth

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })
  }

  initGSAP()
}, [])
```

### Estructura JSX sugerida

```tsx
<section ref={sectionRef} id="proyectos" className="overflow-hidden">
  <div ref={trackRef} className="flex gap-10 px-16 items-center h-screen">
    {projects.map((project) => (
      <ProjectCard key={project.id} {...project} className="w-[30vw] flex-shrink-0" />
    ))}
  </div>
</section>
```

---

## 3. Sección de Skills — Rediseño de Tarjetas en 2 Columnas

**ID de sección:** `#habilidades`  
**Archivo:** `src/components/sections/GallerySection.tsx` (o `SkillsSection.tsx`)

### Objetivo
Rediseñar cada tarjeta de skill para que internamente esté dividida en **2 columnas**: una con el nombre de la categoría/framework y otra con las skills individuales. Las tarjetas deben ser más compactas y con el espacio bien distribuido.

### Requerimientos

- RF-SK-01: Cada tarjeta tiene layout interno de **2 columnas**:
  - **Columna izquierda:** Ícono + nombre del grupo/categoría (ej: "Frontend & UI", "Backend")
  - **Columna derecha:** Lista de skills individuales en `JetBrains Mono`, separadas con buen espaciado
- RF-SK-02: Las tarjetas deben ser **más pequeñas** que el diseño actual — altura compacta, sin exceso de padding.
- RF-SK-03: El espacio entre el nombre de la categoría y las skills debe estar bien distribuido visualmente.
- RF-SK-04: Mantener el `border-l-4` con el color de acento de cada tarjeta (ya definido en `skillCards`).
- RF-SK-05: Mantener el efecto hover `scale: 1.02` y animación `whileInView` de Framer Motion.
- RF-SK-06: Mostrar **skeleton de 6 tarjetas** mientras carga la sección (ver sección 1).

### Estructura JSX sugerida por tarjeta

```tsx
<motion.div
  className={`bg-card rounded-lg border-l-4 p-4 flex gap-4 items-start`}
  style={{ borderColor: card.accentColor }}
  whileHover={{ scale: 1.02 }}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.15 }}
  viewport={{ once: true }}
>
  {/* Columna izquierda */}
  <div className="flex flex-col items-center gap-2 min-w-[80px]">
    <span className="text-2xl">{card.icon}</span>
    <span className="text-xs font-semibold text-center text-primary font-montserrat leading-tight">
      {card.title}
    </span>
  </div>

  {/* Divisor vertical */}
  <div className="w-px bg-secondary/30 self-stretch" />

  {/* Columna derecha */}
  <div className="flex flex-col gap-1 flex-1">
    {card.items.map((group) => (
      <div key={group.category}>
        <span className="text-[10px] uppercase text-secondary tracking-widest">{group.category}</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {group.skills.map((skill) => (
            <span key={skill} className="font-mono text-xs bg-bg px-2 py-0.5 rounded text-primary">
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</motion.div>
```

---

## 4. Footer — Iconos PNG en lugar de texto

**Archivo:** `src/components/layout/Footer.astro`

### Objetivo
Reemplazar los textos de redes sociales (LinkedIn, GitHub, Email) por los iconos PNG ubicados en `src/icon/`.

### Requerimientos

- RF-FOOT-01: Usar los archivos PNG de la carpeta `src/icon/` para GitHub, LinkedIn y Email.
- RF-FOOT-02: Los iconos deben tener tamaño fijo de `24x24px` o `32x32px`.
- RF-FOOT-03: Cada ícono debe ser un enlace (`<a>`) con `target="_blank"` y `aria-label` descriptivo para accesibilidad.
- RF-FOOT-04: Efecto hover: `opacity-70` o filtro de brillo sobre el ícono.
- RF-FOOT-05: No mostrar texto junto al ícono — solo el PNG.

### Estructura sugerida

```astro
<footer class="py-8 bg-card border-t border-secondary/20">
  <div class="container mx-auto px-4 flex flex-col items-center gap-4">
    <div class="flex gap-6 items-center">
      <a href="https://github.com/TU_USUARIO" target="_blank" aria-label="GitHub">
        <img src="/icon/github.png" alt="GitHub" class="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />
      </a>
      <a href="https://linkedin.com/in/TU_USUARIO" target="_blank" aria-label="LinkedIn">
        <img src="/icon/linkedin.png" alt="LinkedIn" class="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />
      </a>
      <a href="mailto:TU_EMAIL" aria-label="Email">
        <img src="/icon/email.png" alt="Email" class="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />
      </a>
    </div>
    <p class="text-secondary text-sm">© 2025 Ronald Preciado. Todos los derechos reservados.</p>
  </div>
</footer>
```

> **Nota:** Mover los archivos PNG de `src/icon/` a `public/icon/` para que Astro pueda servirlos como assets estáticos.

---

## 5. Eliminar Funcionalidad Dark/Light Mode

### Objetivo
Remover completamente el toggle de tema oscuro/claro. La página debe quedar **fija en modo oscuro** como diseño único.

### Requerimientos

- RF-THEME-01: Eliminar el componente `ThemeToggle.tsx`.
- RF-THEME-02: Eliminar `isDark`, `toggleTheme` del store de Zustand (`useAppStore.ts`).
- RF-THEME-03: Fijar el HTML con la clase `dark` de forma permanente en `BaseLayout.astro` o `index.astro`:
  ```html
  <html lang="es" class="dark">
  ```
- RF-THEME-04: Eliminar toda lógica condicional basada en `isDark` en todos los componentes (incluyendo `VantaBackground.tsx`).
- RF-THEME-05: En `VantaBackground.tsx`, dejar solo la configuración de modo oscuro hardcodeada:
  ```ts
  color: 0x3b82f6,
  backgroundColor: 0x0f172a,
  ```
- RF-THEME-06: Eliminar el listener de `prefers-color-scheme` y la persistencia de tema en `localStorage`.
- RF-THEME-07: Eliminar el import y uso de `useTheme.ts` en todos los componentes donde aparezca.

---

## 6. Internacionalización Global (i18n)

### Objetivo
Que **todos los textos visibles de la página** cambien de idioma en conjunto al cambiar entre Español e Inglés. Actualmente solo cambia el texto de bienvenida.

### Problema actual
Solo el componente `IntroSection` responde al cambio de idioma. El resto de secciones tienen los textos hardcodeados.

### Requerimientos

- RF-I18N-01: Todos los textos de la UI deben leerse desde los archivos `src/i18n/es.json` y `src/i18n/en.json`.
- RF-I18N-02: Ningún texto visible debe estar hardcodeado en los componentes — todo debe pasar por el sistema i18n.
- RF-I18N-03: El selector de idioma (ya existente en el store) debe disparar un re-render global de todos los textos.
- RF-I18N-04: Cubrir **todos** los textos de las siguientes secciones:

| Sección | Textos a internacionalizar |
|---|---|
| Navbar | Links de navegación |
| Hero | Nombre, cargo, bio, botón CTA |
| Projects | Título de sección, labels de tarjetas, botones "Ver Demo" / "Ver Repo" |
| Skills | Título de sección, nombres de categorías, labels de grupos |
| Experience | Título de sección, roles, descripciones |
| Testimonials | Título de sección, quotes |
| Contact | Título, labels de campos, placeholder, botón, mensajes de estado, texto legal |
| Footer | Copyright |

### Claves i18n a agregar en `es.json` y `en.json`

```json
{
  "nav.home": "Inicio",
  "nav.skills": "Habilidades",
  "nav.experience": "Experiencia",
  "nav.projects": "Proyectos",
  "nav.contact": "Contacto",
  "hero.name": "Ronald Isaias Preciado Bermúdez",
  "hero.role": "Ingeniero en Software",
  "hero.bio": "Ingeniero de Software con experiencia sólida...",
  "hero.cta": "Contáctame",
  "projects.title": "Proyectos",
  "projects.demo": "Ver Demo",
  "projects.repo": "Ver Repositorio",
  "projects.status.online": "En línea",
  "projects.status.pending": "Pendiente",
  "projects.status.down": "No disponible",
  "skills.title": "Habilidades Técnicas",
  "experience.title": "Experiencia Profesional",
  "testimonials.title": "Referencias",
  "contact.title": "Contáctame",
  "contact.name": "Nombre completo",
  "contact.email": "Correo electrónico",
  "contact.subject": "Asunto",
  "contact.message": "Mensaje",
  "contact.submit": "Enviar mensaje",
  "contact.sending": "Enviando...",
  "contact.success": "¡Mensaje enviado correctamente!",
  "contact.error": "Error al enviar. Intenta de nuevo.",
  "contact.consent": "Acepto el uso de cookies y el procesamiento de los datos.",
  "contact.legal": "Este sitio está protegido por reCAPTCHA.",
  "footer.rights": "© 2025 Ronald Preciado. Todos los derechos reservados."
}
```

---

## 7. Lenguaje de Proyectos — Verbos en Tiempo Correcto

### Objetivo
Usar buenas prácticas de escritura profesional en inglés en las descripciones de proyectos y experiencia:

- **Proyectos / experiencias pasadas (años anteriores):** usar verbos en **pasado simple** (Built, Developed, Implemented, Migrated, Designed, Created, Optimized).
- **Proyecto / experiencia actual (presente):** usar verbos en **presente continuo o simple** (Building, Developing, Leading, Managing, Implementing).

### Ejemplos

| Contexto | ❌ Incorrecto | ✅ Correcto |
|---|---|---|
| Proyecto pasado | "Develop features for..." | "Developed features for..." |
| Proyecto pasado | "Implement endpoints in..." | "Implemented endpoints in..." |
| Proyecto actual | "Developed the migration of..." | "Leading the migration of..." |
| Proyecto actual | "Built features for..." | "Building features for..." |

### Requerimientos

- RF-LANG-01: Revisar y corregir todas las descripciones en `src/data/experience.ts`.
- RF-LANG-02: Revisar y corregir todas las descripciones en `src/data/projects.ts`.
- RF-LANG-03: La experiencia con fecha **"Ago 2025 – Presente"** debe usar verbos en presente.
- RF-LANG-04: Todas las demás experiencias deben usar verbos en pasado simple.
- RF-LANG-05: Aplicar el mismo criterio a las versiones en inglés de los archivos i18n.

---

*Documento de especificaciones v2.0.0 — Portfolio Ronald Isaias Preciado Bermúdez*
