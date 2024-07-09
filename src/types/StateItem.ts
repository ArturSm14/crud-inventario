import { ItemData } from "./Item";

export interface StateItem {
    items: ItemData[];
    addItem: (item: ItemData) => void;
    setItems: (items : ItemData[]) => void;
    removeItem: (id : number) => void;
}