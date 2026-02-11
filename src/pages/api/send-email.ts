import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("-> Iniciando /api/send-email");
  
  try {
    // 0. Validación de Método
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ message: "Método no permitido" }), { status: 405 });
    }

    // 1. Obtención de Variables de Entorno Segura
    // En Vercel Serverless, 'process' existe. En Edge, no.
    // Usamos una función auxiliar para no romper la ejecución si 'process' no existe.
    const getEnv = (key: string) => {
        // Prioridad 1: Astro Build-time (si se definió al compilar)
        if (import.meta.env[key]) return import.meta.env[key];
        
        // Prioridad 2: Runtime Node.js (Vercel Dashboard Variables)
        try {
            if (typeof process !== 'undefined' && process.env && process.env[key]) {
                return process.env[key];
            }
        } catch (e) {
            // Ignorar ReferenceError si estamos en un entorno restrictivo
        }
        return "";
    };

    const apiKey = getEnv("RESEND_API_KEY");
    
    // Debug limitado (no imprimir la key entera)
    console.log(`-> API Key detectada: ${apiKey ? "SÍ (Longitud: " + apiKey.length + ")" : "NO"}`);
    
    if (!apiKey) {
      console.error("-> CRITICAL: Falta RESEND_API_KEY. Verifica las variables de entorno en Vercel.");
      return new Response(
        JSON.stringify({ message: "Error de configuración (Falta API Key)" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Parseo del Body Seguro
    let body;
    try {
        const text = await request.text();
        if (!text) throw new Error("Body vacío");
        body = JSON.parse(text);
    } catch (e) {
        console.error("-> Error parseando JSON:", e);
        return new Response(
            JSON.stringify({ message: "Datos enviados inválidos" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

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

    // 3. Inicialización de Resend (dentro del try para capturar errores de módulo)
    console.log("-> Inicializando Resend...");
    const resend = new Resend(apiKey);

    // 4. Anti-Spam (Honeypot)
    if (hp_field) {
        console.warn("-> Spam detectado (Honeypot)");
        return new Response(JSON.stringify({ message: "Enviado" }), { status: 200 });
    }

    // 5. Anti-Spam (Tiempo)
    if (form_start_time) {
        const start = parseInt(String(form_start_time), 10);
        const diff = Date.now() - start;
        // Permitimos 1s mínimo para evitar falsos positivos de usuarios rápidos
        if (!isNaN(start) && diff < 1000) { 
             console.warn(`-> Spam detectado (Muy rápido: ${diff}ms)`);
             return new Response(
                JSON.stringify({ message: "Envío demasiado rápido. Intenta de nuevo." }), 
                { status: 429, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    // 6. Validaciones Básicas
    if (!nombre || String(nombre).length < 2 || !email || !String(email).includes('@')) {
        return new Response(
            JSON.stringify({ message: "Datos incompletos o inválidos." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const cleanPhone = telefono ? String(telefono).replace(/\D/g, "") : "";
    const whatsappLink = `https://wa.me/${cleanPhone.length === 8 ? '506' + cleanPhone : cleanPhone}`;
    const subjectLine = `Solicitud Web: ${areaLegal || "General"} - ${nombre}`;

    console.log("-> Intentando enviar correo Admin...");

    // 7. Envio de Correos
    const { data, error } = await resend.emails.send({
        from: "Notificación Web <info@emyasociados.net>", 
        to: ["bufete.emyasociados@gmail.com", "brandoncarrilloalvarez569@gmail.com"],
        replyTo: email,
        subject: subjectLine,
        html: `
            <div style="font-family: sans-serif; background: #f4f4f5; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7;">
                    <div style="background: #091723; padding: 20px; text-align: center; color: #fff;">
                       <h2 style="margin:0; color: #cca43b;">Nueva Solicitud Web</h2>
                    </div>
                    <div style="padding: 24px;">
                        <p style="margin-top:0;"><strong>Cliente:</strong> ${nombre}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Teléfono:</strong> <a href="tel:${telefono}">${telefono}</a> <a href="${whatsappLink}" style="color: #22c55e; margin-left: 8px; font-weight: bold;">[WhatsApp]</a></p> 
                        <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 16px 0;">
                        <p><strong>Área:</strong> ${areaLegal || "-"}</p>
                        <p><strong>Ubicación:</strong> ${provincia || "-"}, ${canton || "-"}</p>
                        <p><strong>Contacto Pref.:</strong> ${medioContacto || "-"}</p>
                        <p><strong>Fuente:</strong> ${comoConocio || "-"}</p>
                    </div>
                    <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #666;">
                        EyM & Asociados
                    </div>
                </div>
            </div>
        `
    });

    if (error) {
        console.error("-> Error Resend API:", error);
        throw new Error(error.message);
    }

    console.log("-> Correo Admin enviado OK. ID:", data?.id);

    // Auto-Respuesta (No bloqueante)
    try {
        await resend.emails.send({
            from: "EM & Asociados <info@emyasociados.net>",
            to: [email],
            subject: "Recibimos tu solicitud - EM & Asociados",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; color: #333;">
                    <h2 style="color: #091723;">Hola ${String(nombre).split(' ')[0]}</h2>
                    <p>Hemos recibido tu solicitud correctamente. Uno de nuestros abogados revisará tu caso y te contactará pronto.</p>
                    <p>Si es una emergencia, llámanos: <strong>+506 6021 2971</strong></p>
                </div>
            `
        });
    } catch (e) {
        console.warn("-> Falló Auto-Respuesta (No crítico):", e);
    }

    return new Response(
      JSON.stringify({ message: "Email enviado con éxito", id: data?.id }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (globalError: any) {
    console.error("-> GLOBAL CRASH /api/send-email:", globalError);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor",
        debug: globalError.message // Solo para diagnóstico
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};
