import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Ticket, Info, Layers, Film, Users, Music, Trophy } from 'lucide-react';
import { useCart } from '../contexto/CartContext';

export default function EventCard({ evento }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [vistaActiva, setVistaActiva] = useState('sectores');

  if (!evento) return null;

  // Mapeo seguro de tus datos reales del EVENTOS_POOL
  const id = evento.id;
  const titulo = evento.titulo || "Espectáculo";
  const categoria = evento.categoria || "General";
  const precio = Number(evento.precio || 0);
  const capacidad = evento.capacidadMaxima || 100;
  const vendidos = evento.ticketsVendidos || 0;
  const disponibles = capacidad - vendidos;
  const fecha = evento.fecha || "Fecha por confirmar";
  const lugar = evento.lugar || "Lugar por confirmar";
  const imagen = evento.imagen || "https://placeholder.com";
  
  // Colores dinámicos extraídos de tus propios datos
  const colorAcento = evento.accentColor || "#ff0055";
  const colorBorde = evento.borderColor || "rgba(255, 255, 255, 0.1)";

  const irAlDetalle = () => {
    navigate(`/evento/${id}`);
  };

  const manejarCompraRapida = (e) => {
    e.stopPropagation();
    addToCart(evento, 'General', precio, 1);
  };

  // 🎯 DICCIONARIO DINÁMICO: Cambia el contenido de "INFO ESTRENO" según la categoría del pool
  const renderInfoEstreno = () => {
    const catFormateada = categoria.toLowerCase();

    switch (catFormateada) {
      case 'anime':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#aaa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Film size={13} color={colorAcento} />
              <span><strong>Formato:</strong> Estreno Cine Premium</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} color={colorAcento} />
              <span><strong>Función:</strong> {fecha}</span>
            </div>
          </div>
        );

      case 'conciertos':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#aaa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Music size={13} color={colorAcento} />
              <span><strong>Tipo:</strong> Show en Vivo / Tour 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} color={colorAcento} />
              <span><strong>Apertura:</strong> {fecha}</span>
            </div>
          </div>
        );

      case 'juegos':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#aaa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={13} color={colorAcento} />
              <span><strong>Estructura:</strong> Torneo Pro / Presencial</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} color={colorAcento} />
              <span><strong>Fase Final:</strong> {fecha}</span>
            </div>
          </div>
        );

      case 'eventos':
      case 'ópera':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#aaa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={13} color={colorAcento} />
              <span><strong>Espectáculo:</strong> Temporada Exclusiva</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} color={colorAcento} />
              <span><strong>Fecha Única:</strong> {fecha}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      style={{
        backgroundColor: '#111217',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${colorBorde}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: 'sans-serif'
      }}
    >
      {/* IMAGEN DE LA CARTELERA */}
      <div onClick={irAlDetalle} style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', cursor: 'pointer' }}>
        <img src={imagen} alt={titulo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: colorAcento, color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {categoria}
        </span>
      </div>

      {/* PESTAÑAS INTERNAS DE LA TARJETA */}
      <div style={{ display: 'flex', backgroundColor: '#0b0c10', borderBottom: '1px solid #222530' }}>
        <button 
          onClick={() => setVistaActiva('sectores')}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            color: vistaActiva === 'sectores' ? colorAcento : '#666',
            padding: '10px 0',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            borderBottom: vistaActiva === 'sectores' ? `2px solid ${colorAcento}` : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          <Layers size={12} /> SECTORES
        </button>
        <button 
          onClick={() => setVistaActiva('info')}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            color: vistaActiva === 'info' ? colorAcento : '#666',
            padding: '10px 0',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            borderBottom: vistaActiva === 'info' ? `2px solid ${colorAcento}` : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          <Info size={12} /> INFO ESTRENO
        </button>
      </div>

      {/* CUERPO INFORMATIVO CONMUTABLE */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.8rem' }}>
        <h3 onClick={irAlDetalle} style={{ color: '#fff', margin: 0, fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
          {titulo}
        </h3>

        {/* CONTENIDO PESTAÑA: SECTORES */}
        {vistaActiva === 'sectores' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minHeight: '45px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#aaa', fontSize: '12px' }}>
              <MapPin size={13} color={colorAcento} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lugar}</span>
            </div>
            <div style={{ color: colorAcento, fontWeight: 'bold', fontSize: '12px' }}>
              ¡Quedan {disponibles} entradas!
            </div>
          </div>
        )}

        {/* CONTENIDO PESTAÑA: INFO ESTRENO (Automático por Categoría) */}
        {vistaActiva === 'info' && (
          <div style={{ minHeight: '45px', display: 'flex', alignItems: 'center' }}>
            {renderInfoEstreno()}
          </div>
        )}

        {/* PIE DE TARJETA CON PRECIO DE TU POOL Y BOTÓN */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #222530', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: '#555761', fontSize: '11px', display: 'block' }}>Precio ticket</span>
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>${precio.toFixed(2)}</span>
          </div>

          <button 
            onClick={manejarCompraRapida}
            style={{ 
              backgroundColor: colorAcento, 
              color: '#000', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '10px 16px', 
              fontSize: '0.8rem', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.85'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <Ticket size={13} />
            COMPRAR
          </button>
        </div>
      </div>

    </div>
  );
}
