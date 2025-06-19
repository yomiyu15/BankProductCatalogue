"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/dashboard/Sidebar"
import MainContent from "@/components/dashboard/MainContent"
import type { Folder, FileItem } from "@/types"
import { Menu } from "lucide-react"

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
      const response = await fetch("http://localhost:5000/api/folders")
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
     <Header onToggleSidebar={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Mobile hamburger */}
        <button
          aria-label="Toggle sidebar"
          className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-lg hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6 text-[#00adef]" />
        </button>

        {/* Sidebar */}
        <Sidebar
          folders={folders}
          onFileSelect={(file) => {
            setSelectedFile(file)
            setSidebarOpen(false) // auto close sidebar on mobile after select
          }}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          loading={loading}
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static top-0 left-0 h-full w-72 bg-white border-r border-gray-200 shadow-lg z-20 transform transition-transform duration-300 ease-in-out`}
        />

        {/* Overlay behind sidebar on mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-10 overflow-auto max-h-[calc(100vh-64px)]">
          <MainContent selectedFile={selectedFile} searchTerm={searchTerm} folders={folders} />
        </main>
      </div>
    </div>
  )
}
