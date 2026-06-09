import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// 🔌 CONEXIÓN AL .ENV: Lee las variables del archivo de configuración
dotenv.config();

const app = express();

// Captura dinámica mapeada 100% con tu archivo .env
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.TUNNEL_URL_5000 || `http://localhost:${PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${BACKEND_URL}/api/auth/google/callback`;

// Configuración de CORS autorizada
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de sesiones para Passport
app.use(session({
  secret: 'ticketverse_secreto_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialización de sesiones
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// 🔐 PASSPORT CONECTADO AL .ENV: Extrae las credenciales del archivo automáticamente
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: REDIRECT_URI
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// 📬 NODEMAILER CONECTADO AL .ENV: Extrae tus cuentas del archivo automáticamente
const MI_CORREO = process.env.EMAIL_USER; 
const MI_CLAVE_NUEVA = process.env.EMAIL_PASS; 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MI_CORREO, 
    pass: MI_CLAVE_NUEVA  
  }
});

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

// 1. Abre el Popup de Google Auth
app.get('/api/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account', 
  accessType: 'offline'
}));

// 2. Procesa la respuesta de Google y sincroniza el éxito con el Frontend
app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/autenticacion` }),
  (req, res) => {
    const nombreUsuario = req.user?.displayName || "Usuario Google";
    const correoUsuario = req.user?.emails?.[0]?.value || "";

    // Retorna el script inyectando dinámicamente la URL real de tu cliente React
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
          }, "${FRONTEND_URL}"); 
        </script>
      </body>
      </html>
    `);
  }
);

// 3. Endpoint para cerrar la sesión local de Express
app.get('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    
    req.session.destroy((destroyErr) => {
      if (destroyErr) return res.status(500).json({ success: false, error: destroyErr.message });
      
      res.status(200).json({ success: true, mensaje: "Sesión cerrada localmente de manera segura." });
    });
  });
});

// 📌 ENDPOINT SECUNDARIO: Envíos masivos/alertas
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
        <p style="font-size: 11px; color: #666; text-align: center; margin-bottom: 0;">Este correo automatizado se generó a través de la aplicación oficial.</p>
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
        <p style="font-size: 10px; color: #555; text-align: center; margin-bottom: 0;">© 2026 TicketVerse App. Todos los derechos reservados.</p>
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

// Inicialización del servidor apuntando a la variable del puerto del .env
app.listen(PORT, () => {
  console.log(`🚀 API activa y escuchando peticiones en la dirección: ${BACKEND_URL}`);
});