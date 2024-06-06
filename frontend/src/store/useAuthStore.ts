import { ObjectId } from "mongodb";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  _id: ObjectId;
  userId: string;
  followings: string[];
  isFirstLogin: boolean;
}

interface AuthState {
  user: User | null;
  setFirstLoggedIn: (value: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setFirstLoggedIn: (value: boolean) => {
        set((state) => {
          if (state.user) {
            return { user: { ...state.user, isFirstLogin: value } };
          }
          return state;
        });
      },
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
