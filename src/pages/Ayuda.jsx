// src/pages/Ayuda.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ayuda() {
  const navigate = useNavigate();

  // 1. ESTADOS PARA CAPTURAR EL FORMULARIO DE SOPORTE
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [problema, setProblema] = useState('');
  const [enviando, setEnviando] = useState(false);

  // 2. FUNCIÓN DE CONEXIÓN CON TU SERVER.JS
  const manejarSoporte = async (e) => {
    e.preventDefault();

    if (!nombre || !correo || !problema) {
      alert("Por favor, completa todos los campos para solicitar soporte.");
      return;
    }

    setEnviando(true);

    // Estructura adaptada exactamente a lo que recibe tu servidor: email, asunto y contenido
    const datosSoporte = {
      email: "cuentapros245@gmail.com", // Te llegará a ti como administrador del sistema
      asunto: `🚨 TICKET DE SOPORTE: ${nombre}`,
      contenido: `
        Se ha recibido un nuevo ticket de soporte técnico:
        
        - Nombre del Cliente: ${nombre}
        - Correo del Cliente: ${correo}
        - Descripción del Problema: ${problema}
      `
    };

    try {
      const respuesta = await fetch('http://localhost:5000/api/correos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosSoporte)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.success) {
        alert("¡Tu requerimiento de soporte ha sido enviado! Un ejecutivo lo atenderá.");
        setNombre('');
        setCorreo('');
        setProblema('');
      } else {
        alert("Hubo un error al procesar tu solicitud en el servidor.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor de correos. Verifica que 'node server.js' esté encendido.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh', padding: '2rem 4rem', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#39ff14', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        ← Volver a Cartelera
      </button>

      <h1 style={{ textAlign: 'center', color: '#4c1d95', marginBottom: '3rem', fontSize: '2rem', fontWeight: 'bold' }}>
        Preguntas Frecuentes
      </h1>

      <div style={{ display: 'flex', gap: '3rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start' }}>
        
        {/* LADO IZQUIERDO: PREGUNTAS FRECUENTES */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cajaPregunta}>
            <h3 style={{ color: '#4c1d95', marginBottom: '0.5rem', fontSize: '0.95rem' }}>💳 ¿Qué pasa si se duplicó el cobro en mi tarjeta?</h3>
            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.4rem' }}>Nuestro sistema reversa automáticamente cualquier transacción duplicada en un plazo máximo de 48 horas hábiles. Tu dinero está seguro.</p>
          </div>
          <div style={cajaPregunta}>
            <h3 style={{ color: '#4c1d95', marginBottom: '0.5rem', fontSize: '0.95rem' }}>🔄 ¿Puedo solicitar la devolución del dinero?</h3>
            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.4rem' }}>Las devoluciones se gestionan únicamente bajo políticas específicas fijadas por la productora en caso de cancelación o reprogramación del evento.</p>
          </div>
          <div style={cajaPregunta}>
            <h3 style={{ color: '#4c1d95', marginBottom: '0.5rem', fontSize: '0.95rem' }}>🛡️ No me llegó el correo de confirmación</h3>
            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.4rem' }}>Verifica tu carpeta de Spam. Si no lo encuentras, puedes acceder directo al menú superior "Mis Tickets" para verlos sin requerir el correo.</p>
          </div>
        </div>

        {/* LADO DERECHO: FORMULARIO DE SOPORTE */}
        <form onSubmit={manejarSoporte} style={{ flex: 1, backgroundColor: '#111217', border: '1px solid #222530', borderRadius: '12px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            ✉️ ¿Aún necesitas soporte?
          </h2>
          <p style={{ color: '#777', fontSize: '0.8rem', margin: 0, marginTop: '-0.5rem' }}>Escribenos directamente y un ejecutivo de contingencia atenderá tu caso.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#ccc', textAlign: 'center' }}>Nombre Completo</label>
            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Juan Pérez" style={inputEstilo} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#ccc', textAlign: 'center' }}>Correo Electrónico</label>
            <input type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="juan@ejemplo.com" style={inputEstilo} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#ccc', textAlign: 'center' }}>Describe tu problema</label>
            <textarea required rows="4" value={problema} onChange={(e) => setProblema(e.target.value)} placeholder="Indica el ID de tu transacción o el inconveniente con tu pasarela de pago..." style={{ ...inputEstilo, resize: 'none', fontFamily: 'sans-serif' }} />
          </div>

          <button type="submit" disabled={enviando} style={{ backgroundColor: '#4c1d95', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.9rem', fontSize: '0.95rem', fontWeight: 'bold', cursor: enviando ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s' }}>
            {enviando ? 'Enviando Requerimiento...' : 'Enviar Requerimiento'}
          </button>
        </form>

      </div>
    </div>
  );
}

const cajaPregunta = { backgroundColor: '#111217', border: '1px solid #222530', borderRadius: '12px', padding: '1.5rem' };
const inputEstilo = { backgroundColor: '#1f222b', border: '1px solid #2d3245', borderRadius: '6px', padding: '0.7rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none' };
