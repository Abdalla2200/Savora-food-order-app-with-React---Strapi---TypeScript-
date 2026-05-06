import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (meal: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;

  getTotalPrice: () => number;
  getTotalQuantity: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutData: null,
      addToCart: (meal) =>
        set((state) => {
          const existingItem = state.items.find((item) => meal.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === meal.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return {
              items: [...state.items, { ...meal, quantity: 1 }],
            };
          }
        }),
      increaseQty: (id) =>
        set((state) => {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          };
        }),
      decreaseQty: (id) =>
        set((state) => {
          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity > 0 ? item.quantity - 1 : item.quantity,
                  }
                : item,
            ),
          };
        }),
      removeFromCart: (id) =>
        set((state) => {
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        }),
      clearCart: () => set({ items: [] }),
      getTotalQuantity: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
