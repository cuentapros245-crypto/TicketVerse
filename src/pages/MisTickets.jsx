// src/pages/MisTickets.jsx
import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, MapPin, Download, QrCode } from 'lucide-react';

export default function MisTickets() {
  // Estado para guardar los tickets reales del navegador
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Leemos el LocalStorage al cargar la página
    const datosLocales = JSON.parse(localStorage.getItem('mis_tickets')) || [];
    setTickets(datosLocales);
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '4rem 2rem', fontFamily: 'sans-serif', color: '#ffffff' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px', color: '#fff6f6',}}>
          <Ticket size={36} color="#39ff14"/> Mis Tickets Digitales
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '15px' }}>
          Presenta el código QR desde tu celular al ingresar al recinto. No es necesario imprimir.
        </p>

        {/* 💡 SI EL USUARIO NO HA COMPRADO NADA */}
        {tickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed #334155', borderRadius: '12px', marginTop: '2rem' }}>
            <Ticket size={48} color="#64748b" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '18px', color: '#cbd5e1' }}>No tienes tickets activos</h3>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Tus compras autorizadas aparecerán aquí en tiempo real tras pasar por caja.</p>
          </div>
        ) : (
          /* 💡 SI EL USUARIO YA TIENE COMPRAS REALES */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {tickets.map((ticket) => (
              <div key={ticket.id} style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#1e293b', borderRadius: '16px', overflow: 'hidden', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
                
                {/* DETALLES */}
                <div style={{ flex: '1 1 450px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ backgroundColor: '#3b0764', color: '#39ff14', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {ticket.categoria}
                    </span>
                    <h2 style={{ fontSize: '22px', margin: '1rem 0 1.5rem 0', fontWeight: 'bold', lineHeight: '1.3' }}>{ticket.titulo}</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#cbd5e1', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} color="#39ff14" /> {ticket.fecha}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="#39ff14" /> {ticket.lugar}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Ticket size={16} color="#39ff14" /> <strong>Ubicación:</strong> {ticket.asiento}</div>
                    </div>
                  </div>

                  <button style={{ alignSelf: 'flex-start', marginTop: '2rem', backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={16} /> Descargar PDF
                  </button>
                </div>

                {/* CORTE DE BOLETO */}
                <div style={{ width: '2px', borderLeft: '3px dashed #0f172a', position: 'relative' }} />

                {/* QR */}
                <div style={{ flex: '0 1 280px', backgroundColor: '#111827', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #1e293b', minWidth: '240px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={140} color="#000000" />
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '1rem', letterSpacing: '2px' }}>
                    {ticket.codigoAcceso}
                  </span>
                  <div style={{ marginTop: '1.5rem', backgroundColor: 'rgba(57,255,20,0.1)', color: '#39ff14', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                    ● TICKET VÁLIDO
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
