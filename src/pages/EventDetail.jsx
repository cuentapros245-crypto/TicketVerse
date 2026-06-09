import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EVENTOS_POOL } from '../data/eventsData';
import InfoEstreno from '../components/InfoEstreno';
import PriceFilters from '../components/PriceFilters';
import SectorsTable from '../components/SectorsTable';
import MovieTrailers from '../components/MovieTrailers';

export default function EventDetail({ usuarioLogueado }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [errorSesion, setErrorSesion] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState("PRECIOS");

  const ev = EVENTOS_POOL.find(e => e.id === id);
  if (!ev) return <div style={{ padding: '3rem', textAlign: 'center', color: '#fff', fontFamily: 'sans-serif' }}><h2>Evento no encontrado</h2></div>;

  // Evaluamos si el concierto cuenta con el nuevo arreglo de sectores personalizados
  const tieneSectores = ev.sectores && ev.sectores.length > 0;
  
  const sectorInicial = tieneSectores 
    ? ev.sectores.find(s => s.tipo === "REGULAR")?.nombre || "TRIBUNA GENERAL"
    : "ZONA ACCESO (Regular)";
    
  const precioInicial = tieneSectores 
    ? ev.sectores.find(s => s.tipo === "REGULAR")?.precio || ev.precio 
    : 236.00;

  const [tarifaFiltro, setTarifaFiltro] = useState("REGULAR"); 
  const [sectorSeleccionado, setSectorSeleccionado] = useState(sectorInicial);
  const [precioBase, setPrecioBase] = useState(precioInicial); 

  const temaBg = ev.bgColor || "#090514"; 
  const temaText = ev.textColor || "#ffffff";
  const temaAccent = ev.accentColor || "#39ff14"; 
  const temaSecondary = ev.secondaryAccent || "#00e5ff"; 
  const temaBorder = ev.borderColor || "rgba(255, 255, 255, 0.1)";

  const precioTotalCalculado = precioBase * cantidad;

  const cambiarFiltroTarifa = (tipo) => {
    setTarifaFiltro(tipo);
    
    if (tieneSectores) {
      const encontrados = ev.sectores.filter(s => s.tipo === tipo);
      if (encontrados.length > 0) {
        setSectorSeleccionado(encontrados[0].nombre);
        setPrecioBase(encontrados[0].precio);
      }
    } else {
      if (tipo === "DSCTO") {
        setSectorSeleccionado("ZONA ACCESO (25% Dscto)");
        setPrecioBase(181.00);
      } else if (tipo === "REGULAR") {
        setSectorSeleccionado("ZONA ACCESO (Regular)");
        setPrecioBase(236.00);
      } else {
        setSectorSeleccionado("ZONA CORAZÓN (Con Discapacidad)");
        setPrecioBase(112.20);
      }
    }
  };

  const seleccionarTarifa = (nombreSector, costo) => {
    setSectorSeleccionado(nombreSector);
    setPrecioBase(costo);
  };

  const intentarCompra = () => {
    if (!usuarioLogueado) {
      setErrorSesion(true);
    } else {
      navigate(`/checkout/${ev.id}?cantidad=${cantidad}&sector=${encodeURIComponent(sectorSeleccionado)}&total=${precioTotalCalculado}`);
    }
  };
  return (
    <div key={ev.id} style={{ 
      backgroundColor: temaBg, 
      color: temaText, 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      boxSizing: 'border-box' 
    }}>
      
      {/* 1. HERO BANNER MONUMENTAL */}
      <div style={{ 
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        height: '58vh', 
        backgroundImage: `linear-gradient(to bottom, rgba(232, 224, 224, 0.15), ${temaBg}), url("${encodeURI(ev.imagen)}")`,
        backgroundSize: 'cover',
        backgroundPosition: 
          String(ev.id) === "1" ? 'center 15%' :  
          String(ev.id) === "2" ? 'center 12%' :  
          String(ev.id) === "3" ? 'center 20%' :  
          String(ev.id) === "6" ? 'center 15%' :  
          'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 4rem 3rem 4rem',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: '30px', right: '4rem',
          backgroundColor: 'rgba(9, 5, 20, 0.85)', border: `2px solid ${temaAccent}`,
          borderRadius: '12px', padding: '1rem 1.5rem', textAlign: 'center',
          boxShadow: `0 10px 25px ${temaAccent}22`
        }}>
          <span style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: temaSecondary }}>VIE</span>
          <span style={{ display: 'block', fontSize: '32px', fontWeight: '900' }}>14</span>
          <span style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#aaa' }}>DIC</span>
        </div>

        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <span style={{ backgroundColor: temaAccent, color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {ev.categoria} - ESPACIO EXCLUSIVO PREMIUM
          </span>
          <h1 style={{ fontSize: '50px', margin: '0.5rem 0 0 0', fontWeight: '900', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
            {ev.titulo}
          </h1>
        </div>
      </div>

      {/* 2. PESTAÑAS DE MENÚ INTERNO */}
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderBottom: `1px solid ${temaBorder}`, padding: '0 4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem' }}>
          <button 
            onClick={() => setPestanaActiva("PRECIOS")}
            style={{ 
              background: 'none', border: 'none', 
              color: pestanaActiva === "PRECIOS" ? temaAccent : '#aaa', 
              borderBottom: pestanaActiva === "PRECIOS" ? `3px solid ${temaAccent}` : '3px solid transparent', 
              padding: '15px 0', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            PRECIOS Y SECTORES
          </button>
          <button 
            onClick={() => setPestanaActiva("INFO")}
            style={{ 
              background: 'none', border: 'none', 
              color: pestanaActiva === "INFO" ? temaAccent : '#aaa', 
              borderBottom: pestanaActiva === "INFO" ? `3px solid ${temaAccent}` : '3px solid transparent', 
              padding: '15px 0', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            INFO DEL ESTRENO
          </button>
        </div>
      </div>
      {/* 3. ALTERNANCIA DINÁMICA DE PESTAÑAS */}
      {pestanaActiva === "PRECIOS" ? (
        <>
          <PriceFilters 
            titulo={ev.titulo} 
            tarifaFiltro={tarifaFiltro} 
            cambiarFiltroTarifa={cambiarFiltroTarifa} 
          />

          <div style={{ maxWidth: '1200px', width: '100%', margin: '4rem auto 0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', boxSizing: 'border-box' }}>
            <SectorsTable 
              tarifaFiltro={tarifaFiltro} 
              precioBase={precioBase} 
              seleccionarTarifa={seleccionarTarifa} 
              temaAccent={temaAccent} 
              evento={ev} 
            />

            {/* Módulo lateral de checkout */}
            <div>
              <div style={{ backgroundColor: '#110b21', padding: '2rem', borderRadius: '16px', border: `2px solid ${temaBorder}`, boxShadow: `0 15px 35px rgba(0,0,0,0.5)`, position: 'sticky', top: '130px' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>Resumen de Compra</h3>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '13px', color: temaSecondary, textAlign: 'center', fontWeight: 'bold' }}>{sectorSeleccionado}</p>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <button onClick={() => setCantidad(c => Math.max(1, c - 1))} style={{ width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', borderRadius: '50%', border: `2px solid ${temaSecondary}`, background: 'none', color: temaText }}>-</button>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>{cantidad}</span>
                  <button onClick={() => setCantidad(c => c + 1)} style={{ width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', borderRadius: '50%', border: `2px solid ${temaAccent}`, background: 'none', color: temaText }}>+</button>
                </div>

                <div style={{ textAlign: 'center', borderTop: `1px solid ${temaBorder}`, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <span style={{ fontSize: '13px', opacity: 0.6, display: 'block' }}>Monto total a pagar</span>
                    <h2 style={{ margin: 0, fontSize: '36px', fontWeight: '900', color: temaAccent, textShadow: `0 0 15px ${temaAccent}33` }}>
                      S/ {precioTotalCalculado.toFixed(2)}
                    </h2>
                  </div>
                  <button onClick={intentarCompra} style={{ backgroundColor: temaAccent, color: '#000', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Continuar con la Compra
                  </button>
                  {errorSesion && <p style={{ color: '#ff4a4a', fontSize: '13px', margin: 0 }}>Debes iniciar sesión para comprar.</p>}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ maxWidth: '1200px', width: '100%', margin: '4rem auto 0 auto', padding: '0 2rem', boxSizing: 'border-box' }}>
          <InfoEstreno evento={ev} />
        </div>
      )}

      {/* 4. CASILLA DE TRAILERS DINÁMICA */}
      {/* Pasamos el evento completo "ev" de forma directa para inyectar los videos específicos */}
      <MovieTrailers evento={ev} />

    </div>
  );
}
