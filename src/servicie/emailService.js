export const emailService = {
  sendEmail: async (datosCorreo) => {
    const respuesta = await fetch('http://localhost:5000/api/correos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCorreo),
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok || !resultado.success) {
      throw new Error(resultado.error || 'Error en la petición de correo');
    }

    return resultado;
  }
};
