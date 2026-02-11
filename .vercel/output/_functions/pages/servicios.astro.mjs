import { f as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderComponent, h as addAttribute, e as createAstro } from '../chunks/astro/server_Bb7zwkth.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DuYZrZmv.mjs';
import 'clsx';
/* empty css                                     */
import { s as servicesData } from '../chunks/services_ByVz6XEZ.mjs';
import { $ as $$SectionTitle } from '../chunks/SectionTitle_v1itSWxB.mjs';
export { renderers } from '../renderers.mjs';

const $$ServicesHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-primary pt-32 pb-16 md:pt-40 md:pb-20 text-center px-6" data-astro-cid-yrsrzhai> <p class="font-heading text-accent uppercase tracking-[0.2em] text-xs md:text-sm mb-4 fade-in" data-astro-cid-yrsrzhai>Nuestros Servicios</p> <h1 class="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-6 fade-in delay-100 leading-tight" data-astro-cid-yrsrzhai>
Soluciones Legales Integrales
</h1> <p class="font-body text-secondary text-base md:text-lg max-w-3xl mx-auto fade-in delay-200 font-light leading-relaxed" data-astro-cid-yrsrzhai>
Nos especializamos en ofrecer servicios legales integrales con un equipo altamente experimentado y comprometido a proporcionar soluciones personalizadas.
</p> <div class="w-16 md:w-24 h-px bg-accent mx-auto mt-8 md:mt-10 fade-in delay-300" data-astro-cid-yrsrzhai></div> </section> `;
}, "C:/Freelance/EyM-page/src/components/sections/services/ServicesHero.astro", void 0);

const $$ServicesOffer = createComponent(($$result, $$props, $$slots) => {
  const targetIds = ["familia", "laboral", "civil", "notarial", "aduanal", "resolucion-conflictos", "adicionales"];
  const data = servicesData;
  const detailedServices = data.detailed_services || [];
  const finalServices = detailedServices.filter((s) => targetIds.includes(s.id));
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-white relative"> <div class="container mx-auto px-6 md:px-25"> ${renderComponent($$result, "SectionTitle", $$SectionTitle, { "title": "Oferta de Servicios Jur\xEDdicos", "centered": false, "theme": "light" }, { "default": ($$result2) => renderTemplate` <div class="w-20 h-1 bg-accent mb-6"></div> <p class="text-gray-500 font-body text-sm md:text-base font-light max-w-2xl">
Presentamos nuestras áreas de práctica más solicitadas. Sin embargo, nuestro equipo multidisciplinario está capacitado para asesorarle en una amplia variedad de trámites y procesos legales adicionales según sus necesidades específicas.
</p> ` })} <!-- Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16"> ${finalServices.map((service, index) => renderTemplate`<div class="bg-primary p-6 md:p-8 flex flex-col h-full fade-in-section hover:shadow-2xl transition-shadow duration-300 rounded-sm w-full"${addAttribute(`transition-delay: ${index * 100}ms`, "style")}> <!-- Title --> <h3 class="font-heading text-2xl md:text-3xl lg:text-[2rem] text-white mb-4 md:mb-6 leading-tight font-normal"> ${service.title.replace("Derecho ", "")} </h3> <!-- Divider --> <div class="w-10 md:w-12 h-1 bg-accent mb-4 md:mb-6 opacity-80"></div> <!-- Description --> <p class="text-gray-300 font-body font-light text-sm leading-relaxed mb-6 opacity-90"> ${service.fullDescription} </p> <!-- Features (Bullet points) --> ${service.features && renderTemplate`<ul class="space-y-1.5 md:space-y-2 mb-6 md:mb-8"> ${service.features.map((feature) => renderTemplate`<li class="flex items-start gap-2.5"> <div class="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-accent mt-2 shrink-0"></div> <span class="text-gray-300 font-body text-sm font-light leading-relaxed">${feature}</span> </li>`)} </ul>`} <!-- Separator Line --> <div class="w-full h-px bg-gray-800 mb-6 mt-auto"></div> <!-- Button --> <div> <a${addAttribute(`/servicios/${service.id}`, "href")} class="block w-full text-center py-3 md:py-4 border border-accent text-accent font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-primary transition-all duration-300">
Más Información
</a> </div> </div>`)} </div> </div> </section>`;
}, "C:/Freelance/EyM-page/src/components/sections/services/ServicesOffer.astro", void 0);

const $$Astro = createAstro("https://emyasociados.net");
const $$ServiceList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceList;
  const { class: className } = Astro2.props;
  const targetIds = ["bienes-raices", "comercial", "inmobiliario", "bancario", "fiscal", "patrimonio"];
  const data = servicesData;
  const detailedServices = data.detailed_services || [];
  const services = detailedServices.filter((s) => targetIds.includes(s.id));
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["py-24", className || "bg-white"], "class:list")}> <div class="container mx-auto px-6 md:px-25"> ${renderComponent($$result, "SectionTitle", $$SectionTitle, { "title": "Servicios Legales Especializados", "centered": false, "theme": "light" }, { "default": ($$result2) => renderTemplate` <div class="w-20 h-1 bg-accent mb-6"></div> <p class="text-gray-500 font-body font-light text-lg max-w-4xl leading-relaxed">
Nos enorgullece ofrecer una amplia gama de servicios legales especializados en diversas áreas del derecho. Con un equipo altamente experimentado y comprometido, nos aseguramos de proporcionar soluciones integrales y personalizadas para satisfacer las necesidades de nuestros clientes en cada etapa de sus proyectos y operaciones.
</p> ` })} <!-- Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> ${services.map((service, index) => renderTemplate`<div class="bg-white p-6 md:p-10 flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-out fade-in-section"${addAttribute(`transition-delay: ${index * 100}ms`, "style")}>  <h3 class="font-heading text-xl md:text-2xl text-primary mb-4 md:mb-6"> ${service.title} </h3>  <div class="w-8 md:w-12 h-px bg-accent mb-4 md:mb-6"></div>  <p class="text-gray-500 font-body font-light text-sm leading-relaxed mb-6 md:mb-8 grow"> ${service.fullDescription} </p>  <div class="mt-auto pt-4 md:pt-6"> <a${addAttribute(`/servicios/${service.id}`, "href")} class="block w-full text-center py-3 border border-accent text-accent font-heading text-[10px] md:text-xs uppercase tracking-[0.15em] hover:bg-accent hover:text-primary transition-all duration-300 font-bold">
Más Información
</a> </div> </div>`)} </div> </div> </section>`;
}, "C:/Freelance/EyM-page/src/components/sections/services/ServiceList.astro", void 0);

const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-20 md:py-24 bg-primary text-center px-6 border-b border-gray-800"> <div class="container mx-auto max-w-4xl"> <h2 class="font-heading text-4xl md:text-5xl text-white mb-6">
¿Necesita Asesoría Legal?
</h2> <p class="text-secondary font-body text-lg font-light leading-relaxed mb-10 max-w-3xl mx-auto">
En EM & Asociados, abordamos cada desafío legal con la seriedad y experiencia que su caso merece. Nos comprometemos a brindarle una defensa sólida, estratégica y dedicada. Trabajamos incansablemente para lograr el mejor resultado posible, con transparencia en cada paso del proceso. Su tranquilidad y la protección de sus intereses son nuestra prioridad.
</p> <a href="/contacto" class="inline-block py-4 px-10 bg-accent text-primary font-heading text-sm uppercase tracking-[0.15em] hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl font-bold">
Agendar Consulta
</a> </div> </section>`;
}, "C:/Freelance/EyM-page/src/components/common/CTASection.astro", void 0);

const $$Servicios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Servicios Legales en Guanacaste", "description": "Servicios legales integrales en Liberia y Ca\xF1as. Expertos en Derecho Civil, Corporativo y Notarial en Guanacaste." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "ServicesHero", $$ServicesHero, {})} ${renderComponent($$result2, "ServicesOffer", $$ServicesOffer, {})} ${renderComponent($$result2, "ServiceList", $$ServiceList, {})} ${renderComponent($$result2, "CTASection", $$CTASection, {})} </main> ` })}`;
}, "C:/Freelance/EyM-page/src/pages/servicios.astro", void 0);

const $$file = "C:/Freelance/EyM-page/src/pages/servicios.astro";
const $$url = "/servicios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Servicios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
