import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, o as Fragment, p as renderSlot, u as unescapeHTML } from './astro/server_Bb7zwkth.mjs';
import 'piccolore';

const $$Astro = createAstro("https://emyasociados.net");
const $$SectionTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionTitle;
  const { title, subtitle, theme = "light", centered = true } = Astro2.props;
  const titleColor = theme === "light" ? "text-primary" : "text-white";
  const subtitleColor = theme === "light" ? "text-primary" : "text-accent";
  const alignmentClass = centered ? "text-center" : "text-left";
  const flexAlignment = centered ? "justify-center" : "justify-start";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["mb-8 md:mb-12 fade-in-section", alignmentClass], "class:list")}> ${subtitle && renderTemplate`<div${addAttribute(["flex items-center gap-3 md:gap-4 mb-3 md:mb-4", flexAlignment], "class:list")}> <div${addAttribute(["h-px w-6 md:w-12 bg-accent", theme === "dark" ? "opacity-50" : ""], "class:list")}></div> <span${addAttribute(["font-heading uppercase tracking-[0.2em] text-[10px] md:text-sm", subtitleColor], "class:list")}> ${subtitle} </span> <div${addAttribute(["h-px w-6 md:w-12 bg-accent", theme === "dark" ? "opacity-50" : ""], "class:list")}></div> </div>`} <h2${addAttribute(["font-heading text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6 leading-[1.15]", titleColor], "class:list")}> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(title)}` })} </h2> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "C:/Freelance/EyM-page/src/components/common/SectionTitle.astro", void 0);

export { $$SectionTitle as $ };
