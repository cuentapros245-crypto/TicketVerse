import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Aquí conectarás con tu base de datos en el futuro
    setUser(userData);
    localStorage.setItem('ticket_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ticket_user');
  };

  return { user, login, logout, isAuthenticated: !!user };
};
