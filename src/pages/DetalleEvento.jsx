import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { EVENTOS_POOL } from '../data/eventsData';
import SectorsTable from '../components/SectorsTable';

export default function DetalleEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ESTADOS REACTIVOS: Vinculan los clicks de SectorsTable con el resumen
  const [tarifaFiltro, setTarifaFiltro] = useState("REGULAR"); 
  const [nombreZonaActiva, setNombreZonaActiva] = useState("Por favor, selecciona una zona");
  
  // Ponemos el precio inicial en 0 para que empiece marcando S/ 0.00
  const [precioBase, setPrecioBase] = useState(0); 
  const [cantidad, setCantidad] = useState(0);

  const evento = EVENTOS_POOL.find(ev => ev.id === id);

  if (!evento) {
    return (
      <div style={{ backgroundColor: '#0b0c10', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <h2>❌ Evento no encontrado</h2>
        <Link to="/" style={{ color: '#e11d48', marginTop: '1rem', textDecoration: 'none', fontWeight: 'bold' }}>Regresar a cartelera</Link>
      </div>
    );
  }

  const stockDisponible = evento.capacidadMaxima - (evento.ticketsVendidos || 0);
  const estaAgotado = stockDisponible === 0;

  // Esta función la ejecutará SectorsTable cada vez que toques un precio
  const seleccionarTarifa = (nombreZona, precio) => {
    setNombreZonaActiva(nombreZona);
    setPrecioBase(precio);
    // ✅ Cambia a 1 solo si el usuario estaba en 0 al dar click real
    if (cantidad === 0) setCantidad(1);
  };

  const incrementar = () => {
    if (cantidad < stockDisponible && cantidad < 4) setCantidad(prev => prev + 1);
  };

  const decrementar = () => {
    // ✅ CORREGIDO: Permite decrementar limpiamente hasta llegar al 0 absoluto
    if (cantidad > 0) setCantidad(prev => prev - 1);
  };

  const irAlCheckout = () => {
    if (precioBase === 0 || cantidad === 0) return;
    localStorage.setItem("cantidadTicketsCompra", cantidad);
    localStorage.setItem("eventoIdCompra", evento.id);
    localStorage.setItem("zonaNombreCompra", nombreZonaActiva);
    localStorage.setItem("precioUnitarioCompra", precioBase);
    localStorage.setItem("montoTotalCompra", (precioBase * cantidad).toFixed(2));
    navigate('/autenticacion'); 
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#ffffff', minHeight: '100vh', padding: '2rem 1rem', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Enlace atrás */}
        <div onClick={() => navigate('/')} style={{ color: '#cbd5e1', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '14px', fontWeight: 'bold' }}>
          <ArrowLeft size={16} /> Regresar a la cartelera
        </div>

        {/* Contenedor Principal */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', width: '100%' }}>
          
          {/* COLUMNA IZQUIERDA: Filtros y Tabla Interactiva */}
          <div style={{ flex: '1 1 550px', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '100%' }}>
            <img src={evento.imagen} alt={evento.titulo} style={{ width: '100%', height: 'auto', maxHeight: '360px', objectFit: 'cover', borderRadius: '16px' }} />

            {/* Selectores superiores para filtrar columnas de la tabla */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setTarifaFiltro("DSCTO")} style={{ padding: '10px 20px', backgroundColor: tarifaFiltro === "DSCTO" ? '#39ff14' : '#111217', color: tarifaFiltro === "DSCTO" ? '#000' : '#fff', border: '1px solid #333', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Ver Descuentos</button>
              <button type="button" onClick={() => setTarifaFiltro("REGULAR")} style={{ padding: '10px 20px', backgroundColor: tarifaFiltro === "REGULAR" ? '#39ff14' : '#111217', color: tarifaFiltro === "REGULAR" ? '#000' : '#fff', border: '1px solid #333', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Tarifa Regular</button>
            </div>

            {/* Tu componente SectorsTable recibiendo los estados correspondientes */}
            <SectorsTable 
              tarifaFiltro={tarifaFiltro}
              precioBase={precioBase}
              seleccionarTarifa={seleccionarTarifa}
              temaAccent="#00e5ff"
            />
          </div>

          {/* COLUMNA DERECHA: Información y Tarjeta de Resumen con Cálculo Automático */}
          <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ backgroundColor: '#ff007f', color: 'white', padding: '4px 10px', fontSize: '11px', fontWeight: '800', borderRadius: '4px', display: 'inline-block', marginBottom: '0.8rem' }}>{evento.categoria}</span>
              <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#ffffff', margin: 0 }}>{evento.titulo}</h1>
            </div>

            {/* TARJETA DE RESUMEN DE COMPRA CORREGIDA */}
            <div style={{ background: 'linear-gradient(135deg, #181528 0%, #111217 100%)', border: '1px solid #ff007f', borderRadius: '16px', padding: '2rem', boxSizing: 'border-box' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center', margin: '0 0 6px 0' }}>Resumen de Compra</h3>
              
              {/* Muestra la zona activa o pide seleccionar si la cantidad es cero */}
              <p style={{ fontSize: '13px', color: cantidad === 0 ? '#ffb703' : '#39ff14', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', margin: '0 0 2rem 0' }}>
                {cantidad === 0 ? "Por favor, selecciona una zona" : nombreZonaActiva}
              </p>

              {/* Controles de cantidad interactivos */}
              {!estaAgotado && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '2rem' }}>
                  <button 
                    type="button" 
                    onClick={decrementar} 
                    disabled={cantidad <= 0}
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      border: '2px solid #ffb703', 
                      background: 'none', 
                      color: '#ffffff', 
                      fontSize: '20px', 
                      fontWeight: 'bold', 
                      cursor: cantidad <= 0 ? 'not-allowed' : 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      opacity: cantidad <= 0 ? 0.4 : 1
                    }}
                  >
                    -
                  </button>
                  <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '22px', minWidth: '20px', textAlign: 'center' }}>{cantidad}</span>
                  <button type="button" onClick={incrementar} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #4f46e5', background: 'none', color: '#ffffff', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              )}

              <hr style={{ border: '0', borderTop: '1px solid #222530', margin: '1.5rem 0' }} />

              {/* MONTO TOTAL EN SOLES DINÁMICO CORREGIDO */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Monto total a pagar</span>
                <span style={{ fontSize: '38px', fontWeight: '900', color: '#4f46e5' }}>
                  {/* ✅ Si la cantidad es 0, fuerza matemáticamente el 0.00 en pantalla */}
                  S/ {cantidad === 0 ? "0.00" : (precioBase * cantidad).toFixed(2)}
                </span>
              </div>

              {/* Botón dinámico que se bloquea si no hay entradas seleccionadas */}
              <button 
                type="button" 
                onClick={irAlCheckout} 
                disabled={cantidad === 0 || precioBase === 0}
                style={{ 
                  width: '100%', 
                  backgroundColor: (cantidad === 0 || precioBase === 0) ? '#1e293b' : '#4f46e5', 
                  color: (cantidad === 0 || precioBase === 0) ? '#64748b' : '#ffffff', 
                  border: 'none', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  fontWeight: 'bold', 
                  fontSize: '15px',
                  cursor: (cantidad === 0 || precioBase === 0) ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {(cantidad === 0 || precioBase === 0) ? "Selecciona tus entradas" : "Continuar con la Compra"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
