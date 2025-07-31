// app/dashboard/page.tsx
import Header from "@/components/Header"
import DashboardClient from "@/components/dashboard/dashboardCliet"
import { Folder } from "@/types"

export const dynamic = "force-dynamic" // optional but keeps you safe

async function getFolders(): Promise<Folder[]> {
  try {
    const res = await fetch("http://10.12.53.34:5000/api/folders", {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch")
    return await res.json()
  } catch (e) {
    console.error("Failed to fetch folders", e)
    return []
  }
}

export default async function DashboardPage() {
  const folders = await getFolders()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DashboardClient folders={folders} />
    </div>
  )
}
