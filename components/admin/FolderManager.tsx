"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Plus, Folder } from "lucide-react"
import type { Folder as FolderType } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://10.12.53.34:5000"

export default function FolderManager() {
  const [folders, setFolders] = useState<FolderType[]>([])
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedParentId, setSelectedParentId] = useState<string>("root")
  const [editingFolder, setEditingFolder] = useState<FolderType | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [folderToDelete, setFolderToDelete] = useState<FolderType | null>(null)

  useEffect(() => {
    fetchFolders()
  }, [])

  const fetchFolders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/folders`)
      if (response.ok) {
        const data = await response.json()
        setFolders(data)
      }
    } catch (error) {
      console.error("Error fetching folders:", error)
    }
  }

  const createFolder = async () => {
    if (!newFolderName.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          name: newFolderName,
          parentId: selectedParentId === "root" ? null : Number(selectedParentId),
        }),
      })

      if (response.ok) {
        setMessage(`Folder "${newFolderName}" created successfully.`)
        setNewFolderName("")
        setSelectedParentId("root")
        fetchFolders()
      } else {
        setMessage("Failed to create folder.")
      }
    } catch (error) {
      console.error("Error creating folder:", error)
      setMessage("An error occurred.")
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const updateFolder = async () => {
    if (!editingFolder || !editingFolder.name.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/folders/${editingFolder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          name: editingFolder.name,
        }),
      })

      if (response.ok) {
        setEditingFolder(null)
        fetchFolders()
      }
    } catch (error) {
      console.error("Error updating folder:", error)
    } finally {
      setLoading(false)
    }
  }

  const confirmDeleteFolder = async () => {
    if (!folderToDelete) return
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/folders/${folderToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })

      if (response.ok) {
        fetchFolders()
      }
    } catch (error) {
      console.error("Error deleting folder:", error)
    } finally {
      setLoading(false)
      setFolderToDelete(null)
    }
  }

  const renderFolderOptions = (folders: FolderType[], level = 0): JSX.Element[] => {
    let options: JSX.Element[] = []
    folders.forEach((folder) => {
      options.push(
        <SelectItem key={folder.id} value={folder.id.toString()}>
          {"  ".repeat(level) + folder.name}
        </SelectItem>,
      )
      if (folder.subfolders) {
        options = [...options, ...renderFolderOptions(folder.subfolders, level + 1)]
      }
    })
    return options
  }

  const renderFolderList = (folders: FolderType[], level = 0): JSX.Element[] => {
    return folders.map((folder) => (
      <div key={folder.id} className={`ml-${level * 4} mb-2`}>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Folder className="w-5 h-5 mr-2 text-[#00adef]" />
                {editingFolder?.id === folder.id ? (
                  <Input
                    value={editingFolder.name}
                    onChange={(e) => setEditingFolder({ ...editingFolder, name: e.target.value })}
                    className="w-48"
                  />
                ) : (
                  <span className="font-medium">{folder.name}</span>
                )}
              </div>
              <div className="flex space-x-2">
                {editingFolder?.id === folder.id ? (
                  <>
                    <Button size="sm" onClick={updateFolder} disabled={loading}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingFolder(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => setEditingFolder(folder)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setFolderToDelete(folder)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {folder.subfolders && renderFolderList(folder.subfolders, level + 1)}
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      {message && <p className="text-green-600 font-medium">{message}</p>}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Create New Folder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedParentId} onValueChange={setSelectedParentId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Parent folder (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">No parent (root level)</SelectItem>
                {renderFolderOptions(folders)}
              </SelectContent>
            </Select>
            <Button onClick={createFolder} disabled={loading || !newFolderName.trim()}>
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Folders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {folders.length > 0 ? renderFolderList(folders) : <p className="text-gray-500">No folders created yet.</p>}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {folderToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete Folder</h2>
            <p className="mb-6">
              Are you sure you want to delete the folder <strong>{folderToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setFolderToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteFolder} disabled={loading}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
