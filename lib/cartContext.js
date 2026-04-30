'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodie-cart');
    const savedFavorites = localStorage.getItem('foodie-favorites');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('foodie-cart', JSON.stringify(cart));
  }, [cart]);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('foodie-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  };

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, quantity } : i))
    );
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((i) => i.slug === item.slug);
      if (exists) {
        return prev.filter((i) => i.slug !== item.slug);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (slug) => {
    return favorites.some((i) => i.slug === slug);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.discount > 0 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        isFavorite,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
