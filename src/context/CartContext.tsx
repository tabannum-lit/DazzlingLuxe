import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, Product } from '../types';

const STORAGE_KEY = 'dazzling-luxe-cart';

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
  products: Product[];
};

/**
 * Read the saved cart during the initial render.
 *
 * This must happen in the state initialiser rather than in an effect. With an
 * effect, the save-effect below also fires on mount — while `items` is still
 * the empty default — and overwrites the stored cart before the restored state
 * is committed. Under StrictMode's double-invoked effects the hydrate pass then
 * reads that `[]` back and the cart is silently emptied on every reload.
 */
const readStoredCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children, products }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable (private mode, quota). The cart still works
      // for this session; it just won't survive a reload.
    }
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items, products]);

  const value: CartContextValue = {
    items,
    totalQuantity,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
