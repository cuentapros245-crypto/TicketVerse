// src/pages/Corporativo.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Corporativo() {
  const navigate = useNavigate();

  // Estados para capturar los datos ingresados en el formulario
  const [razonSocial, setRazonSocial] = useState('');
  const [correoContacto, setCorreoContacto] = useState('');
  const [detalles, setDetalles] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Manejador del botón de envío conectado al puerto 5000 de tu Node.js
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!razonSocial || !correoContacto || !detalles) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    setEnviando(true);

    // Estructura idéntica a la que espera recibir tu endpoint en server.js
    const datosCotizacion = {
      email: "cuentapros245@gmail.com", // Destinatario (Administrador de la ticketera)
      asunto: `🏢 SOLICITUD DE ENTRADAS CORPORATIVAS: ${razonSocial}`,
      contenido: `
        Se ha recibido un nuevo requerimiento empresarial desde el formulario web:
        
        - Empresa / Razón Social: ${razonSocial}
        - Correo de Contacto Corporativo: ${correoContacto}
        - Detalles del Pedido / Cotización: ${detalles}
      `
    };

    try {
      // Conexión directa mediante FETCH a tu backend local
      const respuesta = await fetch('http://localhost:5000/api/correos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosCotizacion)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.success) {
        alert("¡Requerimiento enviado con éxito al administrador de TicketVerse!");
        // Limpiamos las cajas de texto tras el éxito
        setRazonSocial('');
        setCorreoContacto('');
        setDetalles('');
      } else {
        alert("El servidor no pudo procesar el correo. Revisa tus credenciales.");
      }
    } catch (error) {
      console.error("Error en la conexión fetch:", error);
      alert("No se pudo establecer comunicación con el servidor. Asegúrate de ejecutar 'node server.js' en la terminal.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#0b0c10',
      color: '#fff',
      minHeight: '100vh',
      padding: '2rem 4rem',
      paddingTop: '120px', // 🚀 ESTE ES EL AJUSTE PARA QUE NO SE META DETRÁS DE LAS BARRAS SUPERIORES
      fontFamily: 'sans-serif'
    }}>
      {/* Botón superior de retorno */}
      <button 
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: '#39ff14',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}
      >
        ← Volver a Cartelera
      </button>

      {/* Encabezado Principal */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ letterSpacing: '1px', color: '#fff6f6', fontSize: '2rem', marginBottom: '1rem' }}>
          🏢 SERVICIOS CORPORATIVOS
        </h1>
        <p style={{ color: '#fff6f6', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6rem' }}>
          Cotiza compras masivas de entradas, eventos de integración empresarial o vales de consumo exclusivos para tus colaboradores.
        </p>
      </div>

      {/* Tarjeta del Formulario Estético */}
      <form 
        onSubmit={manejarEnvio}
        style={{
          backgroundColor: '#111217',
          border: '1px solid #222530',
          borderRadius: '12px',
          padding: '2.5rem',
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Razón Social de la Empresa</label>
          <input 
            type="text"
            required
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            placeholder="Ej. Innovatech S.A.C."
            style={inputEstilo}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Correo Corporativo de Contacto</label>
          <input 
            type="email"
            required
            value={correoContacto}
            onChange={(e) => setCorreoContacto(e.target.value)}
            placeholder="ejemplo@empresa.com"
            style={inputEstilo}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Detalles de la cotización</label>
          <textarea 
            required
            rows="5"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            placeholder="Indica el evento de interés y el número aproximado de entradas que requieres..."
            style={{ ...inputEstilo, resize: 'none', fontFamily: 'sans-serif' }}
          />
        </div>

        <button 
          type="submit"
          disabled={enviando}
          style={{
            backgroundColor: '#00ff66',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: enviando ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            marginTop: '1rem',
            opacity: enviando ? 0.7 : 1
          }}
          onMouseEnter={(e) => !enviando && (e.target.style.backgroundColor = '#39ff14')}
          onMouseLeave={(e) => !enviando && (e.target.style.backgroundColor = '#00ff66')}
        >
          {enviando ? 'Enviando Requerimiento...' : 'Enviar Requerimiento'}
        </button>
      </form>
    </div>
  );
}

const inputEstilo = {
  backgroundColor: '#1f222b',
  border: '1px solid #2d3245',
  borderRadius: '6px',
  padding: '0.8rem 1rem',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease'
};
