import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";

export default async function AsideDashboard() {
    const session = await getServerSession()

  return (
    <aside className="h-screen bg-[#111111] w-1/12 flex justify-between items-center flex-col p-6">
      <div>Olá, {session?.user?.name}</div>
      <div>
        <LogoutButton />
      </div>
    </aside>
  );
}
