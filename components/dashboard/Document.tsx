// // Parent Component (Page Layout) Example
// "use client"

// import { useState } from "react"
// import Header from "../Header";
// import Sidebar from "./Sidebar";
// import MainContent from "./MainContent";
// import PDFViewer from "./PDVviewer"

// export default function DocumentPage() {
//   const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false)
//   const [folders, setFolders] = useState<Folder[]>([])
//   const [loading, setLoading] = useState(true)

//   // Fetch folders data...

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header onMobileMenuToggle={() => setIsSidebarMobileOpen(true)} />
      
//       <div className="flex flex-1">
//         <Sidebar
//           folders={folders}
//           onFileSelect={file => {
//             setSelectedFile(file)
//             setIsSidebarMobileOpen(false)
//           }}
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           loading={loading}
//           isMobileOpen={isSidebarMobileOpen}
//           onMobileClose={() => setIsSidebarMobileOpen(false)}
//         />
        
//         <MainContent
//           selectedFile={selectedFile}
//           searchTerm={searchTerm}
//           folders={folders}
//           onFileSelect={setSelectedFile}
//           onMobileOpenSidebar={() => setIsSidebarMobileOpen(true)}
//         />
//       </div>
//     </div>
//   )
// }