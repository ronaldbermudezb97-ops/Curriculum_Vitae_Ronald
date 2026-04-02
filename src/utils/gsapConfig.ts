// Registro centralizado de plugins GSAP — importar desde aquí en todos los componentes
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Solo registramos los plugins si estamos en el entorno del navegador (cliente)
// Esto evita errores de SSR en Astro
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export { gsap, ScrollTrigger, ScrollToPlugin }
