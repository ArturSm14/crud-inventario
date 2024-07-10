"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginFormInputs, loginSchema } from "@/types/LoginFormSchema";



export default function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });

    async function login(data: LoginFormInputs){
       signIn("credentials", {
        ...data,
        callbackUrl: "/dashboard",
       }
       )
    }

    return(
        <form onSubmit={handleSubmit(login)} className="bg-white text-black p-12 rounded-lg w-96 max-w-full flex justify-center  flex-col gap-3">
            <h2 className="font-bold text-xl mb-6">Faça seu Login</h2>
            <Label htmlFor="email" className="text-lg">Digite seu email:</Label>
            <Input
                className="w-full"
                type="email" 
                placeholder="Email"
                id="email"
                {...register("email")}
            />
            {errors.email && <span className="text-red-500">{errors.email?.message}</span>}

            <Label htmlFor="password" className="text-lg">Digite sua senha:</Label>
            <Input 
                className="w-full" 
                type="password" 
                placeholder="Senha" 
                id="password"
                {...register("password")}
            />
            {errors.password && <span className="text-red-500">{errors.password?.message}</span>}

            
            <Button type="submit" className="w-full">Login</Button>
        </form>
    )
}