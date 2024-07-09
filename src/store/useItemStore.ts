import { StateItem } from "@/types/StateItem";
import { create } from "zustand";

const useItemStore = create<StateItem>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    setItems: (items) => set(() => ({ items })),
    removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id)})),
}));

export default useItemStore;