// src/components/AudioBackground.jsx
import { useEffect, useRef } from 'react';

export default function AudioBackground() {
  // Guardamos la instancia del objeto de Audio en una referencia para que no se duplique
  const audioInstanceRef = useRef(null);

  useEffect(() => {
    // 1. Instanciamos el audio directamente apuntando al archivo mp3 de la carpeta public
    if (!audioInstanceRef.current) {
      audioInstanceRef.current = new Audio('');
      audioInstanceRef.current.loop = true; // Bucle infinito
      audioInstanceRef.current.volume = 0.25; // Volumen al 25% para que no aturda
    }

    const iniciarMusica = () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.play()
          .then(() => {
            console.log("🎵 Música de Dragon Ball reproducida con éxito.");
            // Una vez que empieza a sonar, removemos los sensores para no reiniciar la canción
            removerSensores();
          })
          .catch((error) => {
            console.log("El navegador sigue esperando una interacción directa (un clic firme).", error);
          });
      }
    };

    // Amarrar la activación a cualquier interacción del usuario en la pantalla
    const agregarSensores = () => {
      window.addEventListener('click', iniciarMusica);
      window.addEventListener('keydown', iniciarMusica);
      window.addEventListener('touchstart', iniciarMusica);
    };

    const removerSensores = () => {
      window.removeEventListener('click', iniciarMusica);
      window.removeEventListener('keydown', iniciarMusica);
      window.removeEventListener('touchstart', iniciarMusica);
    };

    agregarSensores();

    // Limpieza al desmontar la web
    return () => {
      removerSensores();
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }
    };
  }, []);

  return null; // Este componente controla la música desde el fondo de forma invisible, no necesita dibujar HTML
}
