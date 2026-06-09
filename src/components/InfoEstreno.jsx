import React from 'react';
import { Film, Music, Trophy, Users } from 'lucide-react';

export default function InfoEstreno({ evento }) {
  if (!evento) return null;

  const categoria = evento.categoria || "Eventos";
  const colorAcento = evento.accentColor || "#39ff14";
  
  // Convertimos a minúsculas, quitamos espacios en blanco y removemos la 's' final si existe
  const catFmt = categoria.toLowerCase().trim().replace(/s$/, "");

  switch (catFmt) {
    case 'anime':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'sans-serif' }}>
          <div style={{ backgroundColor: '#111217', padding: '1.5rem', borderRadius: '8px', border: `1px solid ${evento.borderColor || '#222530'}` }}>
            <h3 style={{ color: colorAcento, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Film size={20} /> Ficha Técnica Cinematográfica
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#ccc' }}>
              <div><strong>Clasificación:</strong> PG-13 (Acción/Fantasía)</div>
              <div><strong>Idioma:</strong> Japonés Subtitulado / Español</div>
              <div><strong>Duración:</strong> 1h 40min Minutos</div>
              <div><strong>Estudio:</strong> Toei Animation</div>
            </div>
          </div>
        </div>
      );

    case 'concierto':
      return (
        <div style={{ backgroundColor: '#111217', padding: '1.5rem', borderRadius: '8px', border: `1px solid ${evento.borderColor || '#222530'}`, fontFamily: 'sans-serif' }}>
          <h3 style={{ color: colorAcento, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Music size={20} /> Información del Tour Musical 2026
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#ccc' }}>
            <div><strong>Lineup:</strong> Artistas Invitados Confirmados</div>
            <div><strong>Duración Show:</strong> 3h Aprox.</div>
            <div><strong>Apertura:</strong> Puertas abren 3 horas antes</div>
            <div><strong>Restricción:</strong> Apto todo público</div>
          </div>
        </div>
      );

    case 'juego':
      return (
        <div style={{ backgroundColor: '#111217', padding: '1.5rem', borderRadius: '8px', border: `1px solid ${evento.borderColor || '#222530'}`, fontFamily: 'sans-serif' }}>
          <h3 style={{ color: colorAcento, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={20} /> Reglamento del Campeonato Pro
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#ccc' }}>
            <div><strong>Modalidad:</strong> Presencial 5v5</div>
            <div><strong>Plataforma:</strong> PC de Alta Gama</div>
            <div><strong>Premios:</strong> Pool de Dinero en Efectivo</div>
            <div><strong>Periféricos:</strong> Suministrados por organización</div>
          </div>
        </div>
      );

    default:
      return (
        <div style={{ backgroundColor: '#111217', padding: '1.5rem', borderRadius: '8px', border: `1px solid ${evento.borderColor || '#222530'}`, fontFamily: 'sans-serif' }}>
          <h3 style={{ color: colorAcento, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} /> Detalles de la Función de Gala
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#ccc' }}>
            <div><strong>Actos:</strong> Con Intermedio</div>
            <div><strong>Orquesta:</strong> En Vivo Sinfónica</div>
            <div><strong>Idioma:</strong> Idioma original con subtítulos</div>
            <div><strong>Vestimenta:</strong> Código formal-elegante</div>
          </div>
        </div>
      );
  }
}
