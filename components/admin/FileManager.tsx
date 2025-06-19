"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Upload, FileText } from "lucide-react"
import type { Folder, FileItem } from "@/types"

export default function FileManager() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<FileItem[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFolders()
    fetchFiles()
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
    }
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/files")
      if (response.ok) {
        const data = await response.json()
        setFiles(data)
      }
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  }

  const uploadFile = async () => {
    if (!selectedFile || !selectedFolderId) return

    setLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("folderId", selectedFolderId)

    try {
      const response = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      })

      if (response.ok) {
        setSelectedFile(null)
        setSelectedFolderId("")
        fetchFiles()
        fetchFolders()
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (id: number) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/files/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })

      if (response.ok) {
        fetchFiles()
        fetchFolders()
      }
    } catch (error) {
      console.error("Error deleting file:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderFolderOptions = (folders: Folder[], level = 0): JSX.Element[] => {
    let options: JSX.Element[] = []
    folders.forEach((folder) => {
      options.push(
        <SelectItem key={folder.id} value={folder.id.toString()}>
          {"  ".repeat(level) + folder.name}
        </SelectItem>,
      )
      if (folder.subfolders) {
        options = [...options, ...renderFolderOptions(folder.subfolders, level + 1)]
      }
    })
    return options
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="flex-1"
            />
            <Select value={selectedFolderId} onValueChange={setSelectedFolderId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>{renderFolderOptions(folders)}</SelectContent>
            </Select>
            <Button onClick={uploadFile} disabled={loading || !selectedFile || !selectedFolderId}>
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-red-500" />
                      <span className="font-medium truncate">{file.name}</span>
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => deleteFile(file.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {files.length === 0 && <p className="text-gray-500">No files uploaded yet.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
