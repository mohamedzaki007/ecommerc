"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { addToCart, getCart, removeFromCart } from "@/app/actions/cart.actions";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItemQuantity: (itemId: string, action: "increase" | "decrease") => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const fetchCart = useCallback(async (token: string) => {
    try {
      const result = await getCart(token);
      if (result.success && result.data?.cartItems) {
        const normalizedItems = result.data.cartItems.map((cartItem: { product: { id: string; title: string; imageCover: string; }; price: number; count: number; }) => ({
          id: cartItem.product.id,
          title: cartItem.product.title,
          price: cartItem.price,
          imageCover: cartItem.product.imageCover,
          quantity: cartItem.count,
        }));
        return normalizedItems;
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
    return [];
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      const localCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

      if (isAuthenticated && session?.user?.token) {
        const serverCart = await fetchCart(session.user.token);
        const mergedCart = [...serverCart, ...localCart].reduce((acc: CartItem[], item) => {
          const exist = acc.find((i) => i.id === item.id);
          if (exist) {
            exist.quantity += item.quantity;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
        setCartItems(mergedCart);
      } else {
        setCartItems(localCart);
      }
    };

    loadCart();
  }, [isAuthenticated, session?.user?.token, fetchCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = useCallback(
    async (item: Omit<CartItem, "quantity">) => {
      setCartItems((prev) => {
        const exist = prev.find((i) => i.id === item.id);
        if (exist) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      toast.success(`Added ${item.title} to cart!`);

      const token = session?.user?.token;
      if (token) {
        const serverResult = await addToCart(item.id, token);
        if (!serverResult.success) {
          toast.error(serverResult.error || "Server error: Item not added.");
        } else {
          fetchCart(token);
        }
      }
    },
    [session, fetchCart]
  );

  const updateItemQuantity = useCallback((itemId: string, action: "increase" | "decrease") => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === itemId);
      if (!existingItem) return currentItems;

      if (action === "increase") {
        toast.success(`Quantity of ${existingItem.title} increased.`);
        return currentItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      if (action === "decrease") {
        if (existingItem.quantity > 1) {
          toast.success(`Quantity of ${existingItem.title} reduced.`);
          return currentItems.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
          );
        } else {
          toast.error(`Removed ${existingItem.title} from cart.`);
          return currentItems.filter((i) => i.id !== itemId);
        }
      }

      return currentItems;
    });
  }, []);

  const removeItem = useCallback(
    async (itemId: string) => {
      setCartItems((currentItems) => {
        const itemToRemove = currentItems.find((i) => i.id === itemId);
        if (itemToRemove) toast.error(`Removed ${itemToRemove.title} completely.`);
        return currentItems.filter((i) => i.id !== itemId);
      });

      const token = session?.user?.token;
      if (token) {
        const serverResult = await removeFromCart(itemId, token);
        if (!serverResult.success) {
          toast.error(serverResult.error || "Server error: Item not removed.");
        } else {
          fetchCart(token);
        }
      }
    },
    [session, fetchCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.error("Your shopping cart has been cleared.");
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
