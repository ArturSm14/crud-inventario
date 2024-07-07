import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-gray-950 px-5">
          <div className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center  flex-col gap-3">
            <h2 className="font-bold text-xl mb-6">Faça seu Login</h2>
            <Label className="text-lg">Digite seu email:</Label>
            <Input className="w-full" type="email" placeholder="Email" />
            <Label className="text-lg">Digite sua senha:</Label>
            <Input className="w-full" type="password" placeholder="Senha" />
            <Button className="w-full">Login</Button>
          </div>
      </div>
    </main>
  );
}
