# voyya-page

Sitio informativo público de VoyYa. HTML, CSS y JavaScript planos: sin framework, sin dependencias y
sin paso de build. Se despliega tal cual.

## Estructura

```
index.html            página principal, secciones ancladas
terms.html             Términos y Condiciones de Uso (versión preliminar)
privacy-policy.html    Política de Tratamiento de Datos Personales — Ley 1581 (versión preliminar)
styles.css             tokens de marca y estilos, incluidos los de las páginas legales
main.js                revelado al hacer scroll, línea de ruta, barra superior, mapa del viaje, teléfono del hero y mini-mapa de operación
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

Tres ilustraciones animadas, en SVG y JS planos (sin Mapbox, sin token, sin dependencias):

- **Mapa del viaje** (`.route-map`, en "Cómo funciona"): fijo junto a los cuatro pasos; el estado
  (`data-step`) sigue el scroll y el taxi se mueve sobre un recorrido de calles esquemático.
- **Teléfono del hero** (`.phone`): tres pantallas de la app del pasajero que rotan. La tarifa se
  muestra como `$ ••••` porque la tarifa oficial aún no existe.
- **Mini-mapa de operación** (`.ops`, banda de empresas): conductores disponibles, en servicio y fuera
  de turno, y una cola de solicitudes de ejemplo.

Las tres están rotuladas como "ilustración esquemática": no usan coordenadas reales ni cifras, y no
representan un mapa de ningún municipio. Un mapa real con Mapbox exigiría ADR, token `pk.` restringido
y coordenadas verificadas con la empresa (`maps.md`).

Todas las animaciones se desactivan con `prefers-reduced-motion`.

## Documentos legales (`terms.html`, `privacy-policy.html`)

Publicados como **versión preliminar**, con un aviso destacado arriba de cada documento: pendientes
de revisión jurídica y sin efectos hasta el lanzamiento del piloto. Se enlazan desde el pie de página
y desde la sección de estado del índice.

Los dos documentos llevan `<meta name="robots" content="noindex">` mientras estén en esta etapa: son
públicos y legibles, pero no deben indexarse como si fueran la versión definitiva.

**Actualizado 2026-10-08 (ciclo Cierre del MVP).** El bloque de identificación del Responsable del
Tratamiento ya tiene domicilio y correo de habeas data; el **NIT figura como "en trámite"** (resaltado con
`.legal-todo`) y se completará cuando exista — eso exigirá publicar una versión nueva del aviso de ubicación
(`location-notice-v3`) y pedir de nuevo el consentimiento. El correo que figura hoy es personal; el
institucional está pendiente. Los plazos de conservación (13 horas para la posición del conductor, 90 días
para las coordenadas exactas de los viajes) **están pendientes de validación por un asesor legal**. La
versión del aviso que cita la política debe coincidir con `LOCATION_NOTICE_VERSION` del contrato
(`location-notice-v2` hoy). Las páginas siguen siendo versión preliminar, sin efectos, hasta la revisión
jurídica.

Ambos documentos declaran con honestidad los puntos que **hoy no están implementados en el
sistema** en vez de prometerlos: para los datos que no son de ubicación no hay plazo de retención con
borrado automático, los derechos del titular se ejercen por un canal humano por correo — no hay
autogestión en la app (salvo dejar de compartir la ubicación) —, y las transmisiones internacionales a
los proveedores (Railway, Twilio, SendGrid, Mapbox) están declaradas pero sin el contrato de
transmisión formalizado todavía. Ver el detalle en `docs/security/cumplimiento-ley1581.md`,
`docs/security/reporte-afiliacion-empresas.md` (hallazgos C-05, C-06, C-10) y
`docs/security/reporte-cierre-mvp.md` del repo `Yavoy`.

## Pendiente

- **Revisión jurídica** de `terms.html` y `privacy-policy.html`, el NIT definitivo y el correo
  institucional de habeas data antes de que dejen de ser una versión preliminar.
- **Autorización general** de tratamiento de datos: el consentimiento que existe en las apps (versionado,
  revocable, con registro inmutable) cubre solo la **ubicación**; la autorización general sigue pendiente
  (`docs/security/cumplimiento-ley1581.md` ítem 2).
- El sitio describe el producto en presente porque describe lo que el producto hace, pero deja claro
  que el servicio **no está abierto al público** y que las aplicaciones **no están publicadas**.
  Mantener esa distinción es importante mientras el piloto siga en preparación.
