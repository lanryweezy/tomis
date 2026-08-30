'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useOptimistic, startTransition } from 'react';

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
  optimisticItems: CartItem[];
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  const [optimisticItems, setOptimisticItems] = useOptimistic<CartItem[], { type: 'UPDATE'; payload: { id: string, quantity: number } } | { type: 'ADD'; payload: Omit<CartItem, 'id'> } | { type: 'REMOVE'; payload: string }>(
    items,
    (state, action) => {
      switch (action.type) {
        case 'ADD':
          const payloadAdd = action.payload as Omit<CartItem, 'id'>;
          const existing = state.find(i => i.variantId === payloadAdd.variantId && i.size === payloadAdd.size);
          if (existing) {
            return state.map(i => i.variantId === payloadAdd.variantId && i.size === payloadAdd.size ? { ...i, quantity: i.quantity + payloadAdd.quantity } : i);
          }
          return [...state, { ...payloadAdd, id: `optimistic-${Date.now()}` }];
        case 'UPDATE':
          const payloadUpdate = action.payload as { id: string, quantity: number };
          return state.map(i => i.id === payloadUpdate.id ? { ...i, quantity: payloadUpdate.quantity } : i);
        case 'REMOVE':
          const payloadRemove = action.payload as string;
          return state.filter(i => i.id !== payloadRemove);
        default:
          return state;
      }
    }
  );

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
    startTransition(() => {
      setOptimisticItems({ type: 'ADD', payload: item });
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeItem = useCallback((id: string) => {
    startTransition(() => {
      setOptimisticItems({ type: 'REMOVE', payload: id });
    });
    setItems(prev => prev.filter(i => i.id !== id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    startTransition(() => {
      if (quantity <= 0) {
        setOptimisticItems({ type: 'REMOVE', payload: id });
      } else {
        setOptimisticItems({ type: 'UPDATE', payload: { id, quantity } });
      }
    });
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = optimisticItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = optimisticItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items: optimisticItems, optimisticItems, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
