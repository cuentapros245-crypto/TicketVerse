import { useState } from 'react';
const TRAILERS_DATA = [
  {
    id: "t1",
    titulo: "Dragon Ball Super: Broly: Trailer 1",
    videoUrl: "/videos/trailer1.mp4"
  },
  {
    id: "t2",
    titulo: "Dragon Ball Super: Broly: Trailer 2",
    videoUrl: "/videos/trailer2.mp4"
  },
  {
    id: "t3",
    titulo: "Dragon Ball Super: Broly: Trailer 3",
    videoUrl: "/videos/trailer3.mp4"
  }
];

export default function MovieTrailers({ evento }) {
  const [videoActivo, setVideoActivo] = useState(null);
  let videosAMostrar = TRAILERS_DATA;
  if (evento && evento.id === "uma-musume-movie") {
    videosAMostrar = [
      {
        id: "uma1",
        titulo: "Uma Musume: Pretty Derby – Beginning of a New Era: Trailer 1",
        videoUrl: "/videos/trailerUma1.mp4"
      }
    ];
  } 
  // 1. AGREGAMOS LA CONDICIÓN EXCLUSIVA PARA TU NUEVA PELÍCULA DE BILLS
  else if (evento && evento.id === "dbs-bills") {
    videosAMostrar = [
      {
        id: "bills1",
        titulo: "Dragon Ball Super: La Batalla de los Dioses - Trailer Oficial",
        videoUrl: "/videos/trailerDBS.mp4"
      }
    ];
  }
  // 2. ACTUALIZAMOS EL FILTRO PARA QUE DEJE PASAR A BILLS ("dbs-bills") Y NO SE OCULTE
  if (!evento || (evento.id !== "db-broly" && evento.id !== "uma-musume-movie" && evento.id !== "dbs-bills")) {
    return null;
  }
  const temaAccent = evento.accentColor || "#39ff14";

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '4rem 2rem', 
      boxSizing: 'border-box'
    }}>
      {/* Título de la sección estilo Fandango */}
      <h2 style={{ 
        color: '#ffffff', 
        fontSize: '22px', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        letterSpacing: '0.5px',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #1c1e24',
        paddingBottom: '0.75rem'
      }}>
        FEATURED NEWS
      </h2>

      {/* Grid de Tarjetas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        {videosAMostrar.map((trailer) => (
          <div 
            key={trailer.id}
            onClick={() => setVideoActivo(trailer.videoUrl)}
            style={{ 
              backgroundColor: '#15161a', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              cursor: 'pointer',
              border: '1px solid #222530',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.borderColor = temaAccent; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = '#222530';
            }}
          >
            {/* CONTENEDOR DONDE EL PROPIO VIDEO GENERA LA MINIATURA AUTOMÁTICA */}
            <div style={{ width: '100%', height: '190px', position: 'relative', backgroundColor: '#000', overflow: 'hidden' }}>
              
              <video 
                src={trailer.videoUrl} 
                preload="metadata" 
                muted 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.75
                }}
              />
              
              {/* Círculo con el icono de Play Flotante */}
              <div style={{
                position: 'absolute', bottom: '15px', right: '15px',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', color: '#000', fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                zIndex: 10
              }}>
              </div>
            </div>

            {/* Título inferior de la tarjeta */}
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ color: '#ffffff', fontSize: '15px', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                {trailer.titulo}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* REPRODUCTOR A PANTALLA COMPLETA                                           */}
      {/* ========================================================================= */}
      {videoActivo && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: '#000000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2500, boxSizing: 'border-box'
        }}>
          <button 
            onClick={() => setVideoActivo(null)}
            style={{
              position: 'absolute', top: '25px', right: '35px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff', borderRadius: '50%',
              width: '45px', height: '45px', fontSize: '24px', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', zIndex: 2600
            }}
          >
            ×
          </button>
          <video src={videoActivo} controls autoPlay style={{ width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}
