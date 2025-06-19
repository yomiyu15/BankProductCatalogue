export interface FileItem {
  id: number
  name: string
  filename: string
  folderId: number
  createdAt: string
}

export interface Folder {
  id: number
  name: string
  parentId: number | null
  files?: FileItem[]
  subfolders?: Folder[]
  createdAt: string
}
