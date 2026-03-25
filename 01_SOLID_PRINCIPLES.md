# 01 — PRINCIPIOS SOLID
## Aplicación en React + TypeScript para este proyecto

> Léelo antes de crear cualquier componente o función.
> Cada principio incluye un ejemplo concreto del proyecto.

---

## S — Single Responsibility (Responsabilidad Única)

**Regla:** Cada componente, hook o función hace UNA sola cosa.

```typescript
// ❌ MAL — componente que hace todo
function HeroSection() {
  const [formData, setFormData] = useState({}) // ← no es su responsabilidad
  const sendEmail = () => {}                   // ← no es su responsabilidad
  return <div>...</div>
}

// ✅ BIEN — cada pieza tiene un rol claro
function HeroSection() { return <div>...</div> }         // solo renderiza
function useContactForm() { /* lógica del form */ }       // solo lógica form
function sendEmailService(data) { /* llama EmailJS */ }   // solo servicio
```

**En este proyecto aplica a:**
- `HeroSection.tsx` — solo presentación del hero
- `useScrollAnimation.ts` — solo lógica GSAP
- `useAppStore.ts` — solo estado global
- `sendEmail.ts` en `src/services/` — solo integración EmailJS

---

## O — Open/Closed (Abierto/Cerrado)

**Regla:** Abierto para extensión, cerrado para modificación. Usar props y variantes en lugar de modificar componentes existentes.

```typescript
// ✅ Button extensible con CVA — no modificar para nuevos estilos
const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      primary:   'bg-primary text-white',
      secondary: 'border border-primary',
      ghost:     'bg-transparent',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-5 py-2',
      lg: 'px-8 py-3 text-lg',
    }
  }
})

// Para agregar una variante nueva → solo agregar al objeto, no reescribir
```

**En este proyecto aplica a:**
- `Button.tsx` — variantes con CVA
- `Card.tsx` — variantes para project/skill/testimonial cards
- `SectionDivider.tsx` — `direction` y `baseVelocity` como extensiones

---

## L — Liskov Substitution (Sustitución de Liskov)

**Regla:** Los componentes hijos deben poder sustituir al padre sin romper el comportamiento esperado.

```typescript
// ✅ Interface base bien definida — cualquier implementación es sustituible
interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

// ProjectCard, SkillCard, TestimonialCard — todos extienden CardProps
// Son intercambiables donde se espere un CardProps básico
```

**En este proyecto aplica a:**
- Todas las tarjetas comparten interfaz base `CardProps`
- Los nodos del timeline implementan `TimelineNode` de forma consistente

---

## I — Interface Segregation (Segregación de Interfaces)

**Regla:** No forzar componentes a depender de props que no usan. Interfaces específicas, no genéricas gigantes.

```typescript
// ❌ MAL — interfaz dios
interface ComponentProps {
  title: string
  imageUrl: string
  liveUrl: string
  techStack: string[]
  rating: number      // ← solo lo usan testimonios
  svgX: number        // ← solo lo usa el timeline
  accentColor: string // ← solo lo usan skills
}

// ✅ BIEN — interfaces específicas por componente
interface ProjectCardProps { title: string; imageUrl: string; liveUrl?: string; techStack: string[] }
interface TestimonialProps  { quote: string; rating: number; name: string }
interface SkillCardProps    { title: string; accentColor: string; items: SkillItem[] }
interface TimelineNodeProps { year: string; svgX: number; svgY: number; side: 'left'|'right' }
```

**En este proyecto:** cada interfaz vive en `src/types/index.ts` y es específica a su componente.

---

## D — Dependency Inversion (Inversión de Dependencias)

**Regla:** Los módulos de alto nivel no dependen de implementaciones concretas, sino de abstracciones.

```typescript
// ❌ MAL — componente acoplado directamente a EmailJS
function ContactForm() {
  const send = async () => {
    await emailjs.send('service_id', 'template_id', data, 'key') // acoplado
  }
}

// ✅ BIEN — depende de una abstracción (función de servicio)
// src/services/emailService.ts
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await emailjs.send(
    import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
    import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
    { from_name: data.name, from_email: data.email, ... },
    import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
  )
}

// ContactForm.tsx solo llama sendContactEmail(data) — no sabe de EmailJS
```

**En este proyecto aplica a:**
- `src/services/emailService.ts` — abstrae EmailJS
- `src/hooks/useScrollAnimation.ts` — abstrae GSAP
- `src/i18n/` — abstrae los textos del componente
- `src/data/` — abstrae los datos del componente

---

## Resumen de aplicación por archivo

| Archivo | Principio principal |
|---|---|
| `Button.tsx` | O — extensión por variantes CVA |
| `Card.tsx` | O + L — variantes + contratos base |
| `ContactSection.tsx` | S + D — delega a service y hook |
| `useContactForm.ts` | S — solo lógica del form |
| `emailService.ts` | D — abstrae EmailJS |
| `useScrollAnimation.ts` | S + D — abstrae GSAP |
| `useAppStore.ts` | S — solo estado global |
| `src/types/index.ts` | I — interfaces específicas |
