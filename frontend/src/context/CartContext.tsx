import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import api from '../api';

export interface ProductImage {
  id: string;
  url: string;
  displayOrder: number;
}

export interface ProductSpec {
  id: string;
  specKey: string;
  specValue: string;
  groupName?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  stockQty: number;
  brand: string;
  rating: number;
  ratingCount: number;
  images: ProductImage[];
  specs: ProductSpec[];
  category?: Category;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface CartSummary {
  itemCount: number;
  totalMrp: number;
  discount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

interface CartContextType {
  cart: CartItem[];
  summary: CartSummary;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
}

const defaultSummary: CartSummary = { itemCount: 0, totalMrp: 0, discount: 0, subtotal: 0, shippingFee: 0, total: 0 };

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>(defaultSummary);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth(); // Depend on token so that we fetch cart when user logs in

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/cart');
      setCart(res.data.data.items || []);
      setSummary(res.data.data.summary || defaultSummary);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      await api.post('/cart', { productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error('Failed to add to cart', err);
      throw err;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove from cart', err);
      throw err;
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/${cartItemId}`, { quantity });
      await fetchCart();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update';
      alert(msg);
      throw err;
    }
  };

  const clearCart = () => {
    setCart([]);
    setSummary(defaultSummary);
  };

  return (
    <CartContext.Provider
      value={{ cart, summary, fetchCart, addToCart, removeFromCart, updateQuantity, clearCart, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
