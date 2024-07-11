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
import { string } from "zod";
import { v4 } from "uuid"


export default function CreateItemDialog( { onAddItem } : { onAddItem : ( newItem: ItemData) => void}){

    const { register, handleSubmit, reset , formState: { errors } } = useForm<ItemSchema>({
        resolver: zodResolver(itemSchema),
    });

    const {  addItem } = useItemStore();
    const [ loading, setLoading] = useState(false)


    async function handleCreateItem(data: ItemSchema ) {
        console.log(data);
        setLoading(true);
        try{
            const newItem = await addNewItem(data);
            onAddItem(newItem);
            reset();
        } catch (error) {
            console.error('Erro ao adicionar paciente', error);
        } finally {
            setLoading(false)
        }
    }

    async function addNewItem(newItem: Omit<ItemData, 'id'>): Promise<ItemData>{
        const itemWithId = { id: v4(), ...newItem}
        try{
            const response = await fetch('http://localhost:3001/items', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(itemWithId)
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
                <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="imageUrl1">URL da Imagem 1</Label>
                    <Input formNoValidate className="col-span-3" id="imageUrl1" {...register('imageUrl1')} />
                    {errors.imageUrl1 && <p>{errors.imageUrl1.message}</p>}
                </div>
                <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="imageUrl2">URL da Imagem 2</Label>
                    <Input formNoValidate className="col-span-3" id="imageUrl2" {...register('imageUrl2')} />
                    {errors.imageUrl2 && <p>{errors.imageUrl2.message}</p>}
                </div>
                <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="imageUrl3">URL da Imagem 3</Label>
                    <Input formNoValidate className="col-span-3" id="imageUrl3" {...register('imageUrl3')} />
                    {errors.imageUrl3 && <p>{errors.imageUrl3.message}</p>}
                </div>
                <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="imageUrl4">URL da Imagem 4</Label>
                    <Input formNoValidate className="col-span-3" id="imageUrl4" {...register('imageUrl4')} />
                    {errors.imageUrl4 && <p>{errors.imageUrl4.message}</p>}
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