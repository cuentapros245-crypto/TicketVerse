import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { CATEGORIAS_LISTA } from '../data/eventsData';

export default function Home({ eventos }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoriaActual = searchParams.get("categoria") || "Todos";
  const consultaBusqueda = searchParams.get("search") || "";
  
  const DATA_POOL = eventos || [];
  const [slideIndex, setSlideIndex] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    if (!DATA_POOL || DATA_POOL.length <= 1) return;
    const intervalo = setInterval(() => {
      siguienteSlide();
    }, 6000);
    return () => clearInterval(intervalo); 
  }, [slideIndex, DATA_POOL]);

  const siguienteSlide = () => {
    if (!DATA_POOL || DATA_POOL.length === 0) return;
    setSlideIndex((prev) => (prev + 1) % DATA_POOL.length);
  };

  const anteriorSlide = () => {
    if (!DATA_POOL || DATA_POOL.length === 0) return;
    setSlideIndex((prev) => (prev - 1 + DATA_POOL.length) % DATA_POOL.length);
  };

  const eventosFiltrados = DATA_POOL.filter(ev => {
    const catEvento = (ev.categoria || "").toUpperCase();
    const catFiltro = categoriaActual.toUpperCase();
    const cumpleCategoria = catFiltro === "TODOS" || catEvento === catFiltro;
    
    const textoBuscado = consultaBusqueda.toLowerCase().trim();
    const tituloEvento = (ev.titulo || "").toLowerCase();
    const lugarEvento = (ev.lugar || "").toLowerCase();
    const categoriaEventoTexto = (ev.categoria || "").toLowerCase();

    const cumpleBusqueda = textoBuscado === "" || 
                           tituloEvento.includes(textoBuscado) || 
                           lugarEvento.includes(textoBuscado) ||
                           categoriaEventoTexto.includes(textoBuscado);

    return cumpleCategoria && cumpleBusqueda;
  });

  if (!DATA_POOL || DATA_POOL.length === 0 || !DATA_POOL[slideIndex]) {
    return (
      <div style={{ backgroundColor: '#111217', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Cargando cartelera...</p>
      </div>
    );
  }

  const eventoSliderActual = DATA_POOL[slideIndex];
  const stockSliderDisponible = eventoSliderActual ? (eventoSliderActual.capacidadMaxima - (eventoSliderActual.ticketsVendidos || 0)) : 0;
  const sliderAgotado = stockSliderDisponible === 0;

  const imagenFondoActual = eventoSliderActual.imagenHorizontal || eventoSliderActual.imagen;

  return (
    <main style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, padding: 0, position: 'relative' }}>


      {/* 🚀 BANNER PRINCIPAL CON TRANSPARENCIA CONFIGURADA */}
      <div style={{ 
        position: 'relative', 
        color: '#fff', 
        padding: '3rem 4rem', 
        minHeight: '340px', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',
        // 🔴 CAMBIO 1: Convertimos el color sólido de fondo en un RGBA con opacidad del 20%
        backgroundColor: 'rgba(11, 12, 17, 0.20)',
        // 🔴 CAMBIO 2: Agregamos un desenfoque de fondo estilo vidrio esmerilado premium
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}>
        
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imagenFondoActual})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(30px) saturate(220%) brightness(50%)', transform: 'scale(1.15)', zIndex: 1, transition: 'background-image 0.8s ease-in-out' }} />
        
        {/* 🔴 CAMBIO 3: Reducimos también la opacidad de la capa negra degradada para que se transparente el fondo real */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to right, rgba(11, 12, 16, 0.40) 30%, rgba(11, 12, 16, 0.10) 100%)', 
          zIndex: 2 
        }} />
        
        <button type="button" onClick={anteriorSlide} style={flechaBotonEstilo('left')} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 85, 0.35)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}>
          <ChevronLeft size={24} color="#ffffff" />
        </button>

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ flex: '1 1 50%' }}>
            <span style={{ backgroundColor: '#ff0055', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', boxShadow: '0 0 15px rgba(255, 0, 85, 0.5)' }}>
              {(eventoSliderActual.categoria || 'CONCIERTO').toUpperCase()}
            </span>
            <h1 style={{ fontSize: '42px', margin: '1.5rem 0 0.5rem 0', fontWeight: '900', color: '#ffffff', lineHeight: '1.1', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
              {eventoSliderActual.titulo}
            </h1>
            <p style={{ fontSize: '15px', color: '#aaa', marginBottom: '2.5rem', fontWeight: '500' }}>📅 {eventoSliderActual.fecha || 'Próximamente'}</p>
            
            {sliderAgotado ? (
              <span style={{ backgroundColor: '#222', color: '#555', padding: '14px 36px', borderRadius: '30px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block', cursor: 'not-allowed', border: '1px solid #333' }}>AGOTADO</span>
            ) : (
              <Link to={`/evento/${eventoSliderActual.id}`} style={{ backgroundColor: '#ffffff', color: '#111217', padding: '14px 36px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', display: 'inline-block', boxShadow: '0 4px 20px rgba(255,255,255,0.15)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>VER MÁS</Link>
            )}
          </div>

          <div style={{ flex: '1 1 50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <img src={imagenFondoActual} alt="Cartelera" style={{ width: '100%', maxWidth: '480px', height: '270px', objectFit: 'cover', borderRadius: '20px', border: '2px solid rgba(255, 0, 85, 0.3)', boxShadow: '0 15px 35px rgba(255, 0, 85, 0.2)' }} />
          </div>
        </div>
        <button type="button" onClick={siguienteSlide} style={flechaBotonEstilo('right')} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 85, 0.35)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}>
          <ChevronRight size={24} color="#ffffff" />
        </button>

        <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
          {DATA_POOL.map((_, idx) => (
            <div key={idx} onClick={() => setSlideIndex(idx)} style={{ width: slideIndex === idx ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: slideIndex === idx ? '#ff0055' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: slideIndex === idx ? '0 0 10px #ff0055' : 'none' }} />
          ))}
        </div>
      </div>

      {/* 🧭 SUBNAVBAR DE CATEGORÍAS */}
      <div style={{ backgroundColor: '#080808', padding: '4px 1rem', borderBottom: '2px solid #1f2026' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          {CATEGORIAS_LISTA.map(cat => (
            <button 
              key={cat} 
              type="button"
              onClick={() => {
                const nuevosParams = { categoria: cat };
                if (consultaBusqueda) nuevosParams.search = consultaBusqueda;
                setSearchParams(nuevosParams);
              }}
              style={{ background: 'none', border: 'none', color: categoriaActual.toUpperCase() === cat.toUpperCase() ? '#ff0055' : '#aaa', padding: '14px 16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', borderBottom: categoriaActual.toUpperCase() === cat.toUpperCase() ? '3px solid #ff0055' : '3px solid transparent', transition: 'all 0.2s', textShadow: categoriaActual.toUpperCase() === cat.toUpperCase() ? '0 0 10px rgba(255,0,85,0.4)' : 'none' }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 🎟️ SECCIÓN DE CARTELERA CON INTERACCIONES NEÓN SOBRE FONDO CLARO */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '2rem', color: '#1e293b', borderLeft: '5px solid #ff0055', paddingLeft: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {consultaBusqueda ? `Resultados para "${consultaBusqueda}"` : `Cartelera: ${categoriaActual}`}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {eventosFiltrados.map(ev => {
            const stockTarjetaDisponible = ev.capacidadMaxima - (ev.ticketsVendidos || 0);
            const tarjetaAgotada = stockTarjetaDisponible === 0;
            const ultimasEntradas = stockTarjetaDisponible > 0 && stockTarjetaDisponible <= 50;
            const esHovered = hoveredCardId === ev.id;

            let badgeTexto = "🎟️ Disponible";
            let badgeColor = "#00ffcc"; 
            if (tarjetaAgotada) {
              badgeTexto = "🚫 Sold Out";
              badgeColor = "#141414"; 
            } else if (ultimasEntradas) {
              badgeTexto = "🔥 ¡Últimos Tickets!";
              badgeColor = "#ff0055"; 
            }

            return (
              <div
                key={ev.id}
                onMouseEnter={() => setHoveredCardId(ev.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                style={{
                  backgroundColor: '#111217',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: esHovered ? '2px solid #ff0055' : '2px solid #1f2026',
                  transform: esHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: esHovered ? '0 12px 25px rgba(255, 0, 85, 0.35)' : '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: badgeColor, color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '5px 12px', borderRadius: '20px', textTransform: 'uppercase', boxShadow: tarjetaAgotada ? 'none' : `0 4px 10px ${badgeColor}66`, zIndex: 10 }}>
                  {badgeTexto}
                </div>

                <div style={{ width: '100%', height: '180px', overflow: 'hidden', backgroundColor: '#111217' }}>
                  <img src={ev.imagen} alt={ev.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: esHovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.4s ease' }} />
                </div>

                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ff0055', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>{ev.categoria}</span>
                    <h3 style={{ fontSize: '18px', margin: '0.5rem 0', color: '#ffffff', fontWeight: '700', lineHeight: '1.3', textAlign: 'left' }}>{ev.titulo}</h3>
                    <p style={{ fontSize: '13px', color: '#aaa', margin: '0.5rem 0', textAlign: 'left' }}>📍 {ev.lugar}</p>
                    <div style={{ marginTop: '0.6rem', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }}>
                      {tarjetaAgotada ? <span style={{ color: '#ef4444' }}>❌ AGOTADO</span> : <span style={{ color: ultimasEntradas ? '#ff0055' : '#00ffcc' }}>🎟️ ¡Quedan {stockTarjetaDisponible} entradas!</span>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #1f2026', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff' }}>S/ {ev.precio.toFixed(2)}</span>
                    {tarjetaAgotada ? (
                      <span style={{ backgroundColor: '#27272a', color: '#71717a', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', fontSize: '13px', cursor: 'not-allowed', border: '1px solid #333' }}>AGOTADO</span>
                    ) : (
                      <Link to={`/evento/${ev.id}`} style={{ backgroundColor: '#ff0055', color: '#fff', padding: '10px 24px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 4px 15px rgba(255, 0, 85, 0.25)', transform: esHovered ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.2s ease' }}>COMPRAR</Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {eventosFiltrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#ef4444', fontSize: '16px', fontWeight: 'bold' }}>
            ❌ No se encontraron eventos disponibles para esta búsqueda en la categoría seleccionada.
          </div>
        )}
      </div>
    </main>
  );
}

function flechaBotonEstilo(posicion) {
  return { position: 'absolute', top: '50%', transform: 'translateY(-50%)', [posicion]: '20px', backgroundColor: 'rgba(0, 0, 0, 0.4)', border: 'none', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyAxial: 'center', cursor: 'pointer', zIndex: 10, transition: 'all 0.2s ease' };
}
