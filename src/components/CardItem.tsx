"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ItemData } from "@/types/Item";
import useItemStore from "@/store/useItemStore";
import { Button } from "./ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "./ui/dialog";
import EditItemDialog from "./EditItemDialog";
import { CardItemProps } from "@/types/CardItemProps";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from "next/image";

const CardItem: React.FC<CardItemProps> = ({ items, onFilter }) => {
  const { setItems, removeItem } = useItemStore();
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  useEffect(() => {
    console.log("Items being rendered: ", items)
  }, [items])

  const handleUpdatedItem = (updatedItem: ItemData) => {
    setItems((prevItems: ItemData[]) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  async function handleDeleteItem(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar item");
      }

      removeItem(id);
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  }

  return (
    <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="bg-black text-white border-none rounded-lg overflow-hidden "
        >
          <CardHeader className="">
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="relative h-96">
                <Carousel className="w-full h-full flex items-center justify-center">
                    <CarouselContent className="flex w-full h-full">
                      {item.imageUrl1 && (
                        <CarouselItem className="flex-none w-full h-full">
                            <Image 
                                src={item.imageUrl1}
                                alt={item.name}
                                width={200}
                                height={200}
                                className="object-cover w-full h-full m-2"
                            />
                        </CarouselItem >
                      )}
                        {item.imageUrl2 && (
                        <CarouselItem className="flex-none w-full h-full">
                            <Image 
                                src={item.imageUrl1}
                                alt={item.name}
                                width={150}
                                height={200}
                                className="object-cover w-full h-full m-2"
                            />
                        </CarouselItem >
                      )}
                        {item.imageUrl3 && (
                        <CarouselItem className="flex-none w-full h-full">
                            <Image 
                                src={item.imageUrl1}
                                alt={item.name}
                                width={150}
                                height={200}
                                className="object-cover w-full h-full m-2"
                            />
                        </CarouselItem >
                      )}
                        {item.imageUrl4 && (
                        <CarouselItem className="flex-none w-full h-full">
                            <Image 
                                src={item.imageUrl1}
                                alt={item.name}
                                width={150}
                                height={200}
                                className="object-cover w-full h-full m-2"
                            />
                        </CarouselItem >
                      )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p>{item.category}</p>
            <p>{item.amount}</p>
          </CardFooter>
          <div className="w-max flex gap-2">
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
            <Button
              onClick={() => handleDeleteItem(item.id)}
              variant={"destructive"}
            >
              Excluir
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardItem;
