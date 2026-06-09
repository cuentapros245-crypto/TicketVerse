import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clapperboard, Eye, EyeOff } from 'lucide-react';
import './Autenticacion.css'; // Conexión directa a tus clases CSS corregidas

export default function Autenticacion({ setUsuarioLogueado }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [modoRegistro, setModoRegistro] = useState(false);

  // Estados de captura de datos
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCellular] = useState('');
  const [tipoDoc, setTipoDoc] = useState('DNI');
  const [numDoc, setNumDoc] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [distrito, setDistrito] = useState('');
  
  const [recibirInfo, setRecibirInfo] = useState(true);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [verContrasena, setVerContrasena] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  // Escucha los eventos y clics del Navbar superior de forma directa
  useEffect(() => {
    if (location.state && location.state.formularioInicial) {
      setModoRegistro(location.state.formularioInicial === 'registro');
    }
  }, [location.state]);

  // MOTOR DE CONEXIÓN POPUP REAL: Abre una ventana externa independiente hacia tu Backend
  const manejarLoginSocial = (proveedor) => {
    if (proveedor !== 'Google') {
      console.log(`Iniciando sesión segura con ${proveedor}`);
      const usuarioSimulado = {
        nombre: 'Usuario Facebook',
        correo: 'social_facebook@ticketverse.com'
      };
      if (setUsuarioLogueado) setUsuarioLogueado(usuarioSimulado);
      redirigirPostLogin();
      return;
    }

    const ancho = 550;
    const alto = 650;
    const izquierda = window.screen.width / 2 - ancho / 2;
    const arriba = window.screen.height / 2 - alto / 2;

    const ventanaPopup = window.open(
      'http://localhost:5000/api/auth/google',
      'Ticketverse - Iniciar sesión con Google',
      `width=${ancho},height=${alto},top=${arriba},left=${izquierda},status=no,resizable=yes,scrollbars=yes`
    );

    const escucharMensajePopup = (evento) => {
      if (evento.origin !== 'http://localhost:5000') return;

      if (evento.data && evento.data.tipo === 'AUTH_SUCCESS') {
        const datosUsuarioOficial = evento.data.usuario;
        
        if (setUsuarioLogueado) {
          setUsuarioLogueado(datosUsuarioOficial);
        }

        window.removeEventListener('message', escucharMensajePopup);
        if (ventanaPopup) ventanaPopup.close();

        redirigirPostLogin();
      }
    };

    window.addEventListener('message', escucharMensajePopup);
  };

  const redirigirPostLogin = () => {
    const tieneCompraPendiente = localStorage.getItem("eventoIdCompra");
    if (tieneCompraPendiente) {
      navigate('/checkout');
    } else {
      navigate('/');
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (modoRegistro) {
      if (!aceptaTerminos) return alert("Debes aceptar los Términos y Condiciones.");
      if (contrasena !== confirmarContrasena) return alert("Las contraseñas no coinciden.");
      if (setUsuarioLogueado) setUsuarioLogueado({ nombre });
    } else {
      if (!correo || !contrasena) return alert("Por favor, rellena todos los campos.");
      if (setUsuarioLogueado) setUsuarioLogueado({ nombre: correo.split('@')[0] });
    }
    redirigirPostLogin();
  };
  return (
    <div className="auth-screen">
      <div className={`auth-card ${modoRegistro ? 'card-registro' : 'card-login'}`}>
        
        {/* Botón Volver */}
        <button type="button" onClick={() => navigate('/')} className="btn-volver">
          ← Volver a Cartelera
        </button>

        {/* Encabezado Unificado con tu Icono */}
        <div className="header-container">
          <div className="logo-row">
            <Clapperboard size={36} color="#ff0055" />
            <span className="logo-text">TICKET<span className="text-pink">VERSE</span></span>
          </div>
          <h2 className="subtitle-text">
            {modoRegistro ? 'Sé parte del show' : 'Inicia sesión en tu cuenta'}
          </h2>
          {modoRegistro && (
            <p className="desc-text">¡Artistas, entradas y emoción en un solo lugar!.</p>
          )}
        </div>

        {/* ================= FORMULARIO 1: LOGIN ESTILO OSCURO ================= */}
        {!modoRegistro ? (
          <div>
            {/* Botón de Google reparado con SVG de alta disponibilidad */}
            <button 
              type="button" 
              className="btn-social" 
              onClick={() => manejarLoginSocial('Google')}
            >
              <img 
                src="https://img.icons8.com/color/48/google-logo.png" 
                alt="Google" 
                style={{ width: '20px', height: '20px', marginRight: '12px' }} 
              />
              Continúa con Google
            </button>

            <div className="auth-divider">
              <div className="divider-line"></div>
              <span className="divider-text">O continúa con:</span>
              <div className="divider-line"></div>
            </div>

            <form onSubmit={manejarEnvio} className="auth-form">
              <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} className="auth-input" required />
              <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="auth-input" required />
              <button type="submit" className="auth-submit-btn">INICIAR SESIÓN</button>
            </form>
          </div>
        ) : (
          /* ================= FORMULARIO 2: REGISTRO EXTENDIDO ESTILO OSCURO ================= */
          <form onSubmit={manejarEnvio} className="auth-form">
            <div className="form-row">
              <input type="text" placeholder="Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="auth-input" />
              <input type="text" placeholder="Apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} className="auth-input" />
            </div>

            <div className="form-row align-end">
              <input type="tel" placeholder="Celular" required value={celular} onChange={(e) => setCellular(e.target.value)} className="auth-input" />
              <div className="doc-grid">
                <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} className="auth-select select-doc-width">
                  <option value="DNI">DNI</option>
                  <option value="CE">C.E.</option>
                </select>
                <input type="text" placeholder="Número de Documento" required value={numDoc} onChange={(e) => setNumDoc(e.target.value)} className="auth-input input-flex" />
              </div>
            </div>

            <input type="email" placeholder="Correo electrónico" required value={correo} onChange={(e) => setCorreo(e.target.value)} className="auth-input" />

            <div className="form-row">
              <div className="relative-field">
                <input type={verContrasena ? "text" : "password"} placeholder="Contraseña" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="auth-input" />
                <button type="button" onClick={() => setVerContrasena(!verContrasena)} className="btn-eye">{verContrasena ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
              <div className="relative-field">
                <input type={verConfirmar ? "text" : "password"} placeholder="Confirmar Contraseña" required value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} className="auth-input" />
                <button type="button" onClick={() => setVerConfirmar(!verConfirmar)} className="btn-eye">{verConfirmar ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>

            <select value={distrito} onChange={(e) => setDistrito(e.target.value)} required className="auth-select">
              <option value="">Seleccione su Distrito</option>
              <option value="lima">Lima Centro</option>
              <option value="miraflores">Miraflores</option>
              <option value="surco">Santiago de Surco</option>
            </select>

            <label className="auth-checkbox-container"><input type="checkbox" checked={recibirInfo} onChange={(e) => setRecibirInfo(e.target.checked)} /><span>Desea recibir información de descuentos, mas eventos y demás</span></label>
            <label className="auth-checkbox-container"><input type="checkbox" required checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} /><span>Declaro que he leído y acepto los Términos y condiciones de TICKETVERSE SAC</span></label>

            <button type="submit" className="auth-submit-btn">REGISTRARSE</button>
          </form>
        )}

        {/* Alternador de pie de página */}
        <div className="footer-toggle-link">
          {modoRegistro ? (
            <span>¿Ya tienes una cuenta? <span onClick={() => setModoRegistro(false)} className="link-highlight">Inicia sesión aquí</span></span>
          ) : (
            <span>¿No tienes una cuenta? <span onClick={() => setModoRegistro(true)} className="link-highlight">Regístrate aquí</span></span>
          )}
        </div>

      </div>
    </div>
  );
}
