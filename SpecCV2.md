# SDD — Software Design Document (Actualizado)
## Portfolio Web · Ronald Isaias Preciado Bermúdez
**Versión:** 1.1.0  
**Fecha:** Marzo 2026  
**Tipo:** SPA / Landing Page (Currículum Vitae Interactivo)

---

## 1. Modificaciones de Flujo y Navegación

### 1.1 Header & Smooth Scroll (Corrección)
Se debe corregir el comportamiento del Header para que actúe como una navegación de Single Page Application (SPA).

* **Problema actual:** Los enlaces no redirigen correctamente a las anclas de sección.
* **Solución:** Configurar los `href` de los botones del menú (Inicio, Sobre mí, Habilidades, Proyectos, Referencias, Contacto) para que coincidan con los `id` de las secciones correspondientes.
* **Efecto GSAP (Animate Scroll Position):** * Al hacer clic en un enlace, se debe cancelar el salto instantáneo y utilizar el plugin **ScrollToPlugin** de GSAP.
    * **Animación:** Desplazamiento suave con una curva de velocidad `power3.inOut`.
    * **Configuración sugerida:** `gsap.to(window, {duration: 1.2, scrollTo: "#id-seccion", ease: "power3.inOut"});`

---

## 2. Especificaciones de Animaciones por Sección

Para elevar la interactividad del portafolio, se deben implementar los siguientes efectos específicos de GSAP:

### 2.1 Sección de Habilidades (Skills) — **Lateral Pin Indicator**
Implementar un indicador de progreso lateral que guíe al usuario mientras explora las diferentes categorías de habilidades.
* **Mecánica:** Al entrar en la sección, una barra o set de puntos lateral se queda fijo en pantalla (`pin`).
* **Interacción:** A medida que el usuario hace scroll vertical por los grupos de tecnologías (Frontend, Backend, Cloud, etc.), el indicador lateral debe resaltar automáticamente la categoría activa usando `ScrollTrigger`.

### 2.2 Sección de Proyectos — **Horizontal Scroll Section**
Cambiar la navegación vertical por un desplazamiento horizontal inmersivo en esta sección.
* **Mecánica:** Al llegar a la sección de Proyectos, el scroll vertical del ratón debe desplazar el contenido de derecha a izquierda.
* **Implementación:** Utilizar `ScrollTrigger` con la propiedad `pin: true` sobre el contenedor principal y animar el `xPercent` de la fila de proyectos hacia `-100%`.
* **Efecto visual:** Los proyectos deben deslizarse lateralmente mientras la sección permanece fija en el viewport.

### 2.3 Sección de Referencias — **Infinite Card Slider**
Crear un flujo continuo de testimonios o referencias profesionales.
* **Mecánica:** Las tarjetas de referencias deben moverse de forma automática e infinita horizontalmente.
* **Detalle técnico:** Implementar un "Seamless Loop". El slider no debe detenerse al final, sino resetearse de forma invisible para dar la sensación de bucle infinito.
* **Interactividad:** Al pasar el mouse (`hover`), la animación debe ralentizarse o pausarse.


## 4. Requerimientos Técnicos Adicionales

1.  **Registro de Plugins:** Es obligatorio registrar los plugins en el archivo de configuración global de GSAP:
    ```javascript
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    ```
2.  **Responsividad:** Las animaciones de *Horizontal Scroll* y *Lateral Pin* deben desactivarse o transformarse en scroll vertical estándar en dispositivos móviles (usando `ScrollTrigger.matchMedia()`).
3.  **Rendimiento:** Utilizar `will-change: transform` en las tarjetas del slider infinito para asegurar 60fps.