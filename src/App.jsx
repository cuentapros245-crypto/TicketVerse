// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail'; 
import Autenticacion from './pages/Autenticacion';
import Checkout from './pages/Checkout';

import MisTickets from './pages/MisTickets';
import Ayuda from './pages/Ayuda';

import PuntosDeVenta from './pages/PuntosDeVenta';
import Corporativo from './pages/Corporativo';
import VendeConNosotros from './pages/VendeConNosotros';

// IMPORTAMOS TUS COMPONENTES AVANZADOS PARA LAS NOTIFICACIONES Y EL SERVIDOR
import Notificaciones from './components/Notificaciones';
import PanelMailing from './components/PanelMailing';

import AudioBackground from './components/AudioBackground';

import gogetaGif from './assets/img/gogeta.gif';

import { CartProvider } from './contexto/CartContext';
import { EVENTOS_POOL } from './data/eventsData';

function AppContent() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([
    { email: "user@test.com", password: "123", nombre: "Gamer Pro" }
  ]);

  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(false); 

  useEffect(() => {
    const flashTimer = setTimeout(() => {
      setFlash(true);
    }, 1100); 

    const endTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 99999
      }}>
        <img 
          src={gogetaGif} 
          alt="Cargando Ticketverse..." 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: 1 
          }} 
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          opacity: flash ? 1 : 0,
          transition: 'opacity 0.1s ease-in', 
          pointerEvents: 'none',
          zIndex: 999999
        }} />
      </div>
    );
  }

  return (
    <Router>
      <AudioBackground />

      <Navbar usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />
      
      {/* 🚀 OJO AQUÍ: Todo el contenido de la web pasa a renderizarse ESTRICTAMENTE dentro de Routes */}
      <Routes>
        {/* La cartelera (Home) ahora queda amarrada SOLAMENTE a la pantalla inicial "/" */}
        <Route path="/" element={<Home eventos={EVENTOS_POOL} />} />
        
        <Route path="/evento/:id" element={<EventDetail usuarioLogueado={usuarioLogueado} eventos={EVENTOS_POOL} />} />
        <Route path="/autenticacion" element={<Autenticacion usuariosRegistrados={usuariosRegistrados} setUsuariosRegistrados={setUsuariosRegistrados} setUsuarioLogueado={setUsuarioLogueado} />} />
        <Route path="/checkout/:id" element={<Checkout usuarioLogueado={usuarioLogueado} />} />
        
        <Route path="/mis-tickets" element={<MisTickets />} />
        <Route path="/ayuda" element={<Ayuda />} />

        <Route path="/puntos-de-venta" element={<PuntosDeVenta />} />
        <Route path="/corporativo" element={<Corporativo />} />
        <Route path="/vende-con-nosotros" element={<VendeConNosotros />} />

        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/panel-mailing" element={<PanelMailing />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
