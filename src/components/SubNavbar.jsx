import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, HelpCircle, MapPin, Building2 } from 'lucide-react'; 

export default function SubNavbar({ rightElement }) {
  const navigate = useNavigate();

  const irAlInicio = () => {
    navigate('/'); 
  };

  const irAPuntoTicket = () => {
    navigate('/?categoria=Todos'); 
  };

  const irAPuntosVenta = () => {
    navigate('/puntos-de-venta');
  };

  const irACorporativo = () => {
    navigate('/corporativo');
  };

  const irAVendeConNosotros = () => {
    navigate('/vende-con-nosotros');
  };

  const irAMisTickets = () => {
    navigate('/mis-tickets'); 
  };

  const irAAyuda = () => {
    navigate('/ayuda'); 
  };
  return (
    <div style={{ 
      backgroundColor: '#4c1d95', 
      color: '#ffffff', 
      padding: '8px 4rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      fontSize: '13px',
      fontWeight: '600',
      fontFamily: 'sans-serif',
      borderBottom: '1px solid #3b0764'
    }}>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span 
          onClick={irAlInicio}
          style={botonEstilo()}
          onMouseEnter={(e) => e.target.style.color = '#39ff14'} 
          onMouseLeave={(e) => e.target.style.color = '#ffffff'}
        >
          Inicio
        </span>

        <span 
          onClick={irAPuntoTicket}
          style={botonEstilo()}
          onMouseEnter={(e) => e.target.style.color = '#39ff14'}
          onMouseLeave={(e) => e.target.style.color = '#ffffff'}
        >
          Punto Ticket
        </span>

        <span 
          onClick={irAPuntosVenta}
          style={{ ...botonEstilo(), display: 'flex', alignItems: 'center', gap: '6px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#39ff14'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          <MapPin size={14} /> Puntos de Venta
        </span>

        <span 
          onClick={irACorporativo}
          style={{ ...botonEstilo(), display: 'flex', alignItems: 'center', gap: '6px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#39ff14'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          <Building2 size={14} /> Corporativo
        </span>

        <span 
          onClick={irAVendeConNosotros}
          style={{ ...botonEstilo(), color: '#00ff66', fontWeight: 'bold' }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = '#00ff66'}
        >
          🚀 Vende con nosotros
        </span>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span 
          onClick={irAAyuda}
          style={{ ...botonEstilo(), display: 'flex', alignItems: 'center', gap: '6px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#39ff14'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          <HelpCircle size={16} /> Ayuda
        </span>

        <span 
          onClick={irAMisTickets}
          style={{ ...botonEstilo(), display: 'flex', alignItems: 'center', gap: '6px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#39ff14'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          <Ticket size={16} /> Mis Tickets
        </span>

        {rightElement && (
          <div style={{ borderLeft: '1px solid #6d28d9', paddingLeft: '1.5rem', display: 'flex', alignItems: 'center' }}>
            {rightElement}
          </div>
        )}
      </div>

    </div>
  );
}

function botonEstilo() {
  return {
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'color 0.2s ease',
    letterSpacing: '0.5px'
  };
}
