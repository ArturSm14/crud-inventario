import { ItemData } from "@/types/Item";
import { StateItem } from "@/types/StateItem";
import { create } from "zustand";

const useItemStore = create<StateItem>((set) => ({
    items: [],
    filteredItems: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item], filteredItems: [...state.filteredItems, item] })),
    setItems: (newItems) => set((state) => {
        const items = typeof newItems === 'function' ? newItems(state.items) : newItems;
        return { items, filteredItems: items}
    }),
    removeItem: (id: string) => set((state) => { 
        const  items = state.items.filter(item => item.id !== id);
        return { items, filteredItems: items}
    }),
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

        set((state) => {
            const items = state.items.map(item =>
                item.id === id ? { ...item, ...updatedItemData } : item
            );
            return { items, filteredItems: items };
        });

        return updatedItemData;
    },
    filterItemsByName: (name) => set(state => ({
        filteredItems: state.items.filter(item => 
            item.name.toLowerCase().includes(name.toLowerCase())
        )
    })),

    fetchItems: async () => {
        try{
            const response = await fetch('http://localhost:3001/items');
            if (!response) {
                throw new Error('Erro ao buscar dados');
            }

            const data: ItemData[] = await response.json();
            set({ items: data, filteredItems: data})
        } catch(error) {
            console.error("Erro ao buscar dados: ", error)
        }
    },
    restoreItems: () => set((state) => ({
        filteredItems: state.items,
    }))
}));

export default useItemStore;