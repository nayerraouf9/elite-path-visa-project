"use client";
import React, { createContext, useContext, useState } from "react";

export type CartItem = {
  visaType: string;
  travelDate: string;
  processingType: string;
  count: number;
  totalPrice: number;
  id?: string;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => string;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const addToCart = (item: CartItem): string => {
    const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
    setCartItems(prev => [...prev, { ...item, id }]);
    return id;
  };

  const clearCart = () => setCartItems([]);

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, isCheckoutModalOpen, setIsCheckoutModalOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
