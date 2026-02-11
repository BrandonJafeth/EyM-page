import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, l as renderScript, p as renderSlot, q as renderHead, u as unescapeHTML } from './astro/server_Bb7zwkth.mjs';
import 'piccolore';
import 'clsx';
/* empty css                               */

const name = "EM & Asociados";
const url = "https://emyasociados.net";
const logo = "https://res.cloudinary.com/dkwvaxxdw/image/upload/v1770155113/LOGO_EM_BLANCO_u7ua6f.png";
const contact = {"phone":"+506 6285 4476","phone_secondary":"+506 6021 2971","email":"bufete.emyasociados@gmail.com","address":"125 metros norte de la Municipalidad de Liberia, frente a Motomarcas, Liberia, Guanacaste","maps_link":"https://share.google/oGJAjrsuJp3nPwofs"};
const social = {"facebook":"https://www.facebook.com/p/EM-y-Asociados-100083144000492/","instagram":"https://www.instagram.com/emyasociados/"};
const siteData = {
  name,
  url,
  logo,
  contact,
  social,
};

const $$Astro$4 = createAstro("https://emyasociados.net");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Icon;
  const { name, size = 24, class: className, fill = "none", stroke = "currentColor" } = Astro2.props;
  const icons = {
    Facebook: "M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3",
    Instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M16.5 7.5v.01",
    Mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    Phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    MessageCircle: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
    ChevronDown: "m6 9 6 6 6-6",
    Award: "M6 8a6 6 0 1 0 12 0 6 6 0 1 0-12 0 M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",
    BookOpen: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    Briefcase: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16 M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
    Gavel: "m14 13-8.38 8.38a1 1 0 0 0 3 3l8.38-8.38 M15.62 15.38l6-6 M21.62 9.38l-8-8 M8.12 14.88l6-6 M8.62 14.38l8 8",
    GraduationCap: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z M22 10v6 M6 12.5V16a6 3 0 0 0 12 0v-3.5"
  };
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24"${addAttribute(fill, "fill")}${addAttribute(stroke, "stroke")}${addAttribute(stroke === "none" ? "0" : "2", "stroke-width")} stroke-linecap="round" stroke-linejoin="round"${addAttribute(className, "class")}> <path${addAttribute(icons[name], "d")}></path> </svg>`;
}, "C:/Freelance/EyM-page/src/components/common/Icon.astro", void 0);

const $$Astro$3 = createAstro("https://emyasociados.net");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navbar;
  const siteData$1 = siteData;
  const links = [
    { text: "Inicio", href: "/" },
    { text: "Sobre Nosotros", href: "/sobre-nosotros" },
    { text: "Servicios", href: "/servicios" },
    { text: "Contacto", href: "/contacto" }
  ];
  const currentPath = Astro2.url.pathname;
  const isHomePage = currentPath === "/";
  const headerClass = "fixed top-0 w-full z-50 transition-all duration-300 bg-primary text-white border-b border-secondary/10 h-20 shadow-md";
  return renderTemplate`${maybeRenderHead()}<header id="navbar"${addAttribute(headerClass, "class")}${addAttribute(isHomePage, "data-is-home")}> <div class="px-6 md:px-30 h-full"> <div class="flex items-center justify-between h-full transition-all duration-300" id="navbar-container"> <a href="/" class="shrink-0 group flex items-center gap-4"> <img${addAttribute(siteData$1.logo.replace("/upload/", "/upload/w_300,q_auto,f_auto/"), "src")}${addAttribute(siteData$1.name, "alt")} width="145" height="84" fetchpriority="high" class="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"> </a> <!-- Desktop Menu --> <nav class="hidden md:flex items-center gap-14"> ${links.map((link) => {
    const isActive = link.href === "/" ? currentPath === "/" : currentPath.startsWith(link.href);
    return renderTemplate`<a${addAttribute(link.href, "href")} class="relative group py-3"> <span${addAttribute([
      "font-heading text-base tracking-[0.5px] font-normal transition-colors",
      isActive ? "text-accent" : "text-white"
    ], "class:list")}> ${link.text} </span>  <div${addAttribute([
      "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 bg-accent",
      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
    ], "class:list")}></div> </a>`;
  })} </nav> <!-- CTA Button --> <div class="hidden md:block"> <a${addAttribute(`https://wa.me/${siteData$1.contact.phone.replace(/\s/g, "")}`, "href")} target="_blank" rel="noopener noreferrer" class="group font-heading text-base text-white border border-accent bg-transparent hover:bg-accent hover:text-primary px-8 py-3 rounded-xs tracking-[0.05em] transition-all duration-300 cursor-pointer inline-block">
CONTACTAR
</a> </div> <!-- Mobile Menu Button --> <button id="mobile-menu-btn" class="md:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none z-110" aria-label="Abrir menú" aria-expanded="false" type="button"> <div class="w-6 flex flex-col items-center justify-center gap-1.5 pointer-events-none"> <span class="w-full h-0.5 bg-current transition-all duration-300 ease-out origin-center block hamburger-line-1"></span> <span class="w-full h-0.5 bg-current transition-all duration-200 block hamburger-line-2"></span> <span class="w-full h-0.5 bg-current transition-all duration-300 ease-out origin-center block hamburger-line-3"></span> </div> </button> </div> </div> <!-- Mobile Menu Overlay --> <div id="mobile-menu-overlay" class="fixed inset-0 z-100 opacity-0 invisible pointer-events-none transition-all duration-500 ease-out" role="dialog" aria-modal="true" aria-label="Menú de navegación móvil"> <!-- Background - Dark Navy Corporate --> <div class="absolute inset-0 bg-primary shadow-2xl"></div> <!-- Subtle Pattern Overlay --> <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div> <!-- Content Container --> <div class="relative h-full w-full flex flex-col items-center justify-center px-6"> <!-- Main Navigation --> <nav class="flex flex-col items-center space-y-8 mb-16"> ${links.map((link, index) => {
    const isActive = link.href === "/" ? currentPath === "/" : currentPath.startsWith(link.href);
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([
      "mobile-nav-link font-heading text-3xl sm:text-5xl font-normal hover:scale-105 origin-center relative transition-all duration-500 transform translate-y-8 opacity-0",
      isActive ? "text-accent" : "text-white hover:text-accent"
    ], "class:list")}${addAttribute(`transition-delay: ${index * 100}ms`, "style")}> ${link.text} </a>`;
  })} </nav> <!-- Mobile Social Icons --> <div class="flex items-center gap-8 mobile-nav-link opacity-0 translate-y-8 transition-all duration-500" style="transition-delay: 400ms"> ${renderTemplate`<a${addAttribute(siteData$1.social.facebook, "href")} target="_blank" rel="noopener noreferrer" class="text-white hover:text-accent transition-colors"> ${renderComponent($$result, "Icon", $$Icon, { "name": "Facebook", "size": 32 })} </a>`} ${renderTemplate`<a${addAttribute(siteData$1.social.instagram, "href")} target="_blank" rel="noopener noreferrer" class="text-white hover:text-accent transition-colors"> ${renderComponent($$result, "Icon", $$Icon, { "name": "Instagram", "size": 32 })} </a>`} </div> </div> </div> </header> ${renderScript($$result, "C:/Freelance/EyM-page/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Freelance/EyM-page/src/components/layout/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const siteData$1 = siteData;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const navLinks = [
    { text: "Inicio", href: "/" },
    { text: "Sobre Nosotros", href: "/sobre-nosotros" },
    { text: "Servicios", href: "/servicios" },
    { text: "Contacto", href: "/contacto" }
  ];
  const legalLinks = [
    { text: "Pol\xEDtica de Privacidad", href: "/privacidad" },
    { text: "T\xE9rminos y Condiciones", href: "/terminos" },
    { text: "Aviso Legal", href: "/aviso-legal" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary text-white pt-12 pb-6 border-t border-accent/30"> <div class="container mx-auto px-6 md:px-15 lg:px-25"> <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-8 mb-10"> <!-- Brand Column --> <div class="col-span-2 lg:col-span-1 space-y-4"> <a href="/" class="block"> <img${addAttribute(siteData$1.logo.replace("/upload/", "/upload/w_300,q_auto,f_auto/"), "src")}${addAttribute(siteData$1.name, "alt")} width="121" height="70" loading="lazy" decoding="async" class="h-10 w-auto brightness-0 invert"> </a> <p class="text-secondary font-heading text-base leading-relaxed max-w-sm">
Asesoría legal integral en Guanacaste, comprometidos con la defensa de sus derechos y el éxito de sus proyectos empresariales.
</p> </div> <!-- Navigation --> <div> <h3 class="font-heading text-accent text-xs uppercase tracking-[0.15em] mb-4">SERVICIOS</h3> <ul class="space-y-3"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="relative group inline-block py-0.5"> <span class="text-secondary font-light text-sm transition-colors duration-300 group-hover:text-accent"> ${link.text} </span> <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span> </a> </li>`)} </ul> </div> <!-- Legal --> <div> <h3 class="font-heading text-accent text-xs uppercase tracking-[0.15em] mb-4">INFORMACIÓN</h3> <ul class="space-y-3"> ${legalLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="relative group inline-block py-0.5"> <span class="text-secondary font-light text-sm transition-colors duration-300 group-hover:text-accent"> ${link.text} </span> <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span> </a> </li>`)} </ul> </div> <!-- Contact --> <div class="col-span-2 lg:col-span-1"> <h3 class="font-heading text-accent text-xs uppercase tracking-[0.15em] mb-4">CONTACTO</h3> <ul class="space-y-4"> <!-- Phone --> <li class="flex items-start gap-3"> <div class="text-accent mt-0.5"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> </div> <div> <span class="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Teléfonos</span> <div class="flex flex-col gap-1"> <a${addAttribute(`tel:${siteData$1.contact.phone.replace(/\s/g, "")}`, "href")} class="relative group inline-block py-0.5 w-fit"> <span class="text-secondary font-light text-sm transition-colors duration-300 group-hover:text-accent"> ${siteData$1.contact.phone} </span> <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span> </a> ${renderTemplate`<a${addAttribute(`tel:${siteData$1.contact.phone_secondary.replace(/\s/g, "")}`, "href")} class="relative group inline-block py-0.5 w-fit"> <span class="text-secondary font-light text-sm transition-colors duration-300 group-hover:text-accent"> ${siteData$1.contact.phone_secondary} </span> <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span> </a>`} </div> </div> </li> <!-- Email --> <li class="flex items-start gap-3"> <div class="text-accent mt-0.5"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> </div> <div> <span class="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Email</span> <a${addAttribute(`mailto:${siteData$1.contact.email}`, "href")} class="relative group inline-block py-0.5 break-all"> <span class="text-secondary font-light text-sm transition-colors duration-300 group-hover:text-accent"> ${siteData$1.contact.email} </span> <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span> </a> </div> </li> <!-- Location --> <li class="flex items-start gap-3"> <div class="text-accent mt-0.5"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> </div> <div> <span class="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Ubicación</span> <a${addAttribute(siteData$1.contact.maps_link, "href")} target="_blank" rel="noopener noreferrer" class="relative group inline-block py-0.5"> <span class="text-secondary font-light text-sm transition-colors duration-300 group-hover:text-accent">
Liberia, Guanacaste
</span> <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span> </a> </div> </li> <!-- Hours --> <li class="flex items-start gap-3"> <div class="text-accent mt-0.5"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> </div> <div> <span class="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Horario</span> <div class="text-secondary font-light text-sm space-y-0.5"> <p class="text-accent text-[11px] uppercase tracking-wide mb-1">Cita Previa (Lun-Vie)</p> <p><strong class="font-normal text-white">Liberia:</strong> 9:00 AM - 5:00 PM</p> <p><strong class="font-normal text-white">Cañas:</strong> 9:00 AM - 12:00 PM</p> </div> </div> </li> </ul> </div> </div> <!-- Bottom Bar --> <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-light"> <p>&copy; ${currentYear} EM & Asociados. Todos los derechos reservados.</p> <p class="mt-2 md:mt-0">
Desarrollado por <a href="https://www.instagram.com/one.out_/" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-accent transition-colors underline decoration-gray-500 hover:decoration-accent underline-offset-2">One Out</a> </p> </div> </div> </footer>`;
}, "C:/Freelance/EyM-page/src/components/layout/Footer.astro", void 0);

const $$Astro$2 = createAstro("https://emyasociados.net");
const $$WhatsAppFloat = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WhatsAppFloat;
  const {
    phoneNumber,
    message = "Hola, me gustar\xEDa agendar una consulta en EM & Asociados."
  } = Astro2.props;
  const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" id="whatsapp-button" aria-label="Contactar por WhatsApp" class="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full
         bg-[#25D366] hover:bg-[#20BA5A]
         flex items-center justify-center
         text-white
         shadow-lg hover:shadow-xl
         transition-all duration-300
         hover:scale-110
         group
         animate-bounce-slow" title="Contactar vía WhatsApp" data-astro-cid-lteymi7l> <svg class="w-8 h-8 filter drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-lteymi7l> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-astro-cid-lteymi7l></path> </svg> <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping-once -z-10" data-astro-cid-lteymi7l></span> </a> `;
}, "C:/Freelance/EyM-page/src/components/common/WhatsAppFloat.astro", void 0);

const $$ScrollToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="scroll-to-top" type="button" aria-label="Volver al inicio" class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full 
         bg-white
         border border-secondary
         flex items-center justify-center
         text-primary
         shadow-lg hover:shadow-xl
         transition-all duration-300
         opacity-0 invisible
         translate-y-4
         hover:cursor-pointer
         hover:scale-110 hover:-translate-y-1 hover:border-accent hover:text-accent
         group"> <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path> </svg> </button> ${renderScript($$result, "C:/Freelance/EyM-page/src/components/common/ScrollToTop.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Freelance/EyM-page/src/components/common/ScrollToTop.astro", void 0);

const $$Astro$1 = createAstro("https://emyasociados.net");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Freelance/EyM-page/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Freelance/EyM-page/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://emyasociados.net");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const siteData$1 = siteData;
  const { title, description } = Astro2.props;
  const siteTitle = `${title} | ${siteData$1.name}`;
  const siteDescription = description || `Bufete de abogados en Costa Rica con sede en Liberia y Ca\xF1as, Guanacaste. Asesor\xEDa legal experta. Cont\xE1ctanos al ${siteData$1.contact.phone}.`;
  const canonicalURL = new URL(Astro2.url.pathname, siteData$1.url);
  const socialImageURL = "https://res.cloudinary.com/dkwvaxxdw/image/upload/q_auto,f_auto/v1770504499/_MG_0201_o5v1zp.jpg";
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": siteData$1.name,
    "image": socialImageURL,
    "@id": siteData$1.url,
    "url": siteData$1.url,
    "telephone": siteData$1.contact.phone,
    "email": siteData$1.contact.email,
    "sameAs": [
      siteData$1.social.facebook,
      siteData$1.social.instagram
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteData$1.contact.address,
      "addressLocality": "Liberia",
      "addressRegion": "Guanacaste",
      "addressCountry": "CR"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Liberia"
      },
      {
        "@type": "City",
        "name": "Ca\xF1as"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Guanacaste"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.6317844,
      "longitude": -85.4396896
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$"
  };
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png"', '><meta name="generator"', '><meta name="theme-color" content="#091723"><!-- Preconnect to external API --><link rel="preconnect" href="https://ubicaciones.paginasweb.cr"><link rel="dns-prefetch" href="https://ubicaciones.paginasweb.cr"><!-- SEO Primary --><title>', '</title><meta name="description"', '><meta name="keywords" content="Abogados Costa Rica, Bufete Guanacaste, Abogados Liberia, Asesor\xEDa Legal Ca\xF1as, Derecho Civil, Derecho Laboral, Notar\xEDa P\xFAblica, Tr\xE1mites Legales, Asesor\xEDa Jur\xEDdica, EM & Asociados, Roy Espinoza, Mar\xEDa Fernanda Mendoza"><meta name="robots" content="index, follow"><meta name="author"', '><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Geo-tagging --><meta name="geo.region" content="CR-G"><meta name="geo.placename" content="Liberia"><meta name="geo.position" content="10.6317844;-85.4396896"><meta name="ICBM" content="10.6317844, -85.4396896"><!-- Schema.org JSON-LD --><script type="application/ld+json">', "<\/script>", "", '</head> <body class="font-body bg-gray-50 text-primary antialiased flex flex-col"> ', " <main> ", " </main> ", " ", " ", " ", " </body></html>"])), addAttribute(siteData$1.logo, "href"), addAttribute(Astro2.generator, "content"), siteTitle, addAttribute(siteDescription, "content"), addAttribute(siteData$1.name, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(siteTitle, "content"), addAttribute(siteDescription, "content"), addAttribute(socialImageURL, "content"), unescapeHTML(JSON.stringify(schema)), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "WhatsAppFloat", $$WhatsAppFloat, { "phoneNumber": siteData$1.contact.phone }), renderComponent($$result, "ScrollToTop", $$ScrollToTop, {}), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "C:/Freelance/EyM-page/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Freelance/EyM-page/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$Icon as a, siteData as s };
