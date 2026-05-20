'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'rusmet-cart-v1';

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  price: number;
  unit: string;
  size: string;
  quantity: number;
}

interface AddToCartPayload {
  productId: number;
  slug: string;
  name: string;
  price: number;
  unit: string;
  size: string;
}

export interface LastAdded {
  item: CartItem;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  lastAdded: LastAdded | null;
  addToCart: (product: AddToCartPayload, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  clearLastAdded: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.productId === 'number' &&
        typeof item.slug === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.unit === 'string' &&
        typeof item.size === 'string' &&
        typeof item.quantity === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);

  useEffect(() => {
    setItems(readCartFromStorage());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        setItems(readCartFromStorage());
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addToCart = useCallback((product: AddToCartPayload, quantity = 1) => {
    const safeQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.productId);
      if (!existing) {
        const newItem: CartItem = { ...product, quantity: safeQuantity };
        setLastAdded({ item: newItem, quantity: safeQuantity });
        return [...prev, newItem];
      }
      setLastAdded({ item: { ...existing, quantity: existing.quantity + safeQuantity }, quantity: safeQuantity });
      return prev.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + safeQuantity }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: safeQuantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const clearLastAdded = useCallback(() => {
    setLastAdded(null);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      lastAdded,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      clearLastAdded,
    }),
    [items, itemCount, lastAdded, addToCart, updateQuantity, removeFromCart, clearCart, clearLastAdded]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
}
