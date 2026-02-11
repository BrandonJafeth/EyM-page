import type { APIRoute } from "astro";
import { Resend } from "resend";

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
        // Resolving API Key
        const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error("-> [ERROR] API Key faltante");
            return new Response(JSON.stringify({ message: "Error interno: Falta configuración de correo" }), { status: 500 });
        }

        const resend = new Resend(apiKey);
        
        // Parsing Body
        let body;
        try {
            body = await request.json();
        } catch (e) {
            console.error("-> [ERROR] JSON Parse:", e);
            return new Response(JSON.stringify({ message: "JSON inválido" }), { status: 400 });
        }

        const { nombre, email, telefono, mensaje, hp_field, areaLegal, provincia, canton } = body;

        // Anti-Spam
        if (hp_field) {
            return new Response(JSON.stringify({ message: "Enviado" }), { status: 200 });
        }

        // Validation
        if (!nombre || !email || !telefono) {
            return new Response(JSON.stringify({ message: "Faltan campos obligatorios" }), { status: 400 });
        }

        // Sending Admin Email
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

        // Auto-reply (fire & forget)
        resend.emails.send({
            from: "EM & Asociados <info@emyasociados.net>",
            to: [email],
            subject: "Recibimos tu mensaje - EM & Asociados",
            html: `<p>Hola ${nombre}, hemos recibido tu solicitud. Te contactaremos pronto.</p>`
        }).catch(err => console.warn("-> [WARN] Auto-reply failed:", err));

        return new Response(JSON.stringify({ message: "Email enviado con éxito" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (e: any) {
        console.error("-> [CRITICAL GLOBAL FAILURE]:", e);
        return new Response(JSON.stringify({ 
            message: "Error interno del servidor",
            error: e.message 
        }), { status: 500 });
    }
};
