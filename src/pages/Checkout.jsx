import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { EVENTOS_POOL } from '../data/eventsData';
import LoadingScreen from '../components/LoadingScreen'; 

export default function Checkout({ usuarioLogueado }) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estado para controlar la pantalla de presentación / carga inicial
  const [cargandoPresentacion, setCargandoPresentacion] = useState(true);
  
  const cantidad = parseInt(searchParams.get("cantidad") || 1, 10);
  const ev = EVENTOS_POOL.find(e => e.id === id);

  useEffect(() => {
    if (ev && usuarioLogueado) {
      // 🔴 CONTROL DE DUPLICADOS: Basado en datos estáticos (ID y Cantidad).
      // Evita que el StrictMode de React duplique la compra al renderizar dos veces.
      const llaveControl = `compra_procesada_evento_${id}_cant_${cantidad}`;
      
      // Si la llave ya existe en el almacenamiento de la sesión, abortamos la ejecución de inmediato
      if (sessionStorage.getItem(llaveControl)) {
        console.log("🛑 Intento de duplicado bloqueado con éxito por StrictMode.");
        return;
      }

      // Seteamos la marca inmediatamente para blindar las funciones asíncronas siguientes
      sessionStorage.setItem(llaveControl, 'true');

      // Ahora que el entorno está protegido, generamos los códigos únicos definitivos
      const ticketId = `t-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const codigoAcceso = `TK-${id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const nuevoTicket = {
        id: ticketId,
        titulo: ev.titulo,
        categoria: ev.categoria || "General",
        fecha: ev.fecha,
        lugar: ev.lugar,
        asiento: `Sector General - ${cantidad} Entrada(s)`,
        codigoAcceso: codigoAcceso,
        imagen: ev.imagen
      };

      const ticketsExistentes = JSON.parse(localStorage.getItem('mis_tickets')) || [];
      const yaExiste = ticketsExistentes.some(t => t.codigoAcceso === codigoAcceso);
      
      if (!yaExiste) {
        ev.ticketsVendidos = (ev.ticketsVendidos || 0) + cantidad;
        ticketsExistentes.push(nuevoTicket);
        localStorage.setItem('mis_tickets', JSON.stringify(ticketsExistentes));

        // =========================================================================
        // 🚀 ENVIAR COMPROBANTE DE MANERA ÚNICA AL SERVIDOR AL CONFIRMAR LA OPERACIÓN
        // =========================================================================
        const despacharCorreoTicket = async () => {
          const emailDestino = typeof usuarioLogueado === 'object' ? usuarioLogueado.correo : '';
          const nombreDestino = typeof usuarioLogueado === 'object' ? usuarioLogueado.nombre : usuarioLogueado;
          const totalPagado = (ev.precio * cantidad).toFixed(2);

          if (!emailDestino) {
            console.warn("⚠️ No se puede enviar el ticket: El correo del usuario logueado no está disponible.");
            return;
          }

          try {
            // ✅ Vinculado correctamente a tu URL de producción en la nube de Render
            const respuesta = await fetch('https://onrender.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: emailDestino,
                nombreUsuario: nombreDestino,
                evento: ev.titulo,
                cantidad: cantidad,
                total: totalPagado
              })
            });

            const data = await respuesta.json();
            if (data.success) {
              console.log('📬 ¡Un único comprobante digital despachado al correo con éxito!');
            } else {
              console.error('❌ El servidor respondió con un error al procesar el email:', data.error);
            }
          } catch (error) {
            console.error('❌ Error de conexión al intentar alertar al backend de correos:', error);
          }
        };

        despacharCorreoTicket();
        // =========================================================================
      }

      // El temporizador de redirección se ejecuta de fondo mientras el usuario ve el proceso
      const temporizador = setTimeout(() => {
        navigate('/mis-tickets');
      }, 7000); 

      return () => clearTimeout(temporizador);
    }
  }, [ev, usuarioLogueado, id, cantidad, navigate]);

  // 1. Renderiza primero la pantalla de carga de TICKETVERSE si el estado está activo
  if (cargandoPresentacion) {
    return <LoadingScreen onComplete={() => setCargandoPresentacion(false)} />;
  }

  // 2. Validación de seguridad en caso falten datos esenciales tras la carga
  if (!ev || !usuarioLogueado) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #334155', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem auto' }} />
          <p style={{ color: '#94a3b8', fontSize: '16px', fontWeight: '500' }}>Validando credenciales de seguridad...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const colorAcritico = ev.accentColor || '#16a34a';
  const colorFondoTicket = ev.bgColor || '#0f172a';
  const colorTextoTicket = ev.textColor || '#ffffff';
  const colorBordeTicket = ev.borderColor || 'rgba(255,255,255,0.1)';

  // 3. Renderiza la tarjeta del boleto confirmado cuando termina la barra de carga
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ backgroundColor: '#1e293b', width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '2.5rem', textAlign: 'center', border: '1px solid #334155' }}>
        
        <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(22, 163, 74, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', border: '2px solid #16a34a' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>

        <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '800', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>¡Compra Confirmada!</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 2.5rem 0', fontWeight: '500' }}>Tu acceso digital se ha generado correctamente.</p>
        
        <div style={{ border: `1px solid ${colorBordeTicket}`, borderRadius: '16px', overflow: 'hidden', backgroundColor: colorFondoTicket, textAlign: 'left', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>
          <div style={{ padding: '1.5rem', borderBottom: `1px dashed ${colorBordeTicket}`, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colorAcritico, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comprobante de Acceso</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: colorTextoTicket, margin: '0.25rem 0 0 0', lineHeight: '1.3' }}>{ev.titulo}</h3>
          </div>

          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '14px', color: colorTextoTicket }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.7 }}>Titular</span><span style={{ fontWeight: '600' }}>{typeof usuarioLogueado === 'object' ? usuarioLogueado.nombre : usuarioLogueado}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.7 }}>Cantidad</span><span style={{ fontWeight: '600' }}>{cantidad} {cantidad === 1 ? 'entrada' : 'entradas'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colorBordeTicket}`, paddingTop: '0.75rem', marginTop: '0.25rem' }}><span style={{ fontWeight: '700' }}>Total Pagado</span><span style={{ fontWeight: '800', color: colorAcritico, fontSize: '18px' }}>${(ev.precio * cantidad).toFixed(2)}</span></div>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(0,0,0,0.4)', color: colorAcritico, textAlign: 'center', fontFamily: 'monospace', letterSpacing: '3px', fontSize: '12px', fontWeight: '700', borderTop: `1px solid ${colorBordeTicket}` }}>
            TICKET-DIGITAL-{id.toUpperCase()}-{cantidad}
          </div>
        </div>

        <p style={{ color: '#64748b', fontSize: '12px', marginTop: '2rem', fontWeight: '500' }}>Redireccionando de forma segura...</p>
      </div>
    </div>
  );
}
