import { create } from "zustand";
import { persist } from "zustand/middleware";

type CheckoutData = {
  name: string;
  phone: string;
  address: string;
  paymentMethod: "cash" | "card";
};

type CheckoutStore = {
  checkoutData: CheckoutData | null;
  setCheckoutData: (data: CheckoutData) => void;
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      checkoutData: null,
      setCheckoutData: (data) => set({ checkoutData: data }),
    }),
    {
      name: "checkout-storage",
    },
  ),
);
