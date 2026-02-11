import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("Processing POST request to /api/send-email");
  
  try {
    // 0. Check Method
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ message: "Método no permitido" }), { status: 405 });
    }

    // 1. Safe Environment Variable Access
    // In Vercel Serverless, import.meta.env is replaced at build time, but process.env is runtime.
    // We check both to be safe.
    const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("CRITICAL: RESEND_API_KEY is missing via import.meta.env and process.env");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor (API Key faltante)" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Safe Body Parsing
    let body: any = {};
    try {
        const rawBody = await request.text();
        if (!rawBody) {
             throw new Error("Empty body");
        }
        body = JSON.parse(rawBody);
    } catch (e: any) {
        console.error("Error parsing JSON body:", e.message);
        return new Response(
            JSON.stringify({ message: "Solicitud inválida (JSON Incorrecto)" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    // Destructure
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

    // 3. Initialize Resend safely
    let resend;
    try {
        resend = new Resend(apiKey);
    } catch (e: any) {
        console.error("Error initializing Resend client:", e);
        return new Response(
            JSON.stringify({ message: "Error interno del servicio de correo" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    // 4. Anti-Spam (Honeypot)
    if (hp_field) {
        console.warn(`Spam detected (Honeypot): ${email}`);
        return new Response(
            JSON.stringify({ message: "Email enviado con éxito" }), 
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    // 5. Anti-Spam (Time-based)
    if (form_start_time) {
        const startTime = parseInt(String(form_start_time), 10);
        const now = Date.now();
        // Check if actually a number
        if (!isNaN(startTime)) {
            const diff = now - startTime;
            if (diff < 1500) { // Lowered to 1.5s to be less aggressive with real users
                console.warn(`Spam detected (Too fast): ${diff}ms`);
                return new Response(
                    JSON.stringify({ message: "Envío demasiado rápido. Intenta de nuevo." }), 
                    { status: 429, headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    // 6. Validation
    if (!nombre || String(nombre).trim().length < 2) {
        return new Response(
            JSON.stringify({ message: "Nombre muy corto." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email))) {
        return new Response(
            JSON.stringify({ message: "Correo inválido." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const cleanPhone = telefono ? String(telefono).replace(/\D/g, "") : "";
    if (cleanPhone.length < 8) {
        return new Response(
            JSON.stringify({ message: "Teléfono inválido (min 8 dígitos)." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
    
    // Cookie-Based Rate Limit
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader && cookieHeader.includes("eym_submitted=true")) {
         return new Response(
            JSON.stringify({ message: "Ya enviaste un mensaje recientemente." }),
            { status: 429, headers: { "Content-Type": "application/json" } }
        );       
    }

    const whatsappLink = `https://wa.me/${cleanPhone.length === 8 ? '506' + cleanPhone : cleanPhone}`;
    const subjectLine = `Solicitud Web: ${areaLegal || "General"} - ${nombre}`;

    // 7. Send Email to ADMIN
    try {
        // Prepare notification email
        const { error } = await resend.emails.send({
            from: "Notificación Web <info@emyasociados.net>", 
            to: ["bufete.emyasociados@gmail.com", "brandoncarrilloalvarez569@gmail.com"],
            replyTo: email,
            subject: subjectLine,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: sans-serif; background: #f3f4f6; margin: 0; padding: 20px; }
                    .card { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    h1 { color: #091723; font-size: 18px; margin-top: 0; }
                    .field { margin-bottom: 10px; }
                    .label { font-weight: bold; font-size: 12px; color: #666; text-transform: uppercase; }
                    .value { font-size: 16px; color: #333; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Nueva Solicitud Web</h1>
                    <div class="field"><div class="label">Nombre</div><div class="value">${nombre}</div></div>
                    <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
                    <div class="field"><div class="label">Teléfono</div><div class="value">${telefono} <a href="${whatsappLink}">[WA]</a></div></div>
                    <div class="field"><div class="label">Ubicación</div><div class="value">${provincia || "-"}, ${canton || "-"}, ${distrito || "-"}</div></div>
                    <div class="field"><div class="label">Área</div><div class="value">${areaLegal || "-"}</div></div>
                    <div class="field"><div class="label">Conoció por</div><div class="value">${comoConocio || "-"}</div></div>
                </div>
            </body>
            </html>
            `
        });

        if (error) {
            console.error("Resend API returned error:", error);
            throw new Error(error.message);
        }
    } catch (mailError: any) {
        console.error("FAILED to send admin email:", mailError);
        return new Response(
            JSON.stringify({ 
                message: "Error enviando el correo. Por favor contáctanos por WhatsApp." 
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    // 8. Auto-Reply to Client (Fire and forget, soft error handling)
    try {
        await resend.emails.send({
            from: "EM & Asociados <info@emyasociados.net>",
            to: [email],
            subject: "Recibimos tu solicitud - EM & Asociados",
            html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #091723;">Gracias ${String(nombre).split(' ')[0]}</h2>
                <p>Hemos recibido tu mensaje. Te contactaremos pronto.</p>
                <p><small>Si es urgente, llama al +506 6021 2971</small></p>
            </div>
            `
        });
    } catch (ignore) {
        console.warn("Auto-reply failed (non-critical):", ignore);
    }

    // Success Response
    return new Response(
      JSON.stringify({ message: "Email enviado con éxito" }),
      { 
        status: 200,
        headers: { 
            "Content-Type": "application/json",
            "Set-Cookie": `eym_submitted=true; Path=/; Max-Age=120; SameSite=Strict`
        }
      }
    );

  } catch (globalError: any) {
    console.error("GLOBAL CRASH in /api/send-email:", globalError);
    // Even in a crash, try to return valid JSON
    return new Response(
      JSON.stringify({
        message: "Error crítico del servidor. Intenta de nuevo.",
        details: globalError.message || String(globalError)
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};
