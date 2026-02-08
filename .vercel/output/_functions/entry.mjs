import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DJld9z1k.mjs';
import { manifest } from './manifest_DeuxJLI-.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/send-email.astro.mjs');
const _page2 = () => import('./pages/aviso-legal.astro.mjs');
const _page3 = () => import('./pages/contacto.astro.mjs');
const _page4 = () => import('./pages/equipo/_id_.astro.mjs');
const _page5 = () => import('./pages/privacidad.astro.mjs');
const _page6 = () => import('./pages/servicios.astro.mjs');
const _page7 = () => import('./pages/sobre-nosotros.astro.mjs');
const _page8 = () => import('./pages/terminos.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/send-email.ts", _page1],
    ["src/pages/aviso-legal.astro", _page2],
    ["src/pages/contacto.astro", _page3],
    ["src/pages/equipo/[id].astro", _page4],
    ["src/pages/privacidad.astro", _page5],
    ["src/pages/servicios.astro", _page6],
    ["src/pages/sobre-nosotros.astro", _page7],
    ["src/pages/terminos.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "efde93e9-eb65-41fa-95a5-7077ac6b1fdb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
