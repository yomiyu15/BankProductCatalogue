"use client";

import type React from "react";

import { FileText, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Folder, FileItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useCallback, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface MainContentProps {
  selectedFile: FileItem | null;
  searchTerm: string;
  folders: Folder[];
}

const MainContent: React.FC<MainContentProps> = ({
  selectedFile,
  searchTerm,
  folders,
}) => {
  const getAllFiles = (folders: Folder[]): FileItem[] =>
    folders.flatMap((f) => [
      ...(f.files ?? []),
      ...(f.subfolders ? getAllFiles(f.subfolders) : []),
    ]);

  const searchResults =
    searchTerm.trim() === ""
      ? []
      : getAllFiles(folders).filter((file) =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  const displayName = selectedFile?.name || "Untitled Document";

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const formatFileName = (filename: string): string => {
    const maxLength = 25;
    if (filename.length > maxLength) {
      return filename.substring(0, maxLength) + "...";
    }
    return filename;
  };

  if (!selectedFile) {
    return (
     <div className="flex flex-1 items-center justify-center p-10 sm:p-16 bg-gradient-to-br from-white to-blue-50">
  <div className="text-center w-full max-w-4xl p-10 sm:p-14 bg-white rounded-3xl border border-gray-100">
    
    {/* Icon */}
    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto mb-8 flex items-center justify-center">
      <FileText className="w-16 h-16 sm:w-20 sm:h-20" style={{ color: "#00adef" }} />
    </div>

    {/* Title */}
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
      Welcome to Document Viewer
    </h2>

    {/* Description */}
    <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
      Select a file from the sidebar to preview its content. You can also browse your favorites or check recent activity below.
    </p>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <Button variant="outline" size="lg" className="text-sm sm:text-base px-6 py-2">
        <Star className="w-5 h-5 mr-2" style={{ color: "#00adef" }} />
        View Favorites
      </Button>
      <Button variant="default" size="lg" className="text-sm sm:text-base px-6 py-2" style={{ backgroundColor: "#00adef", borderColor: "#00adef" }}>
        Recent Files
      </Button>
    </div>

    {/* Tips */}
    <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-5 text-left mx-auto max-w-2xl">
      <h3 className="font-semibold text-lg mb-2" style={{ color: "#00adef" }}>
        Tips to Get Started
      </h3>
      <ul className="list-disc list-inside text-sm space-y-1" style={{ color: "#00adef" }}>
        <li>Search documents easily using the sidebar filter</li>
        <li>Click on any file to instantly preview its content</li>
        <li>Use the Favorites tab to bookmark key documents</li>
        <li>Documents stay organized in folders by project</li>
      </ul>
    </div>
  </div>
</div>

    );
  }


  return (
    <div className="flex-1 flex flex-col">
      <div className="px-3 py-3 sm:px-4 sm:py-3 lg:px-6 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 truncate">
                  {displayName}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-8 w-8"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Star
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      isFavorite
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "stroke-gray-400"
                    }`}
                  />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                <Badge variant="secondary" className="text-xs">
                  PDF
                </Badge>
                <span className="text-xs">
                  {numPages} pages • {Math.round(Math.random() * 5) + 1} MB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="flex justify-center p-2 sm:p-4" ref={containerRef}>
          <div className="w-full max-w-4xl">
            <Document
              file={`https://backend-service-1wqi.onrender.com/uploads/${selectedFile.filename}`}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="py-6 sm:py-8 text-center">
                  <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-3 w-32 sm:w-40 mx-auto" />
                </div>
              }
              error={
                <div className="py-6 sm:py-8 text-center px-4">
                  <div className="bg-red-100 p-3 rounded-full w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 flex items-center justify-center">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-red-600 mb-1">
                    Failed to load document
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto">
                    The PDF file couldn't be loaded. Please check the file
                    format or try again later.
                  </p>
                  <Button className="mt-3" variant="outline" size="sm">
                    Retry
                  </Button>
                </div>
              }
            >
              <div className="py-2 space-y-2 sm:space-y-3">
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={
                      containerWidth
                        ? Math.min(containerWidth - 32, 600)
                        : Math.min(window.innerWidth - 32, 800)
                    }
                    className="mx-auto border border-gray-100 rounded-md shadow-sm"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))}
              </div>
            </Document>
          </div>
        </div>
      </div>

      {numPages && numPages > 1 && (
        <div className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            <div className="flex items-center text-xs sm:text-sm">
              <Input
                type="number"
                min={1}
                max={numPages}
                value={pageNumber}
                onChange={(e) => {
                  const val = Math.min(
                    numPages,
                    Math.max(1, Number(e.target.value))
                  );
                  setPageNumber(val);
                }}
                className="w-10 sm:w-12 h-6 sm:h-7 text-center text-xs sm:text-sm px-1"
              />
              <span className="mx-1 text-gray-500 text-xs sm:text-sm">of</span>
              <span className="text-xs sm:text-sm">{numPages}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </Button>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <section className="flex-1 overflow-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
                  Search Results for "{searchTerm}"
                </h2>
              </div>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-600 self-start sm:ml-auto"
              >
                {searchResults.length} found
              </Badge>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {searchResults.map((file) => (
                  <Card
                    key={file.id}
                    className="w-full hover:shadow-md transition-all duration-200 border border-gray-100 rounded-xl cursor-pointer"
                    // onClick={() =>
                    //   window.open(
                    //     `http://localhost:5000/uploads/${file.filename}`,
                    //     "_blank"
                    //   )
                    // }
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 sm:p-3 rounded-lg mr-3 flex-shrink-0">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
                          {formatFileName(file.name)}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>PDF Document</span>
                        <span>{Math.round(Math.random() * 5) + 1} MB</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 py-2 text-xs text-gray-500">
                      Last modified: {new Date().toLocaleDateString()}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 px-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">
                  No documents found
                </h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search term or browse different categories.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MainContent;
