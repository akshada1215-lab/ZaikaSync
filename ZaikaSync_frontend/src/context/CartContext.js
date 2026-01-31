import React, { createContext, useContext, useState } from "react";
import { getCartByUserId } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await getCartByUserId(userId);
      console.log("Cart API response:", res.data); 
      setCartCount(res.data?.length || 0);
    } catch (err) {
      console.error("Cart count error", err);
      setCartCount(0);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
