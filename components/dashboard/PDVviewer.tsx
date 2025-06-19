"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  fileUrl: string
  fileName: string
}

export default function PDFViewer({ fileUrl, fileName }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true)
        setError(null)

        // Import PDF.js dynamically
        const pdfjsLib = await import("pdfjs-dist")

        // Set worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

        // Load PDF
        const pdf = await pdfjsLib.getDocument(fileUrl).promise
        setPdfDoc(pdf)
        setPageCount(pdf.numPages)
        setLoading(false)
      } catch (err) {
        console.error("Error loading PDF:", err)
        setError("Failed to load PDF document")
        setLoading(false)
      }
    }

    loadPDF()
  }, [fileUrl])

  useEffect(() => {
    if (pdfDoc && canvasRef.current) {
      renderPage()
    }
  }, [pdfDoc, pageNum, scale])

  const renderPage = async () => {
    if (!pdfDoc || !canvasRef.current) return

    try {
      const page = await pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale })
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      await page.render(renderContext).promise
    } catch (err) {
      console.error("Error rendering page:", err)
    }
  }

  const goToPrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
    }
  }

  const goToNextPage = () => {
    if (pageNum < pageCount) {
      setPageNum(pageNum + 1)
    }
  }

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 2.0))
  }

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.5))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00adef]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Button onClick={goToPrevPage} disabled={pageNum <= 1} size="sm" variant="outline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {pageNum} of {pageCount}
          </span>
          <Button onClick={goToNextPage} disabled={pageNum >= pageCount} size="sm" variant="outline">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button onClick={zoomOut} size="sm" variant="outline" disabled={scale <= 0.5}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
          <Button onClick={zoomIn} size="sm" variant="outline" disabled={scale >= 2.0}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Canvas */}
      <div className="flex justify-center p-4 overflow-auto max-h-[calc(100vh-300px)]">
        <canvas ref={canvasRef} className="shadow-lg max-w-full" />
      </div>
    </div>
  )
}
