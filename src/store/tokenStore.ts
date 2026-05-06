import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenStore = {
  token: string | null;
  user: { username: string } | null;
  setToken: (token: string, user: { username: string }) => void;
  clearToken: () => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token: string) => {
        set({ token });
      },

      clearToken: () => {
        set({ token: null });
      },
    }),
    {
      name: "token-storage",
    },
  ),
);
