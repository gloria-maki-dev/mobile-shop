import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(() => {
    const stored = localStorage.getItem('cartCount');
    return stored ? parseInt(stored) : 0;
  });

  const updateCount = (newCount) => {
    setCount(newCount);
    localStorage.setItem('cartCount', newCount);
  };

  return (
    <CartContext.Provider value={{ count, updateCount }}>
      {children}
    </CartContext.Provider>
  );
};
