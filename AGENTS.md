# AGENTS.MD - Guía de Buenas Prácticas
## Proyecto: Landing Page EYM & Asociados (Bufete de Abogados)

> **⚠️ INSTRUCCIÓN IMPORTANTE PARA EL AGENTE:**
> Este documento rige el desarrollo del rediseño del sitio web para EYM & Asociados. Antes de generar código, verifica los requisitos aquí descritos. El objetivo es modernizar la imagen manteniendo la esencia del bufete, proyectando profesionalismo, confianza y credibilidad.

---

## 📋 Índice
1. [Información del Proyecto](#información-del-proyecto)
2. [Paleta de Colores y Tipografía](#paleta-de-colores-y-tipografía)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Arquitectura de Componentes](#arquitectura-de-componentes)
6. [Gestión de Datos](#gestión-de-datos)
7. [Principios de Diseño y UX](#principios-de-diseño-y-ux)
8. [Estrategia de Animaciones y Performance](#estrategia-de-animaciones-y-performance)
9. [Estrategia SEO y Posicionamiento](#estrategia-seo-y-posicionamiento)
10. [Estrategia de Testing y QA](#estrategia-de-testing-y-qa)
11. [Estándares de Calidad y Accesibilidad](#estándares-de-calidad-y-accesibilidad)
12. [Checklist de Entregables](#checklist-de-entregables)

---

## ℹ️ Información del Proyecto

**Cliente**: Roy Francisco Espinoza (Bufete EYM & Asociados)
**Contacto**: +506 8705 3112 | bufete.emyasociados@gmail.com
**Proveedores**: Oscar Zúñiga Sánchez, Brandon Carrillo Álvarez
**Sitio Actual**: https://emyasociados.net/

**Objetivo**: Modernizar imagen, estructura y UX. Captación de clientes. Diseño responsive.

---

## 🎨 Paleta de Colores y Tipografía

Basado en la identidad corporativa legal y moderna (Navy Blue & Gold) con la familia tipográfica Antic Didone.

```css
:root {
  --primary: #091723;      /* Dark Navy - Autoridad y Confianza */
  --secondary: #CBD5E0;    /* Light Steel - Texto Secundario / Fondos */
  --accent: #AF9232;       /* Gold/Bronze - Elegancia y Prestigio */
  --background: #FFFFFF;   /* Fondo limpio */
  --text-main: #091723;    /* Texto principal (Dark Navy) */
  --font-heading: 'Antic Didone', serif; /* Títulos - Tradición y Seriedad */
  --font-body: 'Lato', sans-serif;           /* Cuerpo - Modernidad y Lectura clara */
}
```

---

## 🛠 Stack Tecnológico

- **Core**: Astro 5.x (o última estable)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS (recomendado para desarrollo ágil y responsive)
- **Iconos**: Lucide React o Astro Icon

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/
│   │   ├── Button.astro
│   │   ├── SectionTitle.astro
│   │   ├── Card.astro           # Para servicios
│   │   └── Map.astro
│   ├── layout/
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── home/
│   │   │   ├── Hero.astro           # Mensaje principal + CTA
│   │   │   ├── AboutSummary.astro   # Intro bufete + Link a /sobre-nosotros
│   │   │   ├── ServicesSummary.astro # Resumen áreas + Link a /servicios
│   │   │   └── ContactSection.astro # Info + Mapa (Landing)
│   │   ├── about/
│   │   │   ├── History.astro        # Trayectoria y valores
│   │   │   └── TeamGrid.astro       # Equipo de abogados
│   │   └── services/
│   │       └── ServiceList.astro    # Lista detallada de servicios
│   └── forms/
│       └── ContactForm.astro        # Para página de contacto
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro          # Landing Page
│   ├── sobre-nosotros.astro # Detalle del Bufete y Equipo
│   ├── servicios.astro      # Detalle de Servicios
│   └── contacto.astro       # Formulario y Medios de contacto
└── data/
    ├── site.json            # Info general (Tel, Email, Redes)
    ├── services.json        # Lista de servicios legales
    └── team.json            # Información de abogados
```

---

## 🧩 Arquitectura de Componentes (Islas & Hidratación)

### 1. Regla de Oro: Astro por Defecto
El sitio es estático (SSG). El 90% de los componentes DEBEN ser `.astro`.
*   **¿Por qué?**: Astro renderiza HTML puro en el build. 0kb de JS al cliente.
*   **Uso**: Layouts, Headers, Footers, Hero, Tarjetas de Servicios, Textos, Imágenes.
*   **Ejemplo**: `Hero.astro`, `ServiceCard.astro`, `Navbar.astro` (si es simple).

### 2. Cuándo usar React (Islas)
Usar componentes de Framework (React) **SOLO** cuando se requiera interactividad del lado del cliente (state, effects, event listeners complejos).
*   **Caso de Uso**:
    *   Formularios con validación en tiempo real (`ContactForm.tsx`).
    *   Mapas interactivos complejos (`Map.tsx`).
    *   Menús móviles con estados complejos.
*   **Directivas de Hidratación**:
    *   `client:load`: Para elementos críticos e interactivos inmediatamente (Navbars complejos).
    *   `client:visible`: Para elementos abajo en la página (Formularios, Mapas).
    *   **EVITAR**: `client:only` a menos que sea estrictamente necesario (rompe SEO).

### 3. Resumen de Decisión
| Componente | Tecnología | Hidratación |
| :--- | :--- | :--- |
| Navbar (Linkeo simple) | Astro | N/A |
| Navbar (Menú Móvil Interactivo) | React/Preact | `client:media` o `client:load` |
| Hero Section | Astro | N/A |
| Listado de Servicios | Astro | N/A |
| Formulario de Contacto | React | `client:visible` |
| Mapa Interactivo | React | `client:visible` |
| Footer | Astro | N/A |

---

## 📊 Gestión de Datos

### site.json
```json
{
  "name": "EYM & Asociados",
  "url": "https://emyasociados.net",
  "logo": "https://res.cloudinary.com/dkwvaxxdw/image/upload/v1770155113/LOGO_EM_BLANCO_u7ua6f.png",
  "contact": {
    "phone": "+506 8705 3112",
    "email": "bufete.emyasociados@gmail.com",
    "address": "Liberia, Guanacaste, Costa Rica, de la Municipalidad, 150 metros norte",
    "maps_link": "https://maps.app.goo.gl/KUb3YkGVoomarKmZ7"
  },
  "social": {
    "facebook": "#",
    "instagram": "#"
  }
}
```

### services.json
```json
[
  {
    "id": "derecho-civil",
    "title": "Derecho Civil",
    "shortDescription": "Asesoría en contratos y litigios civiles.",
    "fullDescription": "Descripción detallada...",
    "icon": "scale"
  },
  {
    "id": "derecho-corporativo",
    "title": "Derecho Corporativo",
    "shortDescription": "Constitución de sociedades y asesoría empresarial.",
    "fullDescription": "...",
    "icon": "building"
  }
]
```

---

## 🎯 Principios de Diseño y UX (Bufete Legal)

1.  **Confianza y Credibilidad**: Diseño limpio, uso de espacios en blanco, tipografía serif para títulos.
2.  **Jerarquía Visual**:
    *   **H1**: Promesa de valor (Hero).
    *   **H2**: Secciones principales.
    *   **CTA**: Color `--accent` (Dorado) para resaltar sobre fondos oscuros o blancos.
3.  **Responsive**: Crítico. El menú debe ser accesible en móvil y los formularios fáciles de llenar.
4.  **Accesibilidad**: Contraste suficiente entre texto y fondo.

---

## ⚡ Estrategia de Animaciones y Performance

Para mantener un sitio rápido, profesional y elegante, se priorizará el rendimiento nativo.

### 1. Navegación entre Páginas (View Transitions)
Usar la API nativa de **Astro View Transitions** para una navegación fluida tipo SPA sin el costo de JavaScript de un framework completo.
- **Uso**: Transiciones suaves entre páginas (fade, slide).
- **Implementación**: Importar `ClientRouter` (Astro 5) o `ViewTransitions` (Astro 4) en el `Layout.astro`.

### 2. Micro-interacciones (CSS / Tailwind)
Para botones, hovers y estados de foco, utilizar **CSS puro** o utilidades de **Tailwind CSS**.
- **Ventaja**: Aceleración por GPU y 0kb JS.
- **Ejemplos**: `hover:scale-105`, `transition-colors`, `animate-bounce` (sutil).

### 3. Scroll Reveal (Motion One)
Para animaciones de entrada de elementos al hacer scroll, utilizar **Motion** (anteriormente Motion One) por su ligereza (< 5kb).
- **Evitar**: Librerías pesadas como Framer Motion o GSAP salvo que sea estrictamente necesario para animaciones complejas de timeline.
- **Caso de uso**: Títulos que aparecen suavemente, tarjetas de servicios que entran en cascada.

---

## 🚀 Estrategia SEO y Posicionamiento

El objetivo es dominar las búsquedas locales en Costa Rica, con énfasis en Guanacaste, Liberia y Cañas.

### 1. Palabras Clave (Keywords)
Integrar orgánicamente en Títulos (H1, H2), primer párrafo, alt tags y meta descriptions.
*   **Primarias (Local)**: "Abogados en Guanacaste", "Abogados en Liberia", "Bufete de Abogados Costa Rica".
*   **Secundarias (Servicios)**: "Asesoría Legal Corporativa", "Derecho Civil Costa Rica", "Servicios de Abogado", "Notaría Pública".
*   **Long-tail**: "Mejores abogados para divorcios en Liberia", "Trámites de sociedades en Guanacaste".

### 2. Estructura de Meta Datos (Astro SEO)
Cada página debe tener un componente `<Head />` o layout configurado con:
*   **Title**: `[Servicio/Página] | EYM & Asociados - Abogados en [Ciudad/CR]` (Máx 60 caracteres).
*   **Description**: "Asesoría legal experta en [Servicio]. Ubicados en Guanacaste y Cañas. Contáctanos al +506 8705 3112 para atención inmediata." (Máx 160 caracteres).
*   **Canonical**: `https://emyasociados.net/[ruta]`. Evitar contenido duplicado.
*   **Open Graph**: Usar el dominio de producción `https://emyasociados.net` para imágenes y URLs de compartición.

### 3. SEO Técnico y Local (Schema.org)
Implementar datos estructurados JSON-LD dentro del `<head>` para que Google entienda que es un negocio local.
*   **Tipo**: `LegalService` o `Attorney`.
*   **Datos Críticos (NAP)**: Nombre exacto, Dirección (Liberia, Guanacaste), Teléfono. Coherencia total con Google My Business.
*   **Geo-tagging**: Incluir coordenadas de las oficinas en los metadatos.

### 4. Optimización de Contenido
*   **H1 Único**: Debe contener la keyword principal (ej: "Bufete de Abogados en Guanacaste y Cañas").
*   **Imágenes**: Atributo `alt` descriptivo siempre. (ej: `alt="Abogado firmando contrato en oficina de Liberia"`).
*   **URL Amigables**: `/servicios/derecho-corporativo` en lugar de `/servicios?id=1`.
*   **Velocidad**: La performance (Core Web Vitals) es factor de ranking. Mantener puntuación >95 en Lighthouse.

---

## 🧪 Estrategia de Testing y QA

Para garantizar la robustez del sitio sin comprometer la velocidad de desarrollo, se implementará una estrategia de testing pragmática.

### 1. Unit Testing (Vitest)
Ideal para lógica de negocio aislada, utilidades y componentes interactivos (Islas React).
*   **Herramienta**: **Vitest** (Nativo de Vite/Astro, rapidísimo).
*   **Alcance**:
    *   Validaciones de formularios (`validators.ts`).
    *   Lógica de transformación de datos JSON.
    *   Componentes aislados de React (ej: `ContactForm.test.tsx`).

### 2. End-to-End Testing (Playwright)
Crítico para verificar que el usuario final pueda navegar y contactar. Astro recomienda Playwright por su fiabilidad en sitios estáticos e hidratados.
*   **Herramienta**: **Playwright**.
*   **Smoke Tests (Pruebas de Humo)**:
    *   ¿Carga la `Home` sin errores 404?
    *   ¿Funciona la navegación entre páginas (View Transitions)?
    *   ¿Se envía correctamente el formulario de contacto?
    *   ¿Es visible el mapa y el número de teléfono?
*   **Responsive**: Verificar layout en mobile vs desktop automáticamente.

### 3. Comandos
```json
// package.json script suggestion
"scripts": {
  "test": "vitest",
  "test:e2e": "playwright test"
}
```

---

## 💎 Estándares de Calidad y Accesibilidad

Para otorgar un "Sello de Calidad" al sitio, se deben cumplir estrictamente los siguientes estándares técnicos y éticos.

### 1. Accesibilidad Universal (A11Y)
El sitio debe ser utilizable por cualquier persona, independientemente de sus capacidades.
*   **HTML Semántico**: Uso estricto de etiquetas (`<main>`, `<nav>`, `<article>`, `<aside>`) en lugar de `<div>` genéricos.
*   **Navegación por Teclado**: Todos los elementos interactivos (menús, botones, forms) deben ser accesibles vía `Tab`.
*   **Contraste de Color**: Verificar que el texto Dorado (`#C5A059`) tenga suficiente contraste sobre fondo blanco. Usar herramientas como *WebAIM Contrast Checker*.
*   **Atributos ARIA**: Solo cuando el HTML semántico no sea suficiente (ej: estados de menús desplegables).

### 2. Calidad de Código (Linting)
Mantener una base de código limpia y mantenible es vital para futuros proveedores.
*   **Estilo**: Configurar **Prettier** con plugin de Astro para formato automático.
*   **Linting**: **ESLint** configurado para detectar errores de accesibilidad (`jsx-a11y`) y bugs comunes.
*   **Type Safety**: No usar `any` en TypeScript. Definir interfaces para todas las estructuras de datos (Servicios, Abogados).

### 3. Optimización de Assets
*   **Imágenes Next-Gen**: Uso MANDATORIO del componente `<Image />` de Astro para servir formatos **WebP** o **AVIF** automáticamente.
*   **Lazy Loading**: Activo por defecto en imágenes "below the fold" (fuera de la primera pantalla).
*   **Fuentes**: Self-hosting de `Antic Didone` y `Lato` usando **Fontsource** para evitar layout shifts (CLS) y dependencia de Google Fonts.

### 4. Manejo de Errores (UX)
*   **Página 404 Personalizada**: Crear `404.astro`. No dejar la página de error por defecto del servidor. Debe incluir un botón para volver al inicio.
*   **Feedback en Formularios**: Mensajes claros de éxito o error (ej: "Correo enviado", "Verifica tu email") sin alertas nativas del navegador.

---

## ✅ Checklist de Entregables

- [ ] **Hero Section**: Imagen representativa, Título, Subtítulo, CTA.
- [ ] **Sobre Nosotros (Landing)**: Intro breve + Botón.
- [ ] **Pagina Sobre Nosotros**: Historia, Valores, Grid de Equipo.
- [ ] **Servicios (Landing)**: Resumen destacados.
- [ ] **Pagina Servicios**: Detalle completo.
- [ ] **Contacto (Landing)**: Info básica + Mapa.
- [ ] **Pagina Contacto**: Formulario, Redes, Mapa completo.
- [ ] **Footer**: Links, Copyright, Contacto.
