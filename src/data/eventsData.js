// src/data/eventsData.js (Parte 1)
import { EVENTOS_CONCIERTOS } from './concierto';
import { EVENTOS_ANIME } from './anime';
import { EVENTOS_JUEGOS } from './juegos';
import { EVENTOS_GENERALES } from './eventos';
import { EVENTOS_OPERA } from './opera';

export const BANNER_SLIDES = [
  {
    id: "db-broly",
    titulo: "Dragon Ball Super: Broly",
    tipo: "ANIME",
    fecha: "Viernes, 14 de Agosto",
    imagen: "/eventos/anime/broly.jpg", 
    color: "linear-gradient(90deg, #020617 0%, #1e1b4b 60%, #03140f 100%)"
  },
  {
    id: "2",
    titulo: "Tu Nombre y El Mio",
    tipo: "EXHIBICIÓN",
    fecha: "03 de julio 2026 al 30 de agosto 2026",
    imagen: "/eventos/concierto/tu nombre.jpg",
    color: "linear-gradient(90deg, #1e1b4b 0%, #312e81 50%, #f43f5e 100%)"
  },
  {
    id: "3",
    titulo: "Rock Fest Masivo 2026",
    tipo: "CONCIERTOS",
    fecha: "05 de Noviembre 2026",
    imagen: "/eventos/concierto/Rock Fest 2026.jpg",
    color: "linear-gradient(90deg, #1c0a00 0%, #7c2d12 50%, #ea580c 100%)" 
  },
  {
    id: "comiccon-winter-fest",
    titulo: "Comic Con Winter Edition",
    tipo: "EVENTOS",
    fecha: "18 de Julio 2026",
    imagen: "/eventos/eventos/comiccon-winter.jpg",
    color: "linear-gradient(90deg, #020617 0%, #1e1b4b 50%, #4c0519 100%)"
  },
  {
    id: "newyear-party",
    titulo: "Mega Fiesta Año Nuevo 2027",
    tipo: "EVENTOS",
    fecha: "31 de Diciembre 2026",
    imagen: "/eventos/eventos/newyear.jpg",
    color: "linear-gradient(90deg, #060214 0%, #170c02 60%, #1e130c 100%)"
  }
];
// src/data/eventsData.js (Parte 2)

export const CATEGORIAS_LISTA = ["Todos", "Anime", "Conciertos", "Ópera", "Juegos", "Eventos"];

// 🚀 FUSIÓN COMPLETA SIN ERRORES: Juntamos todos los arrays utilizando el operador spread (...)
export const EVENTOS_POOL = [
  ...EVENTOS_CONCIERTOS,
  ...EVENTOS_ANIME,
  ...EVENTOS_JUEGOS,
  ...EVENTOS_OPERA,
  ...EVENTOS_GENERALES
];
