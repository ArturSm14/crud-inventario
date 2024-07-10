"use client"
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
    return(
        <Button className="bg-red-800" onClick={() => signOut()}>Sair</Button>
    )
}