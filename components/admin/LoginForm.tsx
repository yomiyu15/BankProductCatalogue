"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, Shield, User, Lock, AlertCircle, CheckCircle } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export default function AdvancedLoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0)

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // Load saved credentials
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername")
    const savedRememberMe = localStorage.getItem("rememberMe") === "true"
    if (savedUsername && savedRememberMe) {
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  // Form validation
  useEffect(() => {
    const validateUsername = () => {
      if (!username) {
        setUsernameError("")
        return false
      }
      if (username.length < 3) {
        setUsernameError("Username must be at least 3 characters")
        return false
      }
      setUsernameError("")
      return true
    }

    const validatePassword = () => {
      if (!password) {
        setPasswordError("")
        return false
      }
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters")
        return false
      }
      setPasswordError("")
      return true
    }

    const usernameValid = validateUsername()
    const passwordValid = validatePassword()
    setIsFormValid(usernameValid && passwordValid && username !== "" && password !== "")
  }, [username, password])

  // Handle account lockout
  useEffect(() => {
    if (isLocked && lockTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setLockTimeRemaining(lockTimeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isLocked && lockTimeRemaining === 0) {
      setIsLocked(false)
      setLoginAttempts(0)
    }
  }, [isLocked, lockTimeRemaining])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        if (isFormValid && !loading && !isLocked) {
          handleSubmit(e as any)
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFormValid, loading, isLocked])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLocked) {
      setError(`Account locked. Try again in ${lockTimeRemaining} seconds.`)
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("https://backend-service-1wqi.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("adminToken", data.token)

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", username)
          localStorage.setItem("rememberMe", "true")
        } else {
          localStorage.removeItem("rememberedUsername")
          localStorage.removeItem("rememberMe")
        }

        setLoginAttempts(0)
        onLogin()
      } else {
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)

        if (newAttempts >= 3) {
          setIsLocked(true)
          setLockTimeRemaining(30) // 30 seconds lockout
          setError("Too many failed attempts. Account locked for 30 seconds.")
        } else {
          setError(data.message || "Login failed")
        }
      }
    } catch (error) {
      setError("Network error. Please try again.")
      setLoginAttempts(loginAttempts + 1)
    } finally {
      setLoading(false)
    }
  }

  const getInputClassName = (fieldName: string, hasError: boolean) => {
    const baseClass = "transition-all duration-200 pl-10"
    const focusClass = focusedField === fieldName ? "ring-2 ring-[#00adef] border-[#00adef]" : ""
    const errorClass = hasError ? "border-red-500 focus:ring-red-500" : ""
    return `${baseClass} ${focusClass} ${errorClass}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Header with animation */}
        <div className="text-center mb-8 animate-in slide-in-from-top duration-500">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00adef] rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your admin account</p>
        </div>

        <Card className="shadow-xl border-0 animate-in slide-in-from-bottom duration-500 delay-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-[#00adef] flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-in slide-in-from-top duration-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLocked && (
                <Alert className="border-orange-200 bg-orange-50 animate-pulse">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Account locked for {lockTimeRemaining} seconds
                  </AlertDescription>
                </Alert>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    ref={usernameRef}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                    className={getInputClassName("username", !!usernameError)}
                    required
                    disabled={loading || isLocked}
                  />
                  {username && !usernameError && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                  )}
                </div>
                {usernameError && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-top duration-200">{usernameError}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    ref={passwordRef}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={getInputClassName("password", !!passwordError)}
                    required
                    disabled={loading || isLocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading || isLocked}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-top duration-200">{passwordError}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={loading || isLocked}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#00adef] hover:bg-[#0088cc] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                disabled={!isFormValid || loading || isLocked}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Login Attempts Indicator */}
              {loginAttempts > 0 && loginAttempts < 3 && (
                <div className="text-center">
                  <p className="text-sm text-orange-600">
                    {3 - loginAttempts} attempt{3 - loginAttempts !== 1 ? "s" : ""} remaining
                  </p>
                </div>
              )}

              {/* Keyboard Shortcut Hint */}
              <div className="text-center">
               <p className="text-right text-sm">
  <a href="/Forgetpassword" className="text-blue-600 hover:underline">Forgot password?</a>
</p>

              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        
      </div>
    </div>
  )
}
