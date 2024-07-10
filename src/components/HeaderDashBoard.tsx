"use client"
import { ItemData } from "@/types/Item";
import CreateItemDialog from "./CreateItemDialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import useItemStore from "@/store/useItemStore";

export default function HeaderDashBoard() {

  const {  setItems } = useItemStore();

  async function handleAddItem(newItem: ItemData) {
    setItems((prev) => [...prev, newItem])
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
        <form className="flex items-center gap-2">
          <Input className="w-[25em]" id="nome" placeholder="Buscar Item" />
          <Button type="submit" variant={"secondary"}>Buscar</Button>
        </form>
      </div>
    </header>
  );
}
