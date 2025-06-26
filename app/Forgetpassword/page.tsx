"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function ForgotPasswordForm() {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const res = await fetch("https://backend-service-1wqi.onrender.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
        setSubmitted(true)
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (err) {
      setError("Network error")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
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
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={submitted}
        />

        <Button type="submit" disabled={submitted}>
          Send Reset Link
        </Button>
      </form>
    </div>
  )
}
