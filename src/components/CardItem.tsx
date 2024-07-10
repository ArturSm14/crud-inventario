"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ItemData } from "@/types/Item";
import useItemStore from "@/store/useItemStore";
import { Button } from "./ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "./ui/dialog";
import EditItemDialog from "./EditItemDialog";
import { CardItemProps } from "@/types/CardItemProps";

const CardItem: React.FC<CardItemProps> =({ items, onFilter }) => {

    const { setItems, removeItem } = useItemStore();
    const[selectedItem, setSelectedItem] = useState<ItemData | null>(null)


    const handleUpdatedItem = (updatedItem : ItemData) => {
        setItems((prevItems: ItemData[]) => 
            prevItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
   }

   async function handleDeleteItem(id: string) {
    try {
        const response = await fetch(`http://localhost:3001/items/${id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error('Erro ao deletar item');
        }

        removeItem(id);
    } catch (error) {
        console.error('Erro ao deletar item:', error)
    }

}

    
    return(
        <div className="flex flex-wrap gap-3">
            {(
                items.map((item) => (
                        <Card key={item.id} className="bg-black text-white border-none w-1/4 h-96 flex flex-col justify-center items-center">
                            <CardHeader className="flex items-center h-screen">
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Imagem</p>
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <p>{item.category}</p>
                                <p>{item.amount}</p>
                            </CardFooter>
                            <div className="w-max flex gap-36">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedItem(item)}>Editar</Button>
                                    </DialogTrigger>

                                    {selectedItem && (
                                        <EditItemDialog 
                                            itemId={selectedItem.id}
                                            initialData={selectedItem}
                                            onItemUpdated={handleUpdatedItem}
                                        />
                                    )}
                                </Dialog>
                                <Button onClick={() => handleDeleteItem(item.id)} variant={"destructive"}>Excluir</Button>
                            </div>
                        </Card>
                ))
            )}
        </div>
    )
}

export default CardItem;