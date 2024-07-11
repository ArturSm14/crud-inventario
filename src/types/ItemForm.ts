import * as z from "zod";

export const itemSchema = z.object({
    name: z.string(),
    description: z.string(),
    amount: z.string(),
    category: z.string(),
    imageUrl1: z.string(),
    imageUrl2: z.string(),
    imageUrl3: z.string(),
    imageUrl4: z.string(),
})

export type ItemSchema = z.infer<typeof itemSchema>