import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    // Animación matemática para simular la carga de la barra
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo);
          if (onComplete) onComplete(); // Avisa cuando termina de cargar
          return 100;
        }
        // Incremento semi-aleatorio para que se sienta más real
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(intervalo);
  }, [onComplete]);

  return (
    <div style={{
      backgroundColor: '#0b0c10',
      color: '#ffffff',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      {/* Contenedor del Logo Animado */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          border: '2px solid #4f46e5',
          borderRadius: '50%',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(79, 70, 229, 0.3)',
          animation: 'pulso 2s infinite ease-in-out'
        }}>
          <Ticket size={48} color="#ff007f" />
        </div>
        
        {/* Título Estilo Cyberpunk */}
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          letterSpacing: '6px',
          margin: 0,
          background: 'linear-gradient(to right, #ffffff 30%, #4f46e5 70%, #ff007f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase'
        }}>
          TICKETVERSE
        </h1>
        <span style={{ fontSize: '12px', color: '#64748b', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Validando Universo de Accesos
        </span>
      </div>

      {/* Contenedor de la Barra de Carga */}
      <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.7rem', alignItems: 'center' }}>
        {/* Riel externo */}
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#111217',
          borderRadius: '10px',
          border: '1px solid #222530',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Barra de progreso interna reactiva */}
          <div style={{
            width: `${Math.min(progreso, 100)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4f46e5 0%, #ff007f 100%)',
            boxShadow: '0 0 15px #ff007f',
            transition: 'width 0.15s ease-out',
            borderRadius: '10px'
          }} />
        </div>
        
        {/* Texto del porcentaje de carga */}
        <span style={{ fontFamily: 'monospace', color: '#4f46e5', fontSize: '14px', fontWeight: 'bold' }}>
          {Math.min(progreso, 100)}%
        </span>
      </div>

      {/* Estilos CSS inyectados para las animaciones del pulso */}
      <style>{`
        @keyframes pulso {
          0% { transform: scale(1); box-shadow: 0 0 30px rgba(79, 70, 229, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 45px rgba(255, 0, 127, 0.5); }
          100% { transform: scale(1); box-shadow: 0 0 30px rgba(79, 70, 229, 0.3); }
        }
      `}</style>
    </div>
  );
}
