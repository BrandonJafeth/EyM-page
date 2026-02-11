export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async () => {
  return new Response(JSON.stringify({
    status: "active",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    env_check: {
      has_import_meta: true,
      has_process_env: typeof process !== "undefined" && !!process.env?.RESEND_API_KEY
    }
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  console.log("-> [START] /api/send-email POST received");
  try {
    let Resend;
    try {
      const module = await import('resend');
      Resend = module.Resend;
    } catch (err) {
      console.error("-> [CRITICAL] Failed to import 'resend' package:", err);
      return new Response(JSON.stringify({ message: "Error interno: Dependencia faltante" }), { status: 500 });
    }
    const apiKey = "re_FCNem85N_Ydgjne8KyvGMk7hrFFJJjRc8";
    console.log(`-> [ENV] API Key present? ${!!apiKey}`);
    if (!apiKey) ;
    const resend = new Resend(apiKey);
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error("-> [ERROR] JSON Parse:", e);
      return new Response(JSON.stringify({ message: "JSON inválido" }), { status: 400 });
    }
    const { nombre, email, telefono, mensaje, hp_field, areaLegal, provincia, canton } = body;
    if (hp_field) {
      return new Response(JSON.stringify({ message: "Enviado" }), { status: 200 });
    }
    if (!nombre || !email || !telefono) {
      return new Response(JSON.stringify({ message: "Faltan campos obligatorios" }), { status: 400 });
    }
    console.log("-> [SEND] Attempting to send Admin email...");
    const adminMail = await resend.emails.send({
      from: "Notificación Web <info@emyasociados.net>",
      to: ["bufete.emyasociados@gmail.com", "brandoncarrilloalvarez569@gmail.com"],
      replyTo: email,
      subject: `Nuevo Mensaje Web: ${nombre}`,
      html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Nuevo Mensaje de Contacto</h2>
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Teléfono:</strong> ${telefono}</p>
                    <p><strong>Ubicación:</strong> ${provincia || "-"}, ${canton || "-"}</p>
                    <p><strong>Asunto:</strong> ${areaLegal || "-"}</p>
                </div>
            `
    });
    if (adminMail.error) {
      console.error("-> [ERROR] Resend Admin:", adminMail.error);
      throw new Error(adminMail.error.message);
    }
    console.log("-> [SUCCESS] Admin email sent:", adminMail.data?.id);
    resend.emails.send({
      from: "EM & Asociados <info@emyasociados.net>",
      to: [email],
      subject: "Recibimos tu mensaje - EM & Asociados",
      html: `<p>Hola ${nombre}, hemos recibido tu solicitud. Te contactaremos pronto.</p>`
    }).catch((err) => console.warn("-> [WARN] Auto-reply failed:", err));
    return new Response(JSON.stringify({ message: "Email enviado con éxito" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("-> [CRITICAL GLOBAL FAILURE]:", e);
    return new Response(JSON.stringify({
      message: "Error interno del servidor",
      error: e.message
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
