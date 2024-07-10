import { ItemData } from "./Item";


export interface StateItem {
    items: ItemData[];
    filteredItems: ItemData[];
    addItem: (item: ItemData) => void;
    setItems: (newItems : ItemData[] | ((prevState : ItemData[]) => ItemData[])) => void;
    removeItem: (id : string) => void;
    updateItem: (id: string, updatedItem: Partial<ItemData>) => Promise<ItemData>
    filterItemsByName: (name: string) => void;
    fetchItems: () => Promise<void>
    restoreItems: () => void;
}