import AsideDashboard from "@/components/AsideDashboard"
import CardItemsWrapper from "@/components/CardItemsWrapper"
import HeaderDashBoard from "@/components/HeaderDashBoard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"



export default async function Page() {

    const session = await getServerSession()

    if(!session) {
        redirect("/")
    }

    return (
        <div className="flex">
            <AsideDashboard />
            <div className="w-screen mx-auto flex flex-col gap-10">
                <HeaderDashBoard />
                <main className="p-6">
                    <CardItemsWrapper />
                </main>
            </div>
        </div>
    )
}

