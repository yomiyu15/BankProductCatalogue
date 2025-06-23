"use client"

import { useState } from "react"
import { Search, FolderIcon, FileText, ChevronDown, ChevronRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
    setExpandedFolders((prev) => (prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]))
  }

  const formatFileName = (name: string) => {
    return name
      .replace(/_/g, " ")
      .replace(/\.pdf$/i, "")
      .replace(/\bfor\b/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const getAllFiles = (folders: Folder[]): FileItem[] => {
    return folders.flatMap((folder) => [
      ...(folder.files || []),
      ...(folder.subfolders ? getAllFiles(folder.subfolders) : []),
    ])
  }

  const renderFolder = (folder: Folder, level = 0) => {
    const isExpanded = expandedFolders.includes(folder.id)
    const hasSubfolders = folder.subfolders && folder.subfolders.length > 0
    const hasFiles = folder.files && folder.files.length > 0
    const fileCount =
      (folder.files?.length || 0) + (folder.subfolders?.reduce((acc, sub) => acc + (sub.files?.length || 0), 0) || 0)

    return (
      <div key={folder.id} className="space-y-1">
        <div
          className={`flex items-center justify-between p-2.5 hover:bg-gradient-to-r hover:from-[#00adef]/10 hover:to-[#0077c2]/5 cursor-pointer rounded-lg transition-all duration-200 group ${
            level > 0 ? "ml-4 border-l-2 border-gray-100 pl-4" : ""
          }`}
          onClick={() => toggleFolder(folder.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleFolder(folder.id)
          }}
        >
          <div className="flex items-center flex-1 min-w-0">
            {hasSubfolders || hasFiles ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-2 text-[#00adef] transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#00adef] transition-colors" />
              )
            ) : (
              <div className="w-6 mr-2" />
            )}
            <div className="bg-gradient-to-br from-[#00adef]/20 to-[#0077c2]/10 p-1.5 rounded-md mr-2">
              <FolderIcon className="w-4 h-4 text-[#00adef]" />
            </div>
            <span className="text-sm font-medium text-gray-700 truncate group-hover:text-[#0077c2] transition-colors">
              {folder.name}
            </span>
          </div>
          {fileCount > 0 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 ml-2">
              {fileCount}
            </Badge>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
            {folder.files?.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-2 ml-6 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 cursor-pointer rounded-lg transition-all duration-200 group border-l-2 border-transparent hover:border-red-200"
                onClick={() => onFileSelect(file)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onFileSelect(file)
                }}
              >
                <div className="bg-red-50 p-1.5 rounded-md mr-2 group-hover:bg-red-100 transition-colors">
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="text-sm text-gray-600 truncate group-hover:text-red-700 transition-colors">
                  {formatFileName(file.name)}
                </span>
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
    ? allFiles.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const filteredFolders = folders.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      folder.files?.some((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <aside className={`flex flex-col h-screen w-80 bg-white border-r border-gray-200 ${className}`}>
      {/* Search Header */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 h-10 bg-white border-gray-200 focus:ring-2 focus:ring-[#00adef]/20 focus:border-[#00adef] transition-all"
            autoComplete="off"
          />
        </div>
        {searchTerm && (
          <div className="mt-2 text-xs text-gray-500">
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0077c2]">Product Categories</h2>
            <Badge variant="outline" className="text-xs">
              {folders.length} categories
            </Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
          <div className="p-4 space-y-2">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-3 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2 mt-1"></div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-[#00adef]" />
                  <span className="ml-2 text-sm text-gray-500">Loading categories...</span>
                </div>
              </div>
            ) : searchTerm && searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#00adef] rounded-full"></div>
                  <h3 className="text-sm font-medium text-gray-700">Search Results</h3>
                </div>
                {searchResults.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center p-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-pointer rounded-lg transition-all duration-200 group border border-transparent hover:border-green-200"
                    onClick={() => onFileSelect(file)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onFileSelect(file)
                    }}
                  >
                    <div className="bg-green-50 p-1.5 rounded-md mr-3 group-hover:bg-green-100 transition-colors">
                      <FileText className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors block truncate">
                        {formatFileName(file.name)}
                      </span>
                      <span className="text-xs text-gray-500">PDF Document</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredFolders.length === 0 && !loading ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No matching files or folders</p>
                <p className="text-gray-400 text-xs mt-1">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="space-y-1">{filteredFolders.map((folder) => renderFolder(folder))}</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
