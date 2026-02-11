import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bb7zwkth.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BI8nUlv0.mjs';
export { renderers } from '../renderers.mjs';

const $$Terminos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "T\xE9rminos y Condiciones" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 bg-white"> <div class="container mx-auto px-4 pt-20"> <h1 class="font-heading text-3xl text-primary mb-8">Términos y Condiciones</h1> <p class="text-gray-600">
Condiciones de uso de nuestro sitio web.
</p> </div> </section> ` })}`;
}, "C:/Freelance/EyM-page/src/pages/terminos.astro", void 0);

const $$file = "C:/Freelance/EyM-page/src/pages/terminos.astro";
const $$url = "/terminos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terminos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
