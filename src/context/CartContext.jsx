import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { cartKey } from "../utils/cart";
import { LIMELLE_CONFIG } from "../config/limelle";

const CartContext = createContext(null);

const STORAGE_KEY = "limelle-cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* localStorage unavailable */
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const key = cartKey(product);
      const existing = current.find((item) => cartKey(item.product) === key);
      if (existing) {
        return current.map((item) =>
          cartKey(item.product) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { product, quantity }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (key, quantity) => {
    setCart((current) =>
      current.map((item) =>
        cartKey(item.product) === key ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (key) => {
    setCart((current) => current.filter((item) => cartKey(item.product) !== key));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const productTotal = useMemo(
    () => cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0),
    [cart]
  );

  const totalWeight = useMemo(
    () => cart.reduce((sum, item) => sum + (item.product.weight || 0.5) * item.quantity, 0),
    [cart]
  );

  const transportEstimate = useMemo(() => {
    const minWeight = LIMELLE_CONFIG.transport.minimumWeightKg || 1;
    const rate = LIMELLE_CONFIG.transport.ratePerKg || 4000;
    const billedWeight = Math.max(minWeight, Math.ceil(totalWeight));
    return billedWeight * rate;
  }, [totalWeight]);

  const totalEstimate = useMemo(
    () => productTotal + transportEstimate,
    [productTotal, transportEstimate]
  );

  const value = {
    cart,
    cartOpen,
    setCartOpen,
    cartCount,
    productTotal,
    totalWeight,
    transportEstimate,
    totalEstimate,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

