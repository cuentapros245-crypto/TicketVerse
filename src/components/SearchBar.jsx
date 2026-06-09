import React, { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('todos');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ query, city });
  };

  return (
    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Buscar eventos, artistas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
      />
      <select 
        value={city} 
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', background: '#fff', border: '1px solid #ccc' }}
      >
        <option value="todos">Todas las ciudades</option>
        <option value="cdmx">Ciudad de México</option>
        <option value="lima">Lima</option>
        <option value="bogota">Bogotá</option>
      </select>
      <button type="submit" style={{ padding: '8px 16px', background: '#ff0055', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Buscar
      </button>
    </form>
  );
};
