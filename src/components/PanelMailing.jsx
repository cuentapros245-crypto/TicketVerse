import React, { useState } from 'react';

export default function PanelMailing() {
  const [correoCliente, setCorreoCliente] = useState('');
  const [asuntoMensaje, setAsuntoMensaje] = useState('');
  const [contenido, setContenido] = useState('');
  
  // 🔴 NUEVOS ESTADOS COMPLEMENTARIOS PARA AGREGAR DATOS
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [evento, setEvento] = useState('');
  const [zona, setZona] = useState('');
  const [cantidad, setCantidad] = useState('1');
  const [total, setTotal] = useState('');

  const [mensajeEstado, setMensajeEstado] = useState({ tipo: '', texto: '' });
  const [cargando, setCargando] = useState(false);

  const manejarEnvioNotificacion = async (e) => {
    e.preventDefault();
    setMensajeEstado({ tipo: '', texto: '' });
    setCargando(true);

    try {
      // Petición directa al servidor local inyectando de forma extendida los nuevos campos
      const respuesta = await fetch('http://localhost:5000/api/correos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: correoCliente,
          asunto: asuntoMensaje,
          contenido: contenido,
          // 🔴 NUEVOS CAMPOS ADICIONALES ENVIADOS AL BACKEND
          nombre,
          apellido,
          evento,
          zona,
          cantidad,
          total
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok && datos.success) {
        setMensajeEstado({ tipo: 'exito', texto: '✅ ¡Ticket procesado y enviado con éxito!' });
        setContenido(''); // Limpia el cuadro de texto tras el envío exitoso
      } else {
        setMensajeEstado({ tipo: 'error', texto: `❌ Error del servidor: ${datos.error || 'Intenta de nuevo'}` });
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensajeEstado({ 
        tipo: 'error', 
        texto: '❌ Error: No se pudo conectar con el servidor. Asegúrate de tener encendido tu backend en el puerto 5000.' 
      });
    } finally {
      setCargando(false);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0b0c10', padding: '40px 20px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '540px', backgroundColor: '#111217', padding: '40px 30px', borderRadius: '24px', border: '2px solid #ff0055', boxShadow: '0 0 25px rgba(255, 0, 85, 0.45)', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#ff0055', margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>📢 Emisión de Tickets</h2>
          <p style={{ color: '#aaa', margin: 0, fontSize: '14px' }}>Envía alertas o tickets digitales a tus usuarios</p>
        </div>

        <form onSubmit={manejarEnvioNotificacion} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textAlign: 'center', textTransform: 'uppercase' }}>Correo del Cliente</label>
            <input 
              type="text" 
              value={correoCliente}
              onChange={(e) => setCorreoCliente(e.target.value)}
              placeholder="ejemplo1@gmail.com, ejemplo2@gmail.com"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }}
              required 
            />
          </div>

          {/* FILA DE CAMPOS: NOMBRE Y APELLIDO */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Nombre</label>
              <input type="text" placeholder="" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Apellido</label>
              <input type="text" placeholder="" value={apellido} onChange={(e) => setApellido(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
            </div>
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Nombre del Evento</label>
            <input type="text" placeholder="" value={evento} onChange={(e) => setEvento(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
          </div>

          {/* FILA DE CAMPOS: SECTOR Y CANTIDAD */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 2 }}>
              <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Zona / Sector</label>
              <input type="text" placeholder="" value={zona} onChange={(e) => setZona(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Cantidad</label>
              <input type="number" min="1" max="10" value={cantidad} onChange={(e) => setCantidad(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
            </div>
          </div>

          {/* FILA DE CAMPOS: ASUNTO Y MONTO TOTAL */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 2 }}>
              <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Asunto del Mensaje</label>
              <input type="text" value={asuntoMensaje} onChange={(e) => setAsuntoMensaje(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Total (S/)</label>
              <input type="text" placeholder="" value={total} onChange={(e) => setTotal(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', fontSize: '14px' }} required />
            </div>
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Contenido / Mensaje Adicional</label>
            <textarea 
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows="3"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1f2026', color: '#fff', boxSizing: 'border-box', resize: 'none', fontSize: '14px' }}
              required 
            />
          </div>

          {mensajeEstado.texto && (
            <p style={{ color: mensajeEstado.tipo === 'exito' ? '#00ffcc' : '#ff0055', fontSize: '14px', textAlign: 'center', margin: '5px 0 0 0', fontWeight: 'bold' }}>
              {mensajeEstado.texto}
            </p>
          )}

          <button 
            type="submit" 
            disabled={cargando}
            style={{ width: '100%', padding: '16px', borderRadius: '30px', border: 'none', backgroundColor: '#ff0055', color: '#fff', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 15px rgba(255, 0, 85, 0.3)' }}
          >
            {cargando ? 'ENVIANDO NOTIFICACIÓN...' : '🚀 ENVIAR NOTIFICACIÓN'}
          </button>

        </form>
      </div>
    </div>
  );
}
