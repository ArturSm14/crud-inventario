import { z } from "zod";

export const itemsFilterSchema = z.object({
    name:z.string().nonempty("Nome do Item é obrigatório"),
})

export type ItemsFilterSchema = z.infer<typeof itemsFilterSchema>