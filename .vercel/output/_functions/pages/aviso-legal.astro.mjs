import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bb7zwkth.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DuYZrZmv.mjs';
export { renderers } from '../renderers.mjs';

const $$AvisoLegal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Aviso Legal" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 bg-white"> <div class="container mx-auto px-4 pt-20"> <h1 class="font-heading text-3xl text-primary mb-8">Aviso Legal</h1> <p class="text-gray-600">
Información legal sobre el sitio web y titularidad.
</p> </div> </section> ` })}`;
}, "C:/Freelance/EyM-page/src/pages/aviso-legal.astro", void 0);

const $$file = "C:/Freelance/EyM-page/src/pages/aviso-legal.astro";
const $$url = "/aviso-legal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AvisoLegal,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
