import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

// Permitir GET para verificar estado del endpoint
export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({ 
        status: "active", 
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
         return new Response(JSON.stringify({ message: "JSON inválido" }), { status: 400 });
    }

    const { nombre, email, telefono, mensaje, hp_field, areaLegal, provincia, canton, distrito, medioContacto, comoConocio } = body;

    // Anti-Spam
    if (hp_field) {
        return new Response(JSON.stringify({ message: "Enviado" }), { status: 200 });
    }

    // Validation
    if (!nombre || !email || !telefono) {
        return new Response(JSON.stringify({ message: "Faltan campos obligatorios" }), { status: 400 });
    }

    // Recuperación robusta de la API Key para entornos Vercel / Node
    // Verificamos si 'process' existe para evitar crash en entornos Edge/diferentes
    const runtimeEnv = typeof process !== 'undefined' ? process.env : {};
    const apiKey = runtimeEnv.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("ERROR CRÍTICO: RESEND_API_KEY no encontrada en variables de entorno (process.env ni import.meta.env)");
        return new Response(JSON.stringify({ message: "Error de configuración de servidor" }), { status: 500 });
    }

    let resend: Resend;
    try {
        resend = new Resend(apiKey);
    } catch (err) {
         console.error("Error inicializando Resend:", err);
         return new Response(JSON.stringify({ message: "Error interno (Cliente Email)" }), { status: 500 });
    }

    const { error: adminError } = await resend.emails.send({
      from: "Notificación Web <info@emyasociados.net>", 
      to: ["bufete.emyasociados@gmail.com", "brandoncarrilloalvarez569@gmail.com"],
      replyTo: email,
      subject: `Nuevo Mensaje Web: ${nombre}`,
      html: `
            <!DOCTYPE html>
            <html>
                <body style="font-family: 'Lato', sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #091723; border-radius: 8px; overflow: hidden; color: #ffffff;">
                        <div style="padding: 30px; text-align: center; border-bottom: 2px solid #AF9232;">
                            <img src="https://res.cloudinary.com/dkwvaxxdw/image/upload/v1770155113/LOGO_EM_BLANCO_u7ua6f.png" alt="EM & Asociados" style="width: 150px; margin-bottom: 20px;">
                            <h2 style="color: #AF9232; margin: 0; text-transform: uppercase; font-family: 'Times New Roman', serif; letter-spacing: 2px; font-size: 24px;">Nueva Solicitud Web</h2>
                        </div>
                        <div style="padding: 20px; background-color: #0d1f2e;">
                            <p style="font-size: 16px; line-height: 1.5; color: #cbd5e0; margin-bottom: 25px;">
                                Has recibido un nuevo mensaje a través del formulario de contacto. Detalles del cliente potencial:
                            </p>
                            <div style="background-color: #1a2c3b; padding: 20px; border-radius: 6px; border-left: 4px solid #AF9232;">
                                <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #8e9aab;">Nombre del Cliente</p>
                                <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #ffffff;">${nombre}</h3>
                                
                                <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #8e9aab;">Correo Electrónico</p>
                                <p style="margin: 0 0 20px 0; font-size: 16px; color: #AF9232; word-break: break-word;">${email}</p>
                                
                                <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #8e9aab;">Teléfono</p>
                                <div style="margin-top: 5px;">
                                    <span style="font-size: 18px; color: #ffffff; display: block; margin-bottom: 8px;">${telefono}</span>
                                    <a href="https://wa.me/${telefono.replace(/\D/g,'')}" style="background-color: #25D366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: bold; display: inline-block;">WhatsApp &rarr;</a>
                                </div>
                            </div>
                            <div style="margin-top: 30px; background-color: #ffffff; color: #091723; padding: 20px; border-radius: 6px;">
                                <h4 style="margin-top: 0; color: #AF9232; border-bottom: 1px solid #eee; padding-bottom: 10px;">Detalles Adicionales</h4>
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold; color: #555; width: 40%;">Área de Interés:</td>
                                        <td style="padding: 8px 0; text-align: right; width: 60%;">${areaLegal || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold; color: #555;">Ubicación:</td>
                                        <td style="padding: 8px 0; text-align: right;">${provincia || "-"}, ${canton || "-"}, ${distrito || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold; color: #555;">Pref. Contacto:</td>
                                        <td style="padding: 8px 0; text-align: right;">${medioContacto || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold; color: #555;">Fuente:</td>
                                        <td style="padding: 8px 0; text-align: right;">${comoConocio || "-"}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div style="padding: 20px; text-align: center; font-size: 12px; color: #666; background-color: #091723;">
                            <p>&copy; ${new Date().getFullYear()} EYM & Asociados.</p>
                        </div>
                    </div>
                </body>
            </html>
            `
    });

    if (adminError) {
      console.error('Error enviando al admin:', adminError);
      return new Response(JSON.stringify({ message: "Error interno (API Email)" }), { status: 500 });
    }

    // Auto-reply (Safe execution)
    try {
        await resend.emails.send({
            from: "EM & Asociados <info@emyasociados.net>",
            to: [email],
            subject: "Recibimos tu mensaje - EM & Asociados",
            html: `
                <!DOCTYPE html>
                <html>
                    <body style="font-family: 'Lato', sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                            <div style="padding: 30px; text-align: center; background-color: #091723;">
                                <img src="https://res.cloudinary.com/dkwvaxxdw/image/upload/v1770155113/LOGO_EM_BLANCO_u7ua6f.png" alt="EM & Asociados" style="width: 120px;">
                            </div>
                            <div style="padding: 40px 30px; text-align: center;">
                                <h2 style="color: #091723; font-family: 'Times New Roman', serif; margin-bottom: 20px;">Gracias por contactarnos, ${nombre.split(' ')[0]}</h2>
                                <p style="color: #4a5568; line-height: 1.6; margin-bottom: 30px;">
                                    Hemos recibido tu solicitud de información exitosamente. Nuestro equipo legal revisará tus datos y se pondrá en contacto contigo a la brevedad posible.
                                </p>
                                <div style="background-color: #f7fafc; padding: 20px; border-radius: 6px; text-align: left; border: 1px solid #edf2f7;">
                                    <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: #a0aec0; letter-spacing: 1px; font-weight: bold;">TU SOLICITUD:</p>
                                    <p style="margin: 10px 0 5px 0; color: #2d3748;"><strong>Servicio:</strong> ${areaLegal || "Consulta Legal"}</p>
                                    <p style="margin: 0; color: #2d3748;"><strong>Teléfono registrado:</strong> ${telefono}</p>
                                </div>
                                <p style="margin-top: 40px; font-size: 13px; color: #718096;">
                                    Urgencias: <strong>+506 6021 2971</strong>
                                </p>
                            </div>
                            <div style="padding: 20px; text-align: center; background-color: #091723; color: white; font-size: 12px;">
                                <p style="margin:0;">EYM & Asociados - Abogados en Guanacaste</p>
                            </div>
                        </div>
                    </body>
                </html>
                `
        });
    } catch (autoReplyError) {
        console.warn("Aviso: Falló el envío de auto-respuesta:", autoReplyError);
    }

    return new Response(JSON.stringify({ message: "Email enviado con éxito" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });

  } catch (e: any) {
    console.error("ERROR FATAL EN ENDPOINT DE EMAIL:", e);
    return new Response(JSON.stringify({ 
        message: "Error interno del servidor",
        error: e?.message || "Error desconocido"
    }), { status: 500 });
  }
};
