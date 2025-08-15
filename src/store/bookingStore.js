import { create } from "zustand";

export const useBookingStore = create((set) => ({
  search: { checkIn: "", checkOut: "", guests: 2 },
  setSearch: (payload) => set((s) => ({ search: { ...s.search, ...payload } })),
  cart: null,
  setCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: null }),
}));
