import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function CardItem() {
    return(
        <Card className="bg-black text-white border-none w-1/4 h-96 flex flex-col justify-center items-center">
            <CardHeader className="flex justify-center items-center">
                <CardTitle>Tesoura</CardTitle>
                <CardDescription>Otima para cortar papel</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Imagem</p>
            </CardContent>
            <CardFooter className="flex flex-col">
                <p>Categoria</p>
                <p>Quantidade</p>
            </CardFooter>
        </Card>
    )
}