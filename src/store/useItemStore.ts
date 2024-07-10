import { ItemData } from "@/types/Item";
import { StateItem } from "@/types/StateItem";
import { create } from "zustand";

const useItemStore = create<StateItem>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    setItems: (newItems) => set((state) => ({ items: typeof newItems === 'function' ? newItems(state.items) : newItems })),
    removeItem: (id: string) => set((state) => ({ items: state.items.filter(item => item.id !== id)})),
    updateItem: async (id, updatedItem) => {
        const response = await fetch(`http://localhost:3001/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar item');
        }

        const updatedItemData: ItemData = await response.json();

        set((state) => ({
            items: state.items.map(item =>
                item.id === id ? { ...item, ...updatedItemData } : item
            ),
        }));

        return updatedItemData;
    },
}));

export default useItemStore;