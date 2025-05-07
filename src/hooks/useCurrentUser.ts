import { create } from "zustand";

interface UserState {
  currentUser: { id: string | null; name: string | null } | null;
  setCurrentUser: (user: { id: string | null; name: string | null } | null) => void;
}

export const useCurrentUser = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
