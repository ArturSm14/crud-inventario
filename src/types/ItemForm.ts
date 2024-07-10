import * as z from "zod";

export const itemSchema = z.object({
    name: z.string(),
    description: z.string(),
    amount: z.string(),
    category: z.string(),
    
})

export type ItemSchema = z.infer<typeof itemSchema>