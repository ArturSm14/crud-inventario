"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ItemData } from "@/types/Item";
import useItemStore from "@/store/useItemStore";

export default function CardItem() {

    const { items, setItems } = useItemStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch('http://localhost:3001/items')
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const data: ItemData[] = await response.json();
                setItems(data)
            } catch(error) {
                console.error('Erro: ', error);
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [setItems])

    
    return(
        <div className="flex flex-wrap gap-3">
            {loading ? (
                <p className="text-center">Carregando...</p>
            ) : (
                items.map((item) => (
                    <Card key={item.id} className="bg-black text-white border-none w-1/4 h-96 flex flex-col justify-center items-center">
                        <CardHeader className="flex justify-center items-center">
                            <CardTitle>{item.nome}</CardTitle>
                            <CardDescription>{item.descricao}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Imagem</p>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <p>{item.categoria}</p>
                            <p>{item.quantidade}</p>
                        </CardFooter>
                    </Card>
                ))
            )}
        </div>
    )
}