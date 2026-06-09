// src/contexto/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  }, [cart]);

  // Función ultra-resistente: fuerza la suma del ticket pase lo que pase
  const addToCart = (event, sector = 'General', price = 25, quantity = 0) => {
    // Si el evento viene vacío, creamos un boleto genérico para que no se rompa la app
    const datosEvento = event || { id: 'ticket-generico', title: 'Entrada General' };
    
    const finalId = datosEvento.id || datosEvento.id_evento || datosEvento._id || 'ticket-' + Math.random().toString(36).substr(2, 4);
    const finalTitle = datosEvento.title || datosEvento.name || 'Entrada de Evento';

    setCart((prevCart) => {
      const itemKey = `${finalId}-${sector}`;
      const existingItem = prevCart.find(item => item.id === itemKey);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prevCart, {
        id: itemKey,
        eventId: finalId,
        title: finalTitle,
        image: datosEvento.image || datosEvento.imagen || '',
        sector,
        price: Number(price || datosEvento.price || 25),
        quantity
      }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
