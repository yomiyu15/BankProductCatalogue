import { useState } from "react"
import { Search, FolderIcon, FileText, ChevronDown, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Folder, FileItem } from "@/types"

interface SidebarProps {
  folders: Folder[]
  onFileSelect: (file: FileItem) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  loading: boolean
  className?: string
}

export default function Sidebar({
  folders,
  onFileSelect,
  searchTerm,
  onSearchChange,
  loading,
  className = "",
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<number[]>([])

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]
    )
  }

  const formatFileName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .replace(/\.pdf$/i, '')
      .replace(/\bfor\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const getAllFiles = (folders: Folder[]): FileItem[] => {
    return folders.flatMap((folder) => [
      ...(folder.files || []),
      ...(folder.subfolders ? getAllFiles(folder.subfolders) : [])
    ])
  }

  const renderFolder = (folder: Folder, level = 0) => {
    const isExpanded = expandedFolders.includes(folder.id)
    const hasSubfolders = folder.subfolders && folder.subfolders.length > 0
    const hasFiles = folder.files && folder.files.length > 0

    return (
      <div key={folder.id} className={`pl-${level * 4}`}>
        <div
          className="flex items-center p-2 hover:bg-[#00adef] hover:text-white cursor-pointer rounded transition-colors select-none"
          onClick={() => toggleFolder(folder.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') toggleFolder(folder.id) }}
        >
          {hasSubfolders || hasFiles ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1" />
            )
          ) : (
            <div className="w-5 mr-1" />
          )}
          <FolderIcon className="w-5 h-5 mr-2 text-[#00adef]" />
          <span className="text-sm font-semibold truncate">{folder.name}</span>
        </div>

        {isExpanded && (
          <div className="pl-4">
            {folder.files?.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-2 hover:bg-[#00adef] hover:text-white cursor-pointer rounded transition-colors"
                onClick={() => onFileSelect(file)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onFileSelect(file) }}
              >
                <FileText className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-sm truncate">{formatFileName(file.name)}</span>
              </div>
            ))}
            {folder.subfolders?.map((subfolder) => renderFolder(subfolder, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const allFiles = getAllFiles(folders)

  const searchResults = searchTerm
    ? allFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const filteredFolders = folders.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      folder.files?.some((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <aside className={`flex flex-col h-full overflow-y-auto shadow-inner ${className}`}>
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 focus:ring-2 focus:ring-[#00adef] transition"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold mb-5 text-[#0077c2]">Product Categories</h2>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-300 rounded" />
            ))}
          </div>
        ) : searchTerm && searchResults.length > 0 ? (
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 mb-2">Search Results</h3>
            {searchResults.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-2 hover:bg-[#00adef] hover:text-white cursor-pointer rounded transition-colors"
                onClick={() => onFileSelect(file)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onFileSelect(file) }}
              >
                <FileText className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-sm truncate">{formatFileName(file.name)}</span>
              </div>
            ))}
          </div>
        ) : filteredFolders.length === 0 ? (
          <p className="text-gray-500 italic">No matching files or folders</p>
        ) : (
          <div className="space-y-1">{filteredFolders.map((folder) => renderFolder(folder))}</div>
        )}
      </div>
    </aside>
  )
}
