import React, { useState } from 'react';
import { Send, Mail, Type, AlignLeft } from 'lucide-react';
import { emailService } from '../servicie/emailService';

export default function Enviar() {
  const [correo, setCorreo] = useState({ to: '', subject: '', text: '' });
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState(null);

  const manejarCambio = (e) => {
    setCorreo({ ...correo, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setStatus(null);
    try {
      // 🔄 Mapeamos los datos para que coincidan exactamente con lo que espera server.js
      const payload = {
        email: correo.to,
        asunto: correo.subject,
        contenido: correo.text
      };

      // Consumimos el servicio enviando el formato correcto
      await emailService.sendEmail(payload); 
      
      setStatus({ success: true, msg: '🚀 ¡Mensaje enviado con éxito!' });
      setCorreo({ to: '', subject: '', text: '' }); // Limpia el formulario
    } catch (err) {
      setStatus({ success: false, msg: '❌ Error al enviar. Verifica tu terminal backend.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ backgroundColor: '#111217', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #222530' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#ff0055' }}>📢 Panel de Mailing</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Envía alertas o tickets digitales a tus usuarios</p>
        </div>

        <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* DESTINATARIO */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 'bold' }}>CORREO DEL CLIENTE</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" name="to" value={correo.to} onChange={manejarCambio} required placeholder="cliente@correo.com" style={{ width: '100%', padding: '12px 12px 12px 40px', backgroundColor: '#1c1e24', border: '1px solid #222530', borderRadius: '6px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          {/* ASUNTO */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 'bold' }}>ASUNTO DEL MENSAJE</label>
            <div style={{ position: 'relative' }}>
              <Type size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" name="subject" value={correo.subject} onChange={manejarCambio} required placeholder="🎟️ Tu Ticket de TicketVerse listo" style={{ width: '100%', padding: '12px 12px 12px 40px', backgroundColor: '#1c1e24', border: '1px solid #222530', borderRadius: '6px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          {/* CUERPO DEL CORREO */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 'bold' }}>CONTENIDO DEL MENSAJE</label>
            <div style={{ position: 'relative' }}>
              <AlignLeft size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              <textarea name="text" value={correo.text} onChange={manejarCambio} required placeholder="Escribe el mensaje o confirmación de compra aquí..." rows="5" style={{ width: '100%', padding: '12px 12px 12px 40px', backgroundColor: '#1c1e24', border: '1px solid #222530', borderRadius: '6px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none', resize: 'vertical', fontFamily: 'sans-serif' }}></textarea>
            </div>
          </div>

          {status && (
            <p style={{ textAlign: 'center', fontSize: '13px', color: status.success ? '#10b981' : '#ef4444', fontWeight: '600', margin: 0 }}>
              {status.msg}
            </p>
          )}

          <button type="submit" disabled={enviando} style={{ backgroundColor: '#ff0055', color: '#fff', border: 'none', padding: '14px', borderRadius: '30px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem', boxShadow: '0 4px 15px rgba(255, 0, 85, 0.4)', opacity: enviando ? 0.7 : 1 }}>
            <Send size={18} /> {enviando ? 'ENVIANDO...' : 'ENVIAR NOTIFICACIÓN'}
          </button>
        </form>

      </div>
    </div>
  );
}
