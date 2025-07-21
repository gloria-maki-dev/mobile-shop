import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

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

export const useCart = () => useContext(CartContext);
