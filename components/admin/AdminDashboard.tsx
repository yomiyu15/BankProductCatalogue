"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import FolderManager from "./FolderManager"
import FileManager from "./FileManager"
import FAQManager from "./FAQManager"
import ProductManager from "./ProductManager"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    onLogout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-[#00adef]">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="folders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="folders">Folders</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="folders">
            <FolderManager />
          </TabsContent>

          <TabsContent value="files">
            <FileManager />
          </TabsContent>

          <TabsContent value="faqs">
            <FAQManager />
          </TabsContent>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
