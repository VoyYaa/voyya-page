# voyya-page

Sitio informativo público de VoyYa. HTML, CSS y JavaScript planos: sin framework, sin dependencias y
sin paso de build. Se despliega tal cual.

## Estructura

```
index.html            página principal, secciones ancladas
terms.html             Términos y Condiciones de Uso (versión preliminar)
privacy-policy.html    Política de Tratamiento de Datos Personales — Ley 1581 (versión preliminar)
styles.css             tokens de marca y estilos, incluidos los de las páginas legales
main.js                revelado al hacer scroll, dibujo de la línea de ruta, barra superior
favicon.svg
vercel.json            cabeceras de seguridad y caché
```

## Desplegar en Vercel

Importa el repositorio. No hay que configurar nada:

- Framework preset: **Other**
- Build command: *(vacío)*
- Output directory: *(vacío, la raíz)*

Para verlo en local basta con abrir `index.html`, o servirlo con cualquier servidor estático.

## Decisiones de diseño

El esqueleto de la página **es el viaje**: pides, buscamos al más cercano, el conductor va por ti,
pagas en efectivo. La línea vertical ámbar que une los cuatro pasos se dibuja al bajar y es el
elemento que da identidad al sitio.

No se usan tarjetas flotantes. La jerarquía se construye con tipografía, bandas de color a sangre y
reglas de 1px. La profundidad viene del color, no de las sombras.

Paleta heredada de la marca, verificada contra WCAG AA: espresso sobre crema 14,8:1 · espresso suave
sobre crema 10,1:1 · `amber-ink` sobre crema 7,9:1 · crema sobre espresso 14,8:1 · ámbar sobre
espresso 7,6:1. El ámbar puro **no** se usa como texto sobre fondo claro, donde da 1,9:1; para eso
existe `--amber-ink`.

Todas las animaciones se desactivan con `prefers-reduced-motion`.

## Documentos legales (`terms.html`, `privacy-policy.html`)

Publicados como **versión preliminar**, con un aviso destacado arriba de cada documento: pendientes
de revisión jurídica y sin efectos hasta el lanzamiento del piloto. Se enlazan desde el pie de página
y desde la sección de estado del índice.

Los dos documentos llevan `<meta name="robots" content="noindex">` mientras estén en esta etapa: son
públicos y legibles, pero no deben indexarse como si fueran la versión definitiva.

El bloque de identificación del Responsable del Tratamiento (razón social, NIT, domicilio, correo de
habeas data) usa marcadores visualmente destacados (`.legal-placeholder-box`, con la etiqueta
"Completar antes de publicar") en vez de datos inventados — el concepto legal de VoyYa sigue abierto
(Fase 0, ver `CLAUDE.md`). **Estos marcadores deben completarse antes de que cualquiera de los dos
documentos se considere publicable de verdad.** El resto de cada documento describe el sistema real
(qué guarda, para qué, con qué proveedores, con qué medidas de seguridad) y no tiene marcadores
pendientes.

Ambos documentos declaran con honestidad los puntos que **hoy no están implementados en el
sistema** en vez de prometerlos: no hay plazo de retención definido ni supresión automatizada de
datos (excepto la purga de ubicación del conductor), los derechos del titular se ejercen por un
canal humano por correo — no hay autogestión en la app —, no existe todavía la casilla de
autorización explícita al registrarse, y las transmisiones internacionales a los proveedores
(Railway, Twilio, SendGrid, Mapbox) están declaradas pero sin el contrato de transmisión formalizado
todavía. Ver el detalle en `docs/security/cumplimiento-ley1581.md` y
`docs/security/reporte-afiliacion-empresas.md` (hallazgos C-05, C-06, C-10) del repo `Yavoy`.

## Pendiente

- **Revisión jurídica** de `terms.html` y `privacy-policy.html`, y completar el bloque de
  identificación del Responsable del Tratamiento antes de que dejen de ser una versión preliminar.
- **Registro de la autorización de datos** en la aplicación (casilla no premarcada + versión del
  aviso, según `docs/security/cumplimiento-ley1581.md` ítem 2): hoy la política la describe, pero el
  mecanismo de captura en el producto todavía no existe.
- El sitio describe el producto en presente porque describe lo que el producto hace, pero deja claro
  que el servicio **no está abierto al público** y que las aplicaciones **no están publicadas**.
  Mantener esa distinción es importante mientras el piloto siga en preparación.
