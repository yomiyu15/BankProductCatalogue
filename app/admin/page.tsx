"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/admin/LoginForm"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      try {
        const response = await fetch("http://10.12.53.34:5000/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("adminToken")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("adminToken")
      }
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#00adef]"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}
