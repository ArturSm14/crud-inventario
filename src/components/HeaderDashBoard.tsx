"use client"
import { ItemData } from "@/types/Item";
import CreateItemDialog from "./CreateItemDialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

import useItemStore from "@/store/useItemStore";
import ItemsFilter from "./ItemsFilter";



export default function HeaderDashBoard() {

  const { addItem, filterItemsByName } = useItemStore();

  async function handleAddItem(newItem: ItemData) {
    addItem(newItem)
  }

  function handleFilter(name: string) {
    filterItemsByName(name)
  }

  return (
    <header className="p-6">
      <div className="flex items-center justify-between max-w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Item</Button>
          </DialogTrigger>

          <CreateItemDialog onAddItem={handleAddItem}/>
        </Dialog>
        
        <ItemsFilter onFilter={handleFilter}/>

        
      </div>
    </header>
  );
}
