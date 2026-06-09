import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

export default function IniciarSesion({ setUsuarioLogueado }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!correo || !contrasena) return alert("Por favor, rellena todos los campos.");
    
    if (setUsuarioLogueado) {
      setUsuarioLogueado({ nombre: correo.split('@')[0] });
    }
    navigate('/');
  };

  return (
    <div style={contenedorFondo}>
      {/* LOGO DE TU PLATAFORMA */}
      <div onClick={() => navigate('/')} style={logoContenedor}>
        <Clapperboard size={36} color="#ff0055" />
        <span style={logoTexto}>TICKETVERSE</span>
      </div>

      {/* CAJA BLANCA DEL FORMULARIO */}
      <div style={cajaBlancaFormulario}>
        <button onClick={() => navigate('/')} style={botonVolver}>← Volver</button>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', margin: 0, color: '#111', fontWeight: 'bold', textAlign: 'center' }}>
            Inicia sesión en tu cuenta
          </h2>
        </div>

        {/* Formulario Tradicional */}
        <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={grupoCampo}>
            <label style={etiquetaEstilo}>Correo electrónico</label>
            <input 
              type="email" 
              placeholder="Introduce tu correo electrónico" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              style={inputEstilo} 
              required 
            />
          </div>

          <div style={grupoCampo}>
            <label style={etiquetaEstilo}>Contraseña</label>
            <input 
              type="password" 
              placeholder="*********" 
              value={contrasena} 
              onChange={(e) => setContrasena(e.target.value)} 
              style={inputEstilo} 
              required 
            />
          </div>

          <button type="submit" style={botonAccionPrincipal}>INICIAR SESIÓN</button>
        </form>

        <div style={enlaceIntercambio}>
          ¿No tienes una cuenta? <span onClick={() => navigate('/registro')} style={textoResaltadoEnlace}>Regístrate aquí</span>
        </div>
      </div>
    </div>
  );
}

// ESTILOS COMPARTIDOS
const contenedorFondo = {
  backgroundColor: '#0b0c10',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'sans-serif',
  padding: '2rem 1.5rem',
  boxSizing: 'border-box'
};

const logoContenedor = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  marginBottom: '1.5rem'
};

const logoTexto = {
  fontWeight: 'bold',
  fontSize: '1.8rem',
  letterSpacing: '0.5px',
  color: '#fff'
};

const cajaBlancaFormulario = {
  backgroundColor: '#fff',
  borderRadius: '24px',
  padding: '2.5rem 2rem',
  width: '100%',
  maxWidth: '440px',
  boxShadow: '0px 10px 30px rgba(0,0,0,0.5)',
  boxSizing: 'border-box'
};

const botonVolver = {
  background: 'none',
  border: 'none',
  color: '#111',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600',
  marginBottom: '1.5rem',
  padding: 0
};

const grupoCampo = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
};

const etiquetaEstilo = {
  fontSize: '0.9rem',
  fontWeight: '600',
  color: '#333'
};

const inputEstilo = {
  width: '100%',
  padding: '0.85rem 1.2rem',
  borderRadius: '20px',
  border: '1px solid #ffccd5',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#333'
};

const botonAccionPrincipal = {
  width: '100%',
  backgroundColor: '#1e1b4b',
  color: '#fff',
  border: 'none',
  borderRadius: '25px',
  padding: '1rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '0.5rem',
  letterSpacing: '0.5px'
};

const enlaceIntercambio = {
  textAlign: 'center',
  marginTop: '1.5rem',
  fontSize: '0.85rem',
  color: '#555'
};

const textoResaltadoEnlace = {
  color: '#ff0055',
  cursor: 'pointer',
  fontWeight: 'bold'
};
