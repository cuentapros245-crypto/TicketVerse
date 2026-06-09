import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { emailService } from '../servicie/emailService';

export default function Notificaciones() {
  const [correos, setCorreos] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const cargarCorreos = async () => {
      try {
        const datos = await emailService.getAllEmails();
        setCorreos(datos);
      } catch (err) {
        console.error("Error al cargar notificaciones:", err);
      }
    };
    cargarCorreos();
  
    const intervalo = setInterval(cargarCorreos, 30000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* BOTÓN DE LA CAMPANA */}
      <button 
        onClick={() => setMenuAbierto(!menuAbierto)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '8px', display: 'flex', alignItems: 'center' }}
      >
        <Bell size={24} color="#ffffff" />
        
        {/* GLOBITO ROJO DINÁMICO */}
        {correos.length > 0 && (
          <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#e11d48', color: '#fff', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {correos.length}
          </span>
        )}
      </button>

      {/* MENÚ DESPLEGABLE FLOTANTE */}
      {menuAbierto && (
        <div style={{ position: 'absolute', top: '45px', right: '0', backgroundColor: '#111217', border: '1px solid #222530', borderRadius: '8px', width: '320px', maxHeight: '400px', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 1000, padding: '12px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222530', paddingBottom: '8px', marginBottom: '10px' }}>
            <h4 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
              📬 Mensajes Recientes
            </h4>
            
            {/* 🟢 BOTÓN INTERACTIVO INTEGRADO */}
            {correos.length > 0 && (
              <button 
                onClick={async () => {
                  try {
                    await emailService.clearAllEmails(); // Llama al servicio de limpieza
                    setCorreos([]); // Limpia la lista visual de golpe
                  } catch (err) {
                    console.error("No se pudo vaciar:", err);
                  }
                }}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#ff0055', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                Vaciar todo
              </button>
            )}
          </div>
          
          {correos.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: '15px 0', textAlign: 'center' }}>No tienes mensajes nuevos.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {correos.map((correo) => (
                <div key={correo.id} style={{ backgroundColor: '#1c1e24', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #ff0055' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: '#ff0055', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>
                      {correo.from}
                    </span>
                    <span style={{ color: '#9ca3af' }}>
                      {new Date(correo.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#fff', fontSize: '12px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {correo.subject}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
