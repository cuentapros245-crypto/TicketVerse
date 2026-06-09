import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// Herramientas avanzadas de Passport para el inicio de sesión flotante por Popup
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Carga las variables desde el archivo .env si existe
dotenv.config();

const app = express();

// Configuración de CORS autorizada para entornos React locales
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de sesiones requerido para el correcto funcionamiento de Passport
app.use(session({
  secret: 'ticketverse_secreto_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialización obligatoria de sesiones
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// CONFIGURACIÓN DE PASSPORT: Usa tus credenciales de Google Cloud Console
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "816373363249-bqb4evdmbabobs4f0eg4pplml56jfgdr.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// 📬 CONFIGURACIÓN DEL EMISOR NODEMAILER
const MI_CORREO = process.env.EMAIL_USER || "cuentapros245@gmail.com"; 
const MI_CLAVE_NUEVA = process.env.EMAIL_PASS || "jtuujqlsfvtczffg"; 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MI_CORREO, 
    pass: MI_CLAVE_NUEVA  
  }
});

// Mensaje interno de diagnóstico al iniciar la API
transporter.verify((error) => {
  if (error) {
    console.error('⚠️ Error de conexión SMTP: Credenciales denegadas o no reconocidas por Google.');
  } else {
    console.log('📬 ¡Servidor de correos sincronizado y listo para despachar mensajes!');
  }
});

// =========================================================================
// 🔴 ENDPOINTS DE GOOGLE PASSPORT (POPUP DE REACT)
// =========================================================================

// 1. Abre el Popup y obliga a Google a mostrar el menú de gestión de cuentas
app.get('/api/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  // 🔐 CAMBIO DE SEGURIDAD CORREGIDO: Dejamos solo select_account para que aparezca "Quita una cuenta"
  prompt: 'select_account', 
  accessType: 'offline'
}));

// 2. Procesa la respuesta de Google y le manda los datos a React de forma cruzada
app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/autenticacion' }),
  (req, res) => {
    const nombreUsuario = req.user?.displayName || "Usuario Google";
    const correoUsuario = req.user?.emails?.[0]?.value || "";

    // Enviamos el script HTML al Popup para sincronizar con la ventana madre de React
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Autenticando...</title>
      </head>
      <body style="background: #111217; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <div style="text-align: center;">
          <h2 style="color: #ff0055;">¡Autenticación Exitosa!</h2>
          <p>Sincronizando perfil con Ticketverse, por favor espera...</p>
        </div>

        <script>
          window.opener.postMessage({ 
            tipo: 'AUTH_SUCCESS', 
            usuario: { 
              nombre: "${nombreUsuario}", 
              correo: "${correoUsuario}" 
            } 
          }, 'http://localhost:5173'); 
        </script>
      </body>
      </html>
    `);
  }
);

// 3. Endpoint para cerrar la sesión local de Express y revocar Passport
app.get('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    
    req.session.destroy((destroyErr) => {
      if (destroyErr) return res.status(500).json({ success: false, error: destroyErr.message });
      
      res.status(200).json({ success: true, mensaje: "Sesión cerrada localmente de manera segura." });
    });
  });
});

// 📌 ENDPOINT SECUNDARIO: Recibe las peticiones desde el formulario para envíos masivos/alertas
app.post('/api/correos', async (req, res) => {
  console.log('📥 Solicitud de envío masivo recibida en el backend.');
  const { email, asunto, contenido } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      error: 'El campo de correo electrónico de destino es obligatorio.' 
    });
  }

  const listaCorreos = email
    .split(',')
    .map(correo => correo.trim())
    .filter(correo => correo !== '')
    .join(', ');

  const opcionesCorreo = {
    from: `"Administración TicketVerse" <${MI_CORREO}>`,
    to: MI_CORREO,         
    bcc: listaCorreos,     
    subject: asunto || 'Aviso de Plataforma TicketVerse',
    text: contenido || '',
    html: `
      <div style="font-family: sans-serif; padding: 30px; background-color: #111217; color: #ffffff; border-radius: 16px; border: 2px solid #ff0055; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 15px rgba(255, 0, 85, 0.2);">
        <h2 style="color: #ff0055; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 0;">📢 Notificación de TicketVerse</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #e0e0e0; white-space: pre-line;">${contenido}</p>
        <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;">
        <p style="font-size: 11px; color: #666; text-align: center; margin-bottom: 0;">Este correo automatizado se generó a través de tu aplicación local localhost.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(opcionesCorreo);
    console.log(`✅ Correo masivo enviado con éxito [ID: ${info.messageId}]`);
    return res.status(200).json({ success: true, mensaje: 'El correo ha sido enviado y despachado de forma exitosa.' });
  } catch (error) {
    console.error('❌ Falla interna en Nodemailer:', error.message);
    return res.status(500).json({ success: false, error: 'Falla del servidor SMTP al procesar la entrega del mensaje.' });
  }
});

// =========================================================================
// 🎟️ ENDPOINT PARA ENVIAR COMPROBANTE DE COMPRA INDIVIDUAL
// =========================================================================
app.post('/api/compra-exitosa', async (req, res) => {
  console.log('📥 Solicitud de ticket de compra recibida en el backend.');
  const { email, nombreUsuario, evento, cantidad, total } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      error: 'El correo electrónico del comprador es obligatorio.' 
    });
  }

  const opcionesCorreoTicket = {
    from: `"TicketVerse Store" <${MI_CORREO}>`,
    to: email.trim(), 
    subject: `🎟️ ¡Tu compra está lista! Tus entradas para ${evento || 'el evento'}`,
    html: `
      <div style="font-family: sans-serif; padding: 30px; background-color: #111217; color: #ffffff; border-radius: 16px; border: 2px solid #ff0055; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 15px rgba(255, 0, 85, 0.2);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #ff0055; margin: 0; font-size: 26px; letter-spacing: 2px;">TICKETVERSE</h1>
          <span style="background-color: rgba(255, 0, 85, 0.1); color: #ff0055; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; display: inline-block; margin-top: 5px;">COMPRA CONFIRMADA</span>
        </div>
        <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">¡Hola, ${nombreUsuario || 'Usuario'}!</h2>
        <p style="font-size: 14px; color: #b3b3b3; line-height: 1.5;">Tu transacción ha finalizado de forma satisfactoria. A continuación adjuntamos los detalles oficiales de tus entradas digitales:</p>
        <div style="background-color: #181920; padding: 20px; border-left: 4px solid #ff0055; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff;"><strong style="color: #ff0055;">Evento:</strong> ${evento || 'Evento TicketVerse'}</p>
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff;"><strong style="color: #ff0055;">Cantidad:</strong> ${cantidad || 1} tickets</p>
          <p style="margin: 0; font-size: 14px; color: #ffffff;"><strong style="color: #ff0055;">Monto Total:</strong> $${total || '0.00'}</p>
        </div>
        <div style="text-align: center; background: #222530; padding: 12px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 12px; color: #a0a0a0; margin: 0;">Presenta este correo digital en el control de acceso del recinto.</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #222; margin: 25px 0;">
        <p style="font-size: 10px; color: #555; text-align: center; margin-bottom: 0;">© 2026 TicketVerse Localhost App. Todos los derechos reservados.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(opcionesCorreoTicket);
    console.log(`✅ Comprobante de ticket enviado con éxito a: ${email} [ID: ${info.messageId}]`);
    return res.status(200).json({ success: true, mensaje: 'El comprobante ha sido despachado al cliente.' });
  } catch (error) {
    console.error('❌ Error crítico en Nodemailer al procesar la compra:', error.message);
    return res.status(500).json({ success: false, error: 'Error del servidor al intentar mandar la confirmación.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 API activa y escuchando peticiones en: http://localhost:${PORT}`);
});
