"use client"

import { ItemData } from "@/types/Item";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { itemSchema, ItemSchema } from "@/types/ItemForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useItemStore from "@/store/useItemStore";

export default function EditItemDialog({
    itemId,
    initialData,
    onItemUpdated,
}: {
    itemId: string;
    initialData: ItemData;
    onItemUpdated: (updatedItem: ItemData) => void;
})  {

    const  updateItem = useItemStore((state) => state.updateItem);

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<ItemSchema>({
        resolver : zodResolver(itemSchema),
        defaultValues: initialData,
    });


    useEffect(() => {
        if (initialData) {
            setValue("name", initialData.name)
            setValue("description", initialData.description)
            setValue("amount", initialData.amount)
            setValue("category", initialData.category)
        }
    }, [initialData, setValue])

    

    const handleFormSubmit = async (data: ItemSchema) => {
        console.log(data)
        try{
            const updatedData: ItemData = { id: itemId, ...data}
            const updatedItem = await updateItem( updatedData.id, updatedData)
            onItemUpdated(updatedItem)
        } catch (error) {
            console.error("Erro ao atualizar item :", error)
        }
    }

    

    return(
        <DialogContent className="bg-black">
            <DialogHeader>
                <DialogTitle>Editar Item</DialogTitle>
                <DialogDescription>Atualizar informações do item</DialogDescription>
            </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className=" grid grid-cols-6 items-center text-right gap-3">
                        <Label htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register("name")}/>
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div className=" grid grid-cols-6 items-center text-right gap-3">
                        <Label htmlFor="description">Descrição</Label>
                        <Input className="col-span-3" id="description" {...register("description")}/>
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <div className=" grid grid-cols-6 items-center text-right gap-3">
                        <Label htmlFor="amount">Quantidade</Label>
                        <Input className="col-span-3" id="amount" {...register("amount")}/>
                        {errors.amount && <p>{errors.amount.message}</p>}
                    </div>
                    <div className=" grid grid-cols-6 items-center text-right gap-3">
                        <Label htmlFor="category">Categoria</Label>
                        <Input className="col-span-3" id="category" {...register("category")}/>
                        {errors.category && <p>{errors.category.message}</p>}
                    </div>
                   

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"destructive"}>Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
    )
}