import { itemsFilterSchema, ItemsFilterSchema } from "@/types/ItemsFilterSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { ItemsFilterProps } from "@/types/ItemFilterProps"

export default function ItemsFilter({ onFilter } : ItemsFilterProps){
   
        const { register, handleSubmit } = useForm<ItemsFilterSchema>({
            resolver: zodResolver(itemsFilterSchema)
        })

        function handleFilterProducts(data: ItemsFilterSchema) {
            console.log(data)
            onFilter(data.name)
        }
    
        return(
            <form onSubmit={handleSubmit(handleFilterProducts)} className="flex items-center gap-2">
              <Input className="w-[25em]" id="name" placeholder="Nome do Item" {...register('name')}/>
              <Button type="submit" variant={"secondary"}>
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </form>
        )
}