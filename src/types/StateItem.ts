import { ItemData } from "./Item";
import { SetStateAction } from "react";

export interface StateItem {
    items: ItemData[];
    addItem: (item: ItemData) => void;
    setItems: (newItems : ItemData[] | ((prevState : ItemData[]) => ItemData[])) => void;
    removeItem: (id : string) => void;
    updateItem: (id: string, updatedItem: Partial<ItemData>) => Promise<ItemData>
}