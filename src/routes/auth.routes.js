const express = require('express');
const router = express.Router();
const passport = require('passport');

// 1. Ruta que inicia el proceso (Esta es la que llama tu botón del frontend)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. 🔴 RUTA DEL CALLBACK: Aquí es exactamente donde va el código
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/autenticacion' }),
  (req, res) => {
    // req.user contiene los datos que Google le devolvió a tu servidor
    const nombreUsuario = req.user.displayName || req.user.nombre || "Usuario Google";
    const correoUsuario = req.user.emails?.[0]?.value || req.user.correo || "";

    // Enviamos el HTML con el script que se ejecutará DENTRO de la ventana flotante (Popup)
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Autenticando...</title>
      </head>
      <body style="background: #111217; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <div style="text-align: center;">
          <h2>¡Autenticación Exitosa!</h2>
          <p>Sincronizando con Ticketverse, por favor espera...</p>
        </div>

        <script>
          // window.opener es la ventana de React que abrió este Popup.
          // Le enviamos los datos del usuario de forma segura a través de postMessage.
          window.opener.postMessage({ 
            tipo: 'AUTH_SUCCESS', 
            usuario: { 
              nombre: "${nombreUsuario}", 
              correo: "${correoUsuario}" 
            } 
          }, 'http://localhost:5173'); // ⚠️ OJO: Cambia 5173 por el puerto real de tu React (Vite usa 5173)
        </script>
      </body>
      </html>
    `);
  }
);

module.exports = router;
