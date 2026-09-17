# voyya-page

Sitio informativo público de VoyYa. HTML, CSS y JavaScript planos: sin framework, sin dependencias y
sin paso de build. Se despliega tal cual.

## Estructura

```
index.html     una sola página, secciones ancladas
styles.css     tokens de marca y estilos
main.js        revelado al hacer scroll, dibujo de la línea de ruta, barra superior
favicon.svg
vercel.json    cabeceras de seguridad y caché
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

## Pendiente

Los **términos y condiciones** y la **política de tratamiento de datos** (Ley 1581) todavía no están
publicados. Son requisito para el piloto y para publicar las apps en las tiendas, y necesitan
revisión jurídica antes de subirse. El pie de página y la sección de estado lo dicen de forma
explícita en lugar de enlazar a documentos que no existen.

El sitio describe el producto en presente porque describe lo que el producto hace, pero deja claro
que el servicio **no está abierto al público** y que las aplicaciones **no están publicadas**.
Mantener esa distinción es importante mientras el piloto siga en preparación.
