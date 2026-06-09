import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../contexto/CartContext';

export const CartWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, total, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckout = () => {
    setIsOpen(false);
    if (cart.length > 0) {
      navigate(`/checkout/${cart[0].eventId}`);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', fontFamily: 'sans-serif' }}>
      
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ position: 'relative', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center' }}
      >
        <span style={{ fontSize: '22px' }}>🛒</span>
        <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-10px',
          background: '#ff0055',
          color: '#fff',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '10px',
          fontWeight: 'bold',
          minWidth: '14px',
          textAlign: 'center'
        }}>
          {totalItems}
        </span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '35px',
          right: '0',
          backgroundColor: '#1a1c23',
          border: '1px solid #2d313f',
          borderRadius: '12px',
          width: '320px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid #2d313f',
            backgroundColor: '#111217'
          }}>
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingCart size={16} color="#ff0055" /> Mis Entradas ({totalItems})
            </span>
            <X 
              size={16} 
              color="#aaa" 
              style={{ cursor: 'pointer' }} 
              onClick={() => setIsOpen(false)} 
            />
          </div>

          <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px 0' }}>
            {cart.length === 0 ? (
              <div style={{ padding: '30px 16px', textAlign: 'center', color: '#888', fontSize: '13px' }}>
                Tu carrito está vacío.
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    borderBottom: '1px solid #2d313f'
                  }}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '13px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: '#888', margin: '2px 0 0 0', fontSize: '11px' }}>
                      Sector: <span style={{ color: '#ff0055' }}>{item.sector}</span>
                    </p>
                    <p style={{ color: '#aaa', margin: '2px 0 0 0', fontSize: '12px', fontWeight: '500' }}>
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <Trash2 
                    size={15} 
                    color="#888" 
                    style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#ff0055'}
                    onMouseLeave={(e) => e.target.style.color = '#888'}
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '16px', backgroundColor: '#111217', borderTop: '1px solid #2d313f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#aaa', fontSize: '13px' }}>Total a pagar:</span>
                <span style={{ color: '#39ff14', fontWeight: 'bold', fontSize: '16px' }}>${total}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={clearCart}
                  style={{
                    flex: '1',
                    backgroundColor: 'transparent',
                    color: '#aaa',
                    border: '1px solid #2d313f',
                    borderRadius: '6px',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#aaa'}
                >
                  Vaciar
                </button>
                <button
                  onClick={handleCheckout}
                  style={{
                    flex: '2',
                    backgroundColor: '#ff0055',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#df004a'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ff0055'}
                >
                  Terminar Compra
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
