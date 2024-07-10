"use client"
import useItemStore from "@/store/useItemStore";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { itemSchema, ItemSchema,  } from "@/types/ItemForm";
import { ItemData } from "@/types/Item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateItemDialog( { onAddItem } : { onAddItem : ( newItem: ItemData) => void}){

    const { register, handleSubmit, formState: { errors } } = useForm<ItemSchema>({
        resolver: zodResolver(itemSchema),
    });

    const {  addItem } = useItemStore();
    const [ loading, setLoading] = useState(false)


    

    async function handleCreateItem(data: ItemSchema ) {
        console.log(data);
        setLoading(true);
        try{
            const newItem = await addNewItem(data);
            addItem(newItem);
            onAddItem(newItem);
        } catch (error) {
            console.error('Erro ao adicionar paciente', error);
        } finally {
            setLoading(false)
        }
    }

    async function addNewItem(newItem: Omit<ItemData, 'id'>): Promise<ItemData>{
        try{
            const response = await fetch('http://localhost:3001/items', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar item')
            }

            const data: ItemData = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Erro: ', error)
            throw error;
        }
    }


    return(
        <DialogContent className="bg-black border-none">
            <DialogHeader>
                <DialogTitle>Novo Item</DialogTitle>
                <DialogDescription>Adicionar novo Item ao Inventário</DialogDescription>
            </DialogHeader>

            <form  onSubmit={handleSubmit(handleCreateItem)} className="space-y-6">
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="name">Nome</Label>
                    <Input formNoValidate className="col-span-3" id="name" {...register("name")}/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="description">Descrição</Label>
                    <Input formNoValidate className="col-span-3" id="description" {...register("description")}/>
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="amount">Quantidade</Label>
                    <Input formNoValidate className="col-span-3" id="amount" {...register("amount")}/>
                    {errors.amount && <p>{errors.amount.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="category">Categoria</Label>
                    <Input formNoValidate className="col-span-3" id="category" {...register("category")}/>
                    {errors.category && <p>{errors.category.message}</p>}
                </div>
              

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"destructive"}>Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
            </form>
        </DialogContent>
    )
}