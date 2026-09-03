'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from 'react';

interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  color: string;
  colorCode: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('tomis-cart');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate the client-only cart from browser storage.
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      window.localStorage.removeItem('tomis-cart');
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hasHydrated) window.localStorage.setItem('tomis-cart', JSON.stringify(items));
  }, [hasHydrated, items]);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.variantId === item.variantId && i.size === item.size);
      if (existing) {
        return prev.map(i =>
          i.variantId === item.variantId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item, id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // ⚡ Bolt: Memoize derived state to prevent recalculation on unrelated re-renders
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  // ⚡ Bolt: Memoize the context value object
  // Impact: Prevents cascading re-renders in all Next.js components consuming useCart
  // whenever CartProvider's parent (RootLayout) re-renders or unrelated state changes.
  const value = useMemo(() => ({
    items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal
  }), [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
