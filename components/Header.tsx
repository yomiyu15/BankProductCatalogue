"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "../assets/images/bb.png"

interface HeaderProps {
  onToggleSidebar?: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3">
           
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={75}
                height={75}
                className="object-contain"
              />
            </Link>
          
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#00adef] transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-[#00adef] transition-colors text-sm font-medium">
              Products
            </Link>
            {/* <Link href="/admin" className="text-gray-700 hover:text-[#00adef] transition-colors text-sm font-medium">
              Admin
            </Link> */}
          </nav>

          {/* Mobile Menu (Pages) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 rounded-md border border-gray-100 bg-white shadow-sm">
            <div className="px-4 py-2 space-y-1">
              <Link href="/" className="block py-2 text-sm text-gray-700 hover:text-[#00adef] font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="block py-2 text-sm text-gray-700 hover:text-[#00adef] font-medium">
                Products
              </Link>
              <Link href="/admin" className="block py-2 text-sm text-gray-700 hover:text-[#00adef] font-medium">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
