"use client"
import useItemStore from "@/store/useItemStore";
import CardItem from "./CardItem";
import { useEffect } from "react";

const CardItemsWrapper: React.FC = () => {
    const { filteredItems , fetchItems, filterItemsByName, restoreItems } = useItemStore((state) => ({
        filteredItems: state.filteredItems,
        fetchItems: state.fetchItems,
        filterItemsByName: state.filterItemsByName,
        restoreItems: state.restoreItems,
    }))

    useEffect(() => {
        fetchItems();
    },[fetchItems])

    const handleFilter = (name: string) => {
        filterItemsByName(name)
    }

    

    return <CardItem items={filteredItems} onFilter={handleFilter} />
}

export default CardItemsWrapper;