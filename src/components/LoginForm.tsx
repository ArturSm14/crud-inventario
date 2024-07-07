import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    return(
        <form className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center  flex-col gap-3">
            <h2 className="font-bold text-xl mb-6">Faça seu Login</h2>
            <Label className="text-lg">Digite seu email:</Label>
            <Input className="w-full" type="email" placeholder="Email" />
            <Label className="text-lg">Digite sua senha:</Label>
            <Input className="w-full" type="password" placeholder="Senha" />
            <Button className="w-full">Login</Button>
        </form>
    )
}