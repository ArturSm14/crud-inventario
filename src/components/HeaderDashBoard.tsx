import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function HeaderDashBoard() {
  return (
    <header className="p-6">
      <div className="flex items-center justify-between max-w-full">
        <Button>Novo Item</Button>
        <form>
          <Input className="w-[25em]" id="nome" placeholder="Buscar Item" />
        </form>
      </div>
    </header>
  );
}
