import { createContext, useState, useContext } from 'react';
import { EVENTOS_POOL as poolInicial, BANNER_SLIDES as bannerInicial } from '../data/eventsData';

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [eventos, setEventos] = useState(poolInicial);
  const [banners, setBanners] = useState(bannerInicial);

  // Función clave: Resta la cantidad de boletos comprados al evento correspondiente
  const restarTickets = (eventoId, cantidadComprada) => {
    setEventos((prevEventos) =>
      prevEventos.map((ev) =>
        ev.id === eventoId
          ? { ...ev, ticketsVendidos: (ev.ticketsVendidos || 0) + cantidadComprada }
          : ev
      )
    );
  };

  return (
    <EventsContext.Provider value={{ eventos, banners, restarTickets }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
