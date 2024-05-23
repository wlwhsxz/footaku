import { ObjectId } from "mongodb";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  _id: ObjectId;
  userId: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      login: (user) => {
        console.log("user", user);
        set({ user });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
