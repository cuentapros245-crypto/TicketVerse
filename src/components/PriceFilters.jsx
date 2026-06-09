// src/components/PriceFilters.jsx
import React from 'react';

export default function PriceFilters({ titulo, tarifaFiltro, cambiarFiltroTarifa }) {
  return (
    <div style={{ 
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      background: 'linear-gradient(135deg, #090615 0%, #110d24 50%, #03140f 100%)', 
      color: '#ffffff', 
      padding: '3.5rem 2rem', 
      textAlign: 'center',
      boxSizing: 'border-box',
      borderTop: '1px solid rgba(57, 255, 20, 0.12)',
      borderBottom: '1px solid rgba(57, 255, 20, 0.12)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 💥 CAMBIAMOS EL COLOR DEL TEXTO A BLANCO BRILLANTE 💥 */}
        <h2 style={{ 
          fontSize: '28px', 
          color: '#ffffff', // ← Aquí forzamos el color blanco absoluto
          fontWeight: 'bold', 
          margin: '0 0 2.5rem 0',
          fontFamily: 'sans-serif',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' // Sombra sutil para darle volumen
        }}>
          Obtén tus tickets para ver a {titulo.split('-')} en Arena Central
        </h2>
        
        {/* Botones de Selección Cápsula */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button 
            onClick={() => cambiarFiltroTarifa("DSCTO")}
            style={botonTarifaEstilo(tarifaFiltro === "DSCTO", "#00e5ff")} 
          >
            🎟️ 25% DSCTO. PREVENTA
          </button>
          <button 
            onClick={() => cambiarFiltroTarifa("REGULAR")}
            style={botonTarifaEstilo(tarifaFiltro === "REGULAR", "#39ff14")} 
          >
            🎫 PRECIO FULL STANDARD
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => cambiarFiltroTarifa("DISCAPACIDAD")}
            style={botonTarifaEstilo(tarifaFiltro === "DISCAPACIDAD", "#b5a1e2")}
          >
            🪪 PERS. CON DISCAPACIDAD
          </button>
        </div>

        {/* Color azul claro Fandango para el enlace informativo inferior */}
        <div style={{ marginTop: '2.5rem', fontSize: '14px', color: '#00e5ff', textDecoration: 'underline', cursor: 'pointer' }}>
          ¿Cómo comprar tus boletos en la web oficial?
        </div>
      </div>
    </div>
  );
}

function botonTarifaEstilo(activo, colorAcento) {
  return {
    backgroundColor: activo ? colorAcento : 'rgba(255, 255, 255, 0.03)',
    color: activo ? '#000000' : '#ffffff',
    border: activo ? `2px solid ${colorAcento}` : '1px solid rgba(255,255,255,0.15)',
    borderRadius: '30px', 
    padding: '14px 32px',
    fontSize: '14px',
    fontWeight: '900',
    cursor: 'pointer',
    minWidth: '270px',
    textAlign: 'center',
    boxShadow: activo ? `0 0 20px ${colorAcento}44` : 'none',
    opacity: activo ? 1 : 0.65,
    transition: 'all 0.2s ease'
  };
}
