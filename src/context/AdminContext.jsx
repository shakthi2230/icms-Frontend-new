import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAdminStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

    
      login: ({ accessToken, refreshToken }) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      updateTokens: ({ accessToken, refreshToken }) => {
        set({
          accessToken: accessToken || get().accessToken,
          refreshToken: refreshToken || get().refreshToken,
        });
      },

     
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "icoms-admin",
      getStorage: () => localStorage,
    }
  )
);

export default useAdminStore;
