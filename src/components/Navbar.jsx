import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// Importamos Bell (Campana) y Mail (Correo) de lucide-react para tus iconos avanzados
import { Clapperboard, User, Search, Bell, Mail } from 'lucide-react';

import SubNavbar from './SubNavbar';
import { CartWidget } from './CartWidget';
import { useCart } from '../hooks/useCart';

export default function Navbar({ usuarioLogueado, setUsuarioLogueado }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Capturamos los parámetros activos de la URL al cargar
  const consultaBusquedaUrl = searchParams.get("search") || "";
  const categoriaActualUrl = searchParams.get("categoria") || "Todos";

  // Control local del texto que el usuario escribe en el input
  const [busqueda, setBusqueda] = useState(consultaBusquedaUrl);
  const [mostrarAlertas, setMostrarAlertas] = useState(false); // Estado para abrir/cerrar la campana
  const { cart } = useCart(); // Acceso directo al estado global del carrito

  // Estado para renderizar el iframe invisible de limpieza solo al hacer Logout
  const [iframeLimpiezaUrl, setIframeLimpiezaUrl] = useState("");

  // Sincroniza el input superior si los parámetros de la URL cambian de forma externa
  useEffect(() => {
    setBusqueda(consultaBusquedaUrl);
  }, [consultaBusquedaUrl]);

  const listaNotificaciones = [
    { id: 1, texto: "¡Pago exitoso! Tu ticket ha sido enviado al correo.", tiempo: "Hace un momento", leido: false },
    { id: 2, texto: "¡Últimos 10 tickets disponibles para Hablando Huevadas!", tiempo: "Hace 5 min", leido: false },
    { id: 3, texto: "Inicio de sesión correcto desde un nuevo dispositivo.", tiempo: "Hace 1 hora", leido: true }
  ];

  // MOTOR DE BÚSQUEDA CORREGIDO: Conserva la categoría actual al buscar letras
  const manejarBusqueda = (e) => {
    e.preventDefault();
    const nuevosParams = {};
    
    if (categoriaActualUrl !== "Todos") {
      nuevosParams.categoria = categoriaActualUrl;
    }
    if (busqueda.trim() !== "") {
      nuevosParams.search = busqueda;
    }

    setSearchParams(nuevosParams);
    
    if (window.location.pathname !== "/") {
      const queryStr = new URLSearchParams(nuevosParams).toString();
      navigate(`/?${queryStr}`);
    }
  };

  const irAlCheckout = () => {
    if (cart.length > 0) {
      navigate(`/checkout/${cart.eventId}`);
    }
  };
  return (
    <header style={{ 
      fontFamily: 'sans-serif', 
      backgroundColor: '#111217', 
      borderBottom: '1px solid #222530', 
      position: 'relative', 
      width: '100%',
      zIndex: 100 
    }}>
      
      {/* 🔴 IFRAME INVISIBLE: Limpia la sesión de Google en segundo plano sin redirigir al usuario */}
      {iframeLimpiezaUrl && (
        <iframe 
          src={iframeLimpiezaUrl} 
          title="Limpieza Silenciosa"
          style={{ display: 'none', width: 0, height: 0, border: 'none' }} 
          onLoad={() => {
            // Una vez que el iframe carga y limpia, reseteamos su estado
            setIframeLimpiezaUrl("");
          }}
        />
      )}

      <SubNavbar rightElement={<CartWidget onClickCart={irAlCheckout} />} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 4rem', gap: '2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* LOGO DE TU PLATAFORMA */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff' }}>
          <Clapperboard size={32} color="#ff0055" />
          <span style={{ fontWeight: 'bold', fontSize: '1.4rem', letterSpacing: '0.5px' }}>TICKETVERSE</span>
        </Link>

        {/* BUSCADOR DE EVENTOS */}
        <form onSubmit={manejarBusqueda} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#222530', borderRadius: '20px', padding: '0.4rem 1rem', flex: 1, maxWidth: '500px' }}>
          <input 
            type="text" 
            placeholder="Buscar conciertos, óperas, eventos..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
          <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}>
            <Search size={18} />
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
          
          <button onClick={() => navigate('/panel-mailing')} title="Panel de Envíos Masivos" style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ff0055'} onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>
            <Mail size={22} />
          </button>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setMostrarAlertas(!mostrarAlertas)} title="Ver Notificaciones" style={{ background: 'none', border: 'none', color: mostrarAlertas ? '#ff0055' : '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative', transition: 'color 0.2s ease' }} onMouseEnter={(e) => !mostrarAlertas && (e.currentTarget.style.color = '#ff0055')} onMouseLeave={(e) => !mostrarAlertas && (e.currentTarget.style.color = '#aaa')}>
              <Bell size={22} />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: '#ff0055', width: '8px', height: '8px', borderRadius: '50%' }} />
            </button>

            {mostrarAlertas && (
              <div style={{ position: 'absolute', top: '35px', right: '0', backgroundColor: '#1a1d26', border: '1px solid #2d3245', borderRadius: '8px', width: '280px', boxShadow: '0px 8px 24px rgba(0,0,0,0.5)', padding: '0.5rem 0', zIndex: 200, color: '#fff' }}>
                <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #2d3245', fontSize: '0.85rem', fontWeight: 'bold', color: '#ff0055' }}>Notificaciones Recientes</div>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {listaNotificaciones.map((notif) => (
                    <div key={notif.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #222530', fontSize: '0.75rem', lineHeight: '1.2rem', backgroundColor: notif.leido ? 'transparent' : '#222530' }}>
                      <div style={{ color: '#eee' }}>{notif.texto}</div>
                      <div style={{ color: '#666', fontSize: '0.65rem', marginTop: '3px' }}>{notif.tiempo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <select onChange={(e) => navigate(`/?ciudad=${e.target.value}`)} style={{ backgroundColor: '#222530', color: '#aaa', border: '1px solid #333', borderRadius: '15px', padding: '0.4rem 1rem', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}>
            <option value="todos">Todas las Regiones</option>
            <option value="santiago">Santiago</option>
            <option value="lima">Lima</option>
            <option value="bogota">Bogotá</option>
            <option value="buenos_aires">Buenos Aires</option>
          </select>

          {usuarioLogueado ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#fff' }}>
              <User size={18} />
              <span style={{ fontSize: '0.9rem' }}>{usuarioLogueado.nombre}</span>
              
              {/* 🔴 BOTÓN SALIR CON DESCONEXIÓN ULTRA-SEGURA POR IFRAME */}
              <button 
                type="button"
                onClick={async () => {
                  try {
                    // 1. Destruimos la sesión local en el backend de Node (puerto 5000)
                    await fetch('http://localhost:5000/api/auth/logout');
                  } catch (err) {
                    console.error("Error al revocar sesión local:", err);
                  }

                  // 2. Activamos el iframe con la URL de deslogueo. 
                  // Esto limpia la cuenta de Google en secreto sin recargar ni redireccionar tu pestaña principal.
                  setIframeLimpiezaUrl('https://google.com');

                  // 3. Removemos el usuario del estado en la app de React
                  setUsuarioLogueado(null);
                }} 
                style={{ backgroundColor: 'transparent', border: '1px solid #ff0055', color: '#ff0055', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Salir
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => navigate('/autenticacion', { state: { formularioInicial: 'login' } })} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '20px', padding: '0.5rem 1.2rem', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>Inicia Sesión</button>
              <button type="button" onClick={() => navigate('/autenticacion', { state: { formularioInicial: 'registro' } })} style={{ backgroundColor: '#ff0055', color: '#fff', border: 'none', borderRadius: '20px', padding: '0.5rem 1.2rem', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>Registrarse</button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
