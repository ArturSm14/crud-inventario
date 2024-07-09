"use client"
import useItemStore from "@/store/useItemStore";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { createItemSchema, CreateItemSchema } from "@/types/ItemForm";
import { ItemData } from "@/types/Item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateItemDialog(){

    const { register, handleSubmit, formState: { errors } } = useForm<CreateItemSchema>({
        resolver: zodResolver(createItemSchema),
    });

    const { items, addItem, setItems } = useItemStore();
    const [ loading, setLoading] = useState(false)


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
                throw new Error('Erro ao adicionar paciente')
            }

            const data: ItemData = await response.json();
            return data;
        } catch (error) {
            console.error('Erro: ', error)
            throw error;
        }
    }

    async function handleCreateItem(data: CreateItemSchema ) {
        event?.preventDefault();
        console.log(data);
        setLoading(true);
        try{
            const newItem = await addNewItem(data);
            addItem(newItem);
        } catch (error) {
            console.error('Erro ao adicionar paciente', error);
        } finally {
            setLoading(false)
        }
    }


    return(
        <DialogContent className="bg-black border-none">
            <DialogHeader>
                <DialogTitle>Novo Item</DialogTitle>
                <DialogDescription>Adicionar novo Item ao Inventário</DialogDescription>
            </DialogHeader>

            <form  onSubmit={handleSubmit(handleCreateItem)}className="space-y-6">
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="nome">Nome</Label>
                    <Input className="col-span-3" id="nome" {...register("nome")}/>
                    {errors.nome && <p>{errors.nome.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input className="col-span-3" id="descricao" {...register("descricao")}/>
                    {errors.descricao && <p>{errors.descricao.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="quantidade">Quantidade</Label>
                    <Input className="col-span-3" id="quantidade" {...register("quantidade")}/>
                    {errors.quantidade && <p>{errors.quantidade.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input className="col-span-3" id="categoria" {...register("categoria")}/>
                    {errors.categoria && <p>{errors.categoria.message}</p>}
                </div>
                <div className=" grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="imagens">Imagens</Label>
                    <Input type="image" className="col-span-3" id="imagens" {...register("imagens")}/>
                    {errors.imagens && <p>{errors.imagens.message}</p>}
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