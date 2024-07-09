import * as z from "zod";

export const createItemSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    quantidade: z.string(),
    categoria: z.string(),
    imagens: z.string(),
})

export type CreateItemSchema = z.infer<typeof createItemSchema>