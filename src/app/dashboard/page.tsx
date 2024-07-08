import AsideDashboard from "@/components/AsideDashboard"
import CardItem from "@/components/CardItem"
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
            <div className="w-screen mx-auto">
                <HeaderDashBoard />
                <CardItem />
            </div>
        </div>
    )
}