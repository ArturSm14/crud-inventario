import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CreateItemDialog(){
    return(
        <DialogContent className="bg-black border-none">
            <DialogHeader>
                <DialogTitle>Novo Item</DialogTitle>
                <DialogDescription>Adicionar novo Item ao Inventário</DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="nome">Nome</Label>
                    <Input className="col-span-3" id="nome"/>
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input className="col-span-3" id="descricao"/>
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="quantidade">Quantidade</Label>
                    <Input className="col-span-3" id="quantidade"/>
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input className="col-span-3" id="categoria"/>
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="imagens">Imagens</Label>
                    <Input className="col-span-3" id="imagens"/>
                </div>

                <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant={"destructive"}>Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
            </DialogFooter>
            </form>
        </DialogContent>
    )
}