import { useState, useEffect, useCallback } from 'react';
import { CartAPI } from '@/services/api';

const SESSION_ID_KEY = 'kteena_session_id';

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = getOrCreateSessionId();

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await CartAPI.getBySession(sessionId);
      
      if (result.success && result.data) {
        setCartItems(result.data);
      } else {
        setError(result.error || 'Failed to fetch cart');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await CartAPI.addItem(sessionId, productId, quantity);
      
      if (result.success && result.data) {
        setCartItems(result.data);
        return true;
      } else {
        setError(result.error || 'Failed to add to cart');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await CartAPI.updateQuantity(itemId, quantity);
      
      if (result.success && result.data) {
        setCartItems(result.data);
        return true;
      } else {
        setError(result.error || 'Failed to update quantity');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await CartAPI.removeItem(itemId);
      
      if (result.success) {
        await fetchCart();
        return true;
      } else {
        setError(result.error || 'Failed to remove from cart');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await CartAPI.clearSession(sessionId);
      
      if (result.success) {
        setCartItems([]);
        return true;
      } else {
        setError(result.error || 'Failed to clear cart');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    cartItems,
    loading,
    error,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
  };
}
