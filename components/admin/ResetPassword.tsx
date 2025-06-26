"use client"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const res = await fetch("https://backend-service-1wqi.onrender.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setError(data.error || "Reset failed")
      }
    } catch (err) {
      setError("Network error")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {message && (
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  )
}
