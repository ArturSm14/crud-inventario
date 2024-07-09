import CreateItemDialog from "./CreateItemDialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

export default function HeaderDashBoard() {
  return (
    <header className="p-6">
      <div className="flex items-center justify-between max-w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Item</Button>
          </DialogTrigger>

          <CreateItemDialog />
        </Dialog>
        <form className="flex items-center gap-2">
          <Input className="w-[25em]" id="nome" placeholder="Buscar Item" />
          <Button type="submit" variant={"secondary"}>Buscar</Button>
        </form>
      </div>
    </header>
  );
}
