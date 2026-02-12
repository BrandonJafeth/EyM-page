# EM & Asociados - Sitio Web Corporativo

Sitio web moderno y profesional para el bufete de abogados **EM & Asociados**, ubicados en Guanacaste, Costa Rica. Diseñado para proyectar confianza, autoridad y elegancia, optimizado para conversión y posicionamiento local.

Realizado por **[One Out](https://www.instagram.com/one.out_/)**.

## 🛠 Tecnologías

Este proyecto está construido con un stack moderno enfocado en rendimiento (Core Web Vitals) y mantenibilidad:

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation).
- **Lenguaje**: TypeScript.
- **Estilos**: Tailwind CSS.
- **Fuentes**: Antic Didone (Títulos) y Lato (Cuerpo).
- **Iconos**: Lucide React.
- **Animaciones**: CSS Nativo y View Transitions.

## 📂 Estructura del Proyecto

```text
src/
├── components/      # Componentes de UI reutilizables (.astro, .tsx)
│   ├── common/      # Botones, Títulos, Call-to-Actions
│   ├── layout/      # Navbar, Footer
│   └── sections/    # Secciones específicas por página (Home, About, etc.)
├── data/            # Fuente de verdad de contenidos (JSON)
│   ├── site.json    # Info global (Contacto, Redes, Logo)
│   ├── services.json # Catálogo de servicios legales
│   └── team.json    # Perfiles de abogados
├── layouts/         # Plantillas base de páginas
├── pages/           # Rutas del sitio (index, contacto, etc.)
└── styles/          # CSS global
```

## 🚀 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Compila el sitio para producción en `./dist/`    |
| `npm run preview`         | Previsualiza el build localmente                 |

## ⚙️ Configuración Global

La información crítica del sitio (teléfonos, correo, dirección) está centralizada en `src/data/site.json`.

**Ejemplo de configuración:**
```json
{
  "name": "EM & Asociados",
  "contact": {
    "phone": "+506 6021 2971", // Teléfono principal
    "phone_secondary": "+506 8705 3112",
    "email": "info@emyasociados.net"
  }
}
```

> **Nota:** Cualquier cambio en el archivo `site.json` se reflejará automáticamente en el Navbar, Footer, Botones de WhatsApp y Secciones de Contacto.

## 📖 Guías de Desarrollo

Para detalles sobre buenas prácticas, estilos y convenciones de código, consulta el archivo [AGENTS.md](./AGENTS.md).

---

© 2026 EM & Asociados. Desarrollado por [One Out](https://www.instagram.com/one.out_/).
