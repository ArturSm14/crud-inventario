import { ItemData } from "./Item";

export interface CardItemProps {
    items: ItemData[],
    onFilter: (name: string) => void
}