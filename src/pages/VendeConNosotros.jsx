import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VendeConNosotros() {
  const navigate = useNavigate();
  const [completado, setCompletado] = useState(false);

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#ffffff', minHeight: '100vh', padding: '4rem', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button onClick={() => navigate('/')} style={{ color: '#00ff66', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', marginBottom: '2rem' }}>
          ← Volver a Cartelera
        </button>
        
        <h1 style={{ fontSize: '32px', fontWeight: '900', borderLeft: '5px solid #00ff66', paddingLeft: '15px', marginBottom: '1rem',color: '#fff6f6', }}>🚀 VENDE CON NOSOTROS </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2.5rem', lineHeight: '1.5' }}>¿Eres productor u organizas conciertos, conferencias o festivales? Controla tus ventas con el software de emisión de entradas más rápido del mercado.</p>
        
        {completado ? (
          <div style={{ backgroundColor: 'rgba(0, 255, 102, 0.05)', border: '1px solid #00ff66', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ color: '#00ff66', margin: '0 0 0.5rem 0' }}>¡Registro Exitoso!</h3>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>Un ejecutivo del equipo comercial revisará los detalles de tu evento para darte de alta en la plataforma.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setCompletado(true); }} style={{ backgroundColor: '#111217', border: '1px solid #222530', padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Nombre del Organizador o Promotora</label>
              <input type="text" required style={{ backgroundColor: '#222530', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Teléfono de Contacto</label>
              <input type="tel" required style={{ backgroundColor: '#222530', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Nombre del Evento a Registrar</label>
              <input type="text" required placeholder="Ej: Festival Rock de Invierno 2026" style={{ backgroundColor: '#222530', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#ff0055', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '0.5rem' }}>
              Dar de Alta Evento
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
