"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/dashboard/Sidebar"
import MainContent from "@/components/dashboard/MainContent"
import type { Folder, FileItem } from "@/types"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetchFolders()
  }, [])

  const fetchFolders = async () => {
    try {
      const response = await fetch("https://backend-service-1wqi.onrender.com/api/folders")
      if (response.ok) {
        const data = await response.json()
        setFolders(data)
      }
    } catch (error) {
      console.error("Error fetching folders:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-20 left-4 z-30 bg-white shadow-lg hover:bg-gray-50 border border-gray-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-[#00adef]" />}
        </Button>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static top-16 left-0 h-[calc(100vh-64px)] w-80 bg-white shadow-xl md:shadow-none z-20 transform transition-transform duration-300 ease-in-out border-r border-gray-200`}
        >
          <Sidebar
            folders={folders}
            onFileSelect={(file) => {
              setSelectedFile(file)
              setSidebarOpen(false)
            }}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            loading={loading}
          />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-25 z-10 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Main Content */}
<main className="flex-1 overflow-auto">

          <MainContent selectedFile={selectedFile} searchTerm={searchTerm} folders={folders} />
        </main>
      </div>
    </div>
  )
}
