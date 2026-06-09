import React from 'react';

export const Footer = () => {
  return (
    <footer style={{ background: '#111', color: '#aaa', padding: '40px 20px', marginTop: '50px', borderTop: '2px solid #222' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
        <div>
          <h3 style={{ color: '#fff' }}>TicketApp</h3>
          <p>Tu plataforma confiable de entradas para eventos masivos.</p>
        </div>
        <div>
          <h4 style={{ color: '#fff' }}>Soporte</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><a href="/ayuda" style={{ color: '#aaa', textDecoration: 'none' }}>Preguntas Frecuentes</a></li>
            <li><a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Términos de Servicio</a></li>
            <li><a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Políticas de Devolución</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff' }}>Pagos Seguros</h4>
          <div style={{ display: 'flex', gap: '10px', fontSize: '24px' }}>
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>📱 PayPal</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', borderTop: '1px solid #222', paddingTop: '20px' }}>
        &copy; {new Date().getFullYear()} TicketApp. Todos los derechos reservados.
      </div>
    </footer>
  );
};
