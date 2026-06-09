export const socialAuthService = {
  
  // 🔵 CONEXIÓN CON LA API DE GOOGLE (GMAIL)
  loginConGoogle: () => {
    return new Promise((resolve, reject) => {
      // Simulamos el retraso de la red real cuando abre la ventana emergente de Google
      setTimeout(() => {
        try {
          // Aquí es donde en el futuro Firebase o Google SDK capturan la cuenta real
          const respuestaExitosaAPI = {
            id: "goog-" + Math.random().toString(36).substr(2, 9),
            nombre: "Guerrero Z Promedio", // Nombre real que viene del Gmail del usuario
            email: "saiyan_test@gmail.com", // Correo real del usuario
            foto: "https://googleusercontent.com",
            proveedor: "Google"
          };
          
          resolve(respuestaExitosaAPI);
        } catch (error) {
          reject("❌ Error cuántico: La conexión con el satélite de Google falló.");
        }
      }, 1200); // 1.2 segundos de simulación de carga
    });
  },

  // 🔵 CONEXIÓN CON LA API DE FACEBOOK (META)
  loginConFacebook: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const respuestaExitosaAPI = {
            id: "fb-" + Math.random().toString(36).substr(2, 9),
            nombre: "Goku Red Social",
            email: "kakaroto_fb@hotmail.com",
            foto: "https://facebook.com",
            proveedor: "Facebook"
          };
          
          resolve(respuestaExitosaAPI);
        } catch (error) {
          reject("❌ Error perimetral: Meta denegó los permisos de lectura de perfil.");
        }
      }, 1200);
    });
  }
};
