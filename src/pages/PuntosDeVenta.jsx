import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PuntosDeVenta() {
  const navigate = useNavigate();

  const modulosFisicos = [
    { centro: "Centro Comercial Arena - Módulo Central", direccion: "Av. Javier Prado Este 4200, Santiago de Surco", horario: "Lun a Dom: 10:00 AM - 10:00 PM" },
    { centro: "Plaza Norte - Segundo Nivel", direccion: "Av. Alfredo Mendiola 1400, Independencia", horario: "Lun a Dom: 11:00 AM - 9:00 PM" },
    { centro: "Mall del Sur - Primer Nivel", direccion: "Av. Los Lirios, San Juan de Miraflores", horario: "Lun a Dom: 10:00 AM - 10:00 PM" }
  ];

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#ffffff', minHeight: '100vh', padding: '4rem', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button onClick={() => navigate('/')} style={{ color: '#00ff66', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ← Volver a Cartelera
        </button>
        
        <h1 style={{ fontSize: '32px', fontWeight: '900', borderLeft: '5px solid #00ff66', paddingLeft: '15px', marginBottom: '1rem',color: '#f7f2f2', }}>📍 MÓDULOS Y PUNTOS DE VENTA</h1>
        <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Puedes recoger tus entradas físicas o realizar compras en efectivo en cualquiera de nuestros establecimientos autorizados:</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {modulosFisicos.map((mod, index) => (
            <div key={index} style={{ backgroundColor: '#111217', border: '1px solid #222530', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#00ff66', fontSize: '18px' }}>{mod.centro}</h3>
              <p style={{ margin: '0 0 0.4rem 0', color: '#cbd5e1', fontSize: '14px' }}><strong>Dirección:</strong> {mod.direccion}</p>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}><strong>Horario de atención:</strong> {mod.horario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
