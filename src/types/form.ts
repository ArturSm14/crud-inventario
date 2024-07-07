import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty("Email é obrigatório").email('Email inválido'),
    password: z.string().nonempty("Senha é obrigatório").min(6, "Senha deve ter no mínimo 6 caracteres")
});

export type LoginFormInputs = z.infer<typeof loginSchema>;