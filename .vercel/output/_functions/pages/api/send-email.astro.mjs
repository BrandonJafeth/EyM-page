import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const apiKey = "re_FCNem85N_Ydgjne8KyvGMk7hrFFJJjRc8";
    if (!apiKey) ;
    const resend = new Resend(apiKey);
    const body = await request.json();
    const {
      nombre,
      email,
      telefono,
      provincia,
      canton,
      distrito,
      areaLegal,
      comoConocio,
      medioContacto,
      hp_field,
      form_start_time
    } = body;
    if (hp_field) {
      console.warn(`Spam detected (Honeypot): ${email}`);
      return new Response(
        JSON.stringify({ message: "Email enviado con éxito" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (form_start_time) {
      const startTime = parseInt(form_start_time);
      const now = Date.now();
      const diff = now - startTime;
      if (!isNaN(startTime) && diff < 3e3) {
        console.warn(`Spam detected (Too fast): ${diff}ms`);
        return new Response(
          JSON.stringify({ message: "Envío demasiado rápido. Por favor intenta de nuevo en unos segundos." }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    if (!nombre || nombre.length < 2) {
      return new Response(
        JSON.stringify({ message: "Nombre inválido o muy corto." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Correo electrónico inválido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const cleanPhone = telefono ? telefono.replace(/\D/g, "") : "";
    if (cleanPhone.length < 8) {
      return new Response(
        JSON.stringify({ message: "El teléfono debe tener al menos 8 dígitos." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader && cookieHeader.includes("eym_submitted=true")) {
      return new Response(
        JSON.stringify({ message: "Ya has enviado un mensaje recientemente. Espera un momento." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    const whatsappLink = `https://wa.me/${cleanPhone.length === 8 ? "506" + cleanPhone : cleanPhone}`;
    const subjectLine = `Nueva Solicitud: ${areaLegal || "General"} - ${nombre}`;
    const emailToAdmin = await resend.emails.send({
      from: "Notificación Web <info@emyasociados.net>",
      to: ["brandoncarrilloalvarez569@gmail.com"],
      replyTo: email,
      subject: subjectLine,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Solicitud - EYM & Asociados</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6;">
              <tr>
                <td align="center" style="padding: 0;">
                  <!-- Container Principal - Width 100% en movil -->
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 0 auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Header Navy -->
                    <tr>
                      <td style="background-color: #091723; padding: 30px 20px; text-align: center;">
                        <img src="https://res.cloudinary.com/dkwvaxxdw/image/upload/v1770155113/LOGO_EM_BLANCO_u7ua6f.png" alt="EYM & Asociados" width="140" style="display: block; margin: 0 auto; max-width: 100%; height: auto;">
                        <h1 style="color: #AF9232; margin-top: 15px; margin-bottom: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px;">Nueva Solicitud Web</h1>
                      </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                      <td style="padding: 20px;">
                        <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                          Has recibido un nuevo mensaje a través del formulario de contacto del sitio web. A continuación, los detalles del cliente potencial:
                        </p>

                        <!-- Contact Card (DARK MODE STYLE como foto 1) -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a202c; border-radius: 8px; margin-bottom: 25px; overflow: hidden;">
                          <tr>
                            <td style="padding: 20px;">
                              <!-- Nombre -->
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td style="padding-bottom: 12px; border-bottom: 1px solid #2d3748;">
                                    <span style="display: block; color: #a0aec0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Nombre del Cliente</span>
                                    <span style="display: block; color: #ffffff; font-size: 16px; font-weight: 600; margin-top: 5px;">${nombre}</span>
                                  </td>
                                </tr>
                                <!-- Email -->
                                <tr>
                                  <td style="padding: 12px 0; border-bottom: 1px solid #2d3748;">
                                    <span style="display: block; color: #a0aec0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Correo Electrónico</span>
                                    <a href="mailto:${email}" style="display: block; color: #AF9232; font-size: 15px; text-decoration: none; margin-top: 5px; word-break: break-all;">${email}</a>
                                  </td>
                                </tr>
                                <!-- Teléfono -->
                                <tr>
                                  <td style="padding-top: 12px;">
                                    <span style="display: block; color: #a0aec0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Teléfono</span>
                                    <div style="margin-top: 5px;">
                                      <a href="tel:${telefono}" style="color: #ffffff; font-size: 15px; text-decoration: none; margin-right: 15px;">${telefono}</a>
                                      <a href="${whatsappLink}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold;">WhatsApp &rarr;</a>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Details Section (Light) -->
                        <h2 style="color: #091723; font-family: 'Times New Roman', Times, serif; font-size: 16px; border-bottom: 2px solid #AF9232; padding-bottom: 5px; margin: 0 0 15px 0;">Detalles Adicionales</h2>
                        
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="40%" style="vertical-align: top; padding: 6px 0; font-weight: bold; color: #091723; border-bottom: 1px solid #f3f4f6; font-size: 13px;">Área de Interés:</td>
                            <td style="vertical-align: top; padding: 6px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6; font-size: 13px; text-transform: uppercase;">${areaLegal || "General"}</td>
                          </tr>
                          <tr>
                            <td width="40%" style="vertical-align: top; padding: 6px 0; font-weight: bold; color: #091723; border-bottom: 1px solid #f3f4f6; font-size: 13px;">Ubicación:</td>
                            <td style="vertical-align: top; padding: 6px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6; font-size: 13px;">${provincia || "-"}, ${canton || "-"}, ${distrito || "-"}</td>
                          </tr>
                          <tr>
                            <td width="40%" style="vertical-align: top; padding: 6px 0; font-weight: bold; color: #091723; border-bottom: 1px solid #f3f4f6; font-size: 13px;">Pref. Contacto:</td>
                            <td style="vertical-align: top; padding: 6px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6; font-size: 13px;">${medioContacto || "Cualquiera"}</td>
                          </tr>
                          <tr>
                            <td width="40%" style="vertical-align: top; padding: 6px 0; font-weight: bold; color: #091723; border-bottom: 1px solid #f3f4f6; font-size: 13px;">Fuente:</td>
                            <td style="vertical-align: top; padding: 6px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6; font-size: 13px;">${comoConocio || "-"}</td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #091723; padding: 15px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 10px; margin: 0;">
                          Este correo fue enviado desde el sitio web de EYM & Asociados.<br>
                          &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} EYM & Asociados.
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
    });
    if (emailToAdmin.error) {
      console.error("Error Admin Email:", emailToAdmin.error);
      throw new Error("No se pudo enviar la notificación al administrador: " + emailToAdmin.error.message);
    }
    const emailToClient = await resend.emails.send({
      from: "EYM & Asociados <info@emyasociados.net>",
      to: [email],
      // Al correo del cliente
      subject: "Hemos recibido tu solicitud - EYM & Asociados",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recibido - EYM & Asociados</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #091723; padding: 40px 0; text-align: center;">
                        <img src="https://res.cloudinary.com/dkwvaxxdw/image/upload/v1770155113/LOGO_EM_BLANCO_u7ua6f.png" alt="EYM & Asociados" width="150" style="display: block; margin: 0 auto;">
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px; text-align: center;">
                        <h2 style="color: #091723; font-family: serif; margin-bottom: 20px;">Gracias por contactarnos, ${nombre.split(" ")[0]}</h2>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                          Hemos recibido tu solicitud de información exitosamente. Nuestro equipo legal revisará tus datos y se pondrá en contacto contigo a la brevedad posible (usualmente en menos de 24 horas hábiles).
                        </p>
                        
                        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 30px;">
                            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Tu solicitud:</p>
                            <p style="margin: 5px 0; color: #1f2937;"><strong>Servicio:</strong> ${areaLegal || "Asesoría General"}</p>
                            <p style="margin: 5px 0; color: #1f2937;"><strong>Teléfono registrado:</strong> ${telefono}</p>
                        </div>

                        <p style="color: #6b7280; font-size: 14px;">
                          Si tienes alguna consulta urgente, puedes llamarnos directamente al <strong>+506 6021 2971</strong> o al <strong>+506 8705 3112</strong>.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #091723; padding: 20px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} EYM & Asociados.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
    });
    if (emailToClient.error) {
      console.warn("No se pudo enviar el auto-reply al cliente:", emailToClient.error);
    }
    return new Response(
      JSON.stringify({
        message: "Email enviado con éxito",
        id: emailToAdmin.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Set cookie for rate limiting (expires in 2 minutes)
          "Set-Cookie": `eym_submitted=true; Path=/; Max-Age=120; SameSite=Strict`
        }
      }
    );
  } catch (e) {
    console.error("Critical Server Error:", e);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor: " + (e.message || "Unknown")
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
