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
  lastRemovedStack: { uid: string; item: CartItem; expiresAt: number }[];
  undoRemove: (uid?: string) => void;
  dismissUndo: (uid: string) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [lastRemovedStack, setLastRemovedStack] = useState<{ uid: string; item: CartItem; expiresAt: number }[]>([]);
  const clearTimersRef = React.useRef<Record<string, number>>({});

  // restore undo stack from sessionStorage on mount
  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem('undoStack');
      if (!raw) return;
      const parsed: { uid: string; item: CartItem; expiresAt: number }[] = JSON.parse(raw);
      const now = Date.now();
      const valid = parsed.filter(p => p.expiresAt > now);
      if (valid.length === 0) return;
      setLastRemovedStack(valid);
      // set timers for each entry
      valid.forEach(p => {
        const remaining = Math.max(0, p.expiresAt - now);
        const t = window.setTimeout(() => {
          setLastRemovedStack(stack => stack.filter(s => s.uid !== p.uid));
          delete clearTimersRef.current[p.uid];
        }, remaining);
        clearTimersRef.current[p.uid] = t as unknown as number;
      });
    } catch (err) {
      // ignore parse errors
    }
  }, []);

  // persist undo stack to sessionStorage whenever it changes
  React.useEffect(() => {
    try {
      if (!lastRemovedStack || lastRemovedStack.length === 0) {
        sessionStorage.removeItem('undoStack');
      } else {
        sessionStorage.setItem('undoStack', JSON.stringify(lastRemovedStack));
      }
    } catch (err) {
      // ignore storage errors
    }
  }, [lastRemovedStack]);

  const addToCart = (item: CartItem): string => {
    const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
    setCartItems(prev => [...prev, { ...item, id }]);
    return id;
  };

  const clearCart = () => setCartItems([]);

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === id) || null;
      const next = prev.filter(i => i.id !== id);
      if (item) {
        const uid = `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
        const expiresAt = Date.now() + 8000;
        setLastRemovedStack(stack => [{ uid, item, expiresAt }, ...stack]);
        // set timer to auto-dismiss this undo entry
        const t = window.setTimeout(() => {
          // remove from stack when timer expires
          setLastRemovedStack(stack => stack.filter(s => s.uid !== uid));
          delete clearTimersRef.current[uid];
        }, 8000);
        clearTimersRef.current[uid] = t as unknown as number;
      }
      return next;
    });
  };

  const undoRemove = (uid?: string) => {
    setLastRemovedStack(stack => {
      if (stack.length === 0) return stack;
      const targetUid = uid || stack[0].uid;
      const found = stack.find(s => s.uid === targetUid);
      if (!found) return stack;
      // restore the item to cart
      setCartItems(prev => [...prev, found.item]);
      // clear timer
      const t = clearTimersRef.current[targetUid];
      if (t) {
        window.clearTimeout(t);
        delete clearTimersRef.current[targetUid];
      }
      // remove from stack
      return stack.filter(s => s.uid !== targetUid);
    });
  };

  const dismissUndo = (uid: string) => {
    setLastRemovedStack(stack => stack.filter(s => s.uid !== uid));
    const t = clearTimersRef.current[uid];
    if (t) {
      window.clearTimeout(t);
      delete clearTimersRef.current[uid];
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, lastRemovedStack, undoRemove, dismissUndo, isCheckoutModalOpen, setIsCheckoutModalOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
