# 1 Prompt — Skills Section con Indicador Lateral Sincronizado

## Descripción del requerimiento

Necesito que la sección de habilidades (Skills) tenga un indicador lateral fijo (barra o puntos), y que la experiencia de navegación sea totalmente sincronizada entre el scroll y las tarjetas de tecnología. Actualmente, el indicador lateral resalta la categoría activa al hacer scroll (usando ScrollTrigger), pero las tarjetas permanecen estáticas.

---

## Comportamiento esperado

### 1. Al hacer scroll vertical:
- El indicador lateral resalte el punto o categoría correspondiente.
- La tarjeta asociada a la categoría se muestre en pantalla (solo una tarjeta visible a la vez), y vaya cambiando a medida que se navega por el set de puntos.
- Las tarjetas deben estar perfectamente sincronizadas con el indicador: si el usuario está en el punto "Backend", solo la tarjeta de "Backend" debe estar visible.

### 2. Mecánica específica:
- El indicador lateral debe permanecer fijo (pin) en la pantalla durante toda la navegación por la sección.
- La transición entre tarjetas debe ser suave (puede ser fade, slide u otro efecto visual agradable).
- Si el usuario usa el indicador lateral para navegar (click en los puntos), la tarjeta correspondiente debe mostrarse instantáneamente y el scroll debe ajustarse a la posición de la categoría seleccionada.

### 3. Tecnologías sugeridas:
- Usar GSAP ScrollTrigger para la lógica de scroll y pinning.
- El layout debe estar optimizado para desktop y mobile.
- El código debe ser modular y accesible.

### 4. Resumen del objetivo:
La navegación por el indicador lateral y la visualización de tarjetas deben estar totalmente sincronizadas; en cada momento solo se visualiza la tarjeta de la categoría activa, tanto por scroll como por click en el indicador lateral.

---

## Implementación solicitada

Por favor genera el código necesario en **React + GSAP** para implementar esta mecánica, con instrucciones claras para la integración y ejemplos de estructura de componentes.


# 2 Prompt — Projects Section: Slider Horizontal Clásico

## Descripción del requerimiento

Quiero modificar la sección de Proyectos, que actualmente tiene desplazamiento horizontal inmersivo (ScrollTrigger con pin y animación de xPercent al hacer scroll vertical).

---

## Cambios requeridos

### 1. Reemplazar el scroll horizontal animado actual
Eliminar el GSAP ScrollTrigger pin + xPercent y reemplazarlo por un slider horizontal clásico, mostrando una cantidad fija de proyectos por vista (4 o 5, dependiendo del tamaño del viewport).

### 2. Comportamiento requerido:
- Implementar un slider responsive que permita visualizar únicamente 4 o 5 tarjetas de proyecto al mismo tiempo (de forma horizontal lado a lado).
- Al hacer click en las flechas (next/prev), avanzar o retroceder 4 o 5 proyectos completos por página, no de uno en uno.
- No quiero animación de desplazamiento al hacer scroll vertical: solo navegación por flechas o por swipe horizontal (drag, en mobile).
- El contenedor principal ya no debe estar `pinned` ni bloquear el scroll de la página.

### 3. Extras visuales:
- Mantener un diseño limpio y responsivo.
- El slider debe ajustarse para mostrar la cantidad máxima de tarjetas sin overflow ni cortes (de 4 en 4, o 5 en 5 según el espacio).
- (Opcional) Mostrar paginación o puntos indicadores al fondo.

### 4. Resumen objetivo:
- Dejar de usar el efecto de scroll horizontal con ScrollTrigger.
- Usar un slider tipo carousel horizontal mostrando solo el número de proyectos que quepan perfectamente en pantalla (4–5 por slide).
- Navegación solo por flechas o swipe.

---

## Implementación solicitada

Por favor genera el código necesario para implementar este slider horizontal usando **Tailwind + React** (o sugiere librería adecuada como Swiper.js, Embla Carousel, etc. si Tailwind no tiene componente propio), con instrucciones claras de integración y estructura de componentes.

# 3  Prompt — Referencias: Infinite Card Slider con Mouse Drag

## 2.3 Sección de Referencias — Infinite Card Slider Mejorado

Crear un flujo continuo de testimonios o referencias profesionales.

---

## Mecánica principal

Las tarjetas de referencias deben moverse de forma automática e infinita horizontalmente.

**Detalle técnico:** Implementar un "Seamless Loop". El slider no debe detenerse al final, sino resetearse de forma invisible para dar la sensación de bucle infinito.

---

## Interactividad requerida

- El usuario puede controlar el slider usando el mouse: al hacer clic y arrastrar (mouse drag), puede mover las tarjetas de manera horizontal a izquierda o derecha, cambiando el curso del slider libremente.
- El slider debe detectar y responder al movimiento del mouse, permitiendo explorar todas las referencias arrastrando.
- Al pasar el mouse (`hover`) sobre el slider, la animación automática debe ralentizarse o pausarse hasta que el usuario deje de interactuar.

---

## Requisitos de experiencia

- El desplazamiento controlado por mouse debe ser suave y conservar siempre la sensación de ciclo infinito (bucle seamless) sin saltos visuales.
- La transición entre el control manual y el movimiento automático debe ser fluida, sin cortes ni reposicionamientos bruscos.

---

## Nota para el agente

Generar el código en **React + GSAP** (usando `gsap.to` con loop y `Draggable` plugin), o con **Framer Motion** si es más apropiado, con instrucciones claras de integración en el proyecto existente.




# 4  Prompt —  — Línea Vertical del Timeline SVG no Visible

Si tu sección de experiencia está mostrando los nodos y las tarjetas, pero no se ve la línea vertical del timeline, probablemente el problema es uno de los siguientes puntos clave:

---

## 1. El elemento `<path>` del SVG no está correctamente definido o no tiene propiedades visibles

Asegúrate que el `<path>` existe y tiene un `stroke` (color), un ancho (`stroke-width`) mayor que 0, y no tiene atributos como `display: none` o `visibility: hidden`.

---

## 2. El path podría estar en blanco o transparente

Verifica que el color del `stroke` NO sea igual al fondo, y que tenga alpha diferente de 0.

---

## 3. El path tiene un valor de `stroke-dasharray` y/o `stroke-dashoffset` demasiado alto

Si pones un `dashoffset` igual a la longitud total del path, y nunca lo animas a bajar, se verá invisible.

Ejemplo típico para el efecto:

```tsx
<path
  d="M100,0 L100,600" // ejemplo
  stroke="#007bff"
  strokeWidth="4"
  fill="none"
  strokeDasharray={length}
  strokeDashoffset={dashOffset}
/>
```

Asegúrate que el `strokeDashoffset` inicie en la longitud máxima y se va animando hacia 0, y que ambos valores estén bien seteados.

---

## 4. El viewBox del SVG podría estar mal

Si el `viewBox` no ajusta a la altura o no abarca el path, puede que esté "fuera de pantalla".

---

## Resumen

- Asegúrate de tener el `<path>` con stroke visible.
- Verifica `strokeDasharray` / `strokeDashoffset`.
- Revisa el `viewBox`.
- Prueba con un path simple para ver si el SVG básico sí se muestra.

---

## Recomendación de depuración

Agrega un `<path>` estático en tu SVG, sin animación ni dash, para probar:

```tsx
<svg height="500" width="100">
  <path d="M50 0 V500" stroke="red" strokeWidth="4" />
</svg>
```

- Si esto **SÍ aparece** → tu problema está en los props animados.
- Si **no aparece** → el problema es HTML/CSS/SVG estructural.

---

**Key point:** El path del SVG debe ser visible, tener un color contrastante, y estar dentro del `viewBox`. Verifica los props de `stroke` y animación en tu código.
