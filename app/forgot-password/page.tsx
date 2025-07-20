"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Monitor, Package, Mail, ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Please enter your email address")
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast.success("Password reset link sent to your email!")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Theme Toggler */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme("light")}
            className={theme === "light" ? "bg-blue-100 text-blue-600" : ""}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme("system")}
            className={theme === "system" ? "bg-blue-100 text-blue-600" : ""}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "bg-blue-100 text-blue-600" : ""}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-lg p-8 shadow-2xl">
        <CardHeader className="space-y-2 pb-2">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
              <Package className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-center mb-2">Forgot Password?</CardTitle>
          </div>
          <CardDescription className="text-center text-base mb-2">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-6 px-2">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 py-4 text-base"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full py-4 text-lg mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-1">Check Your Email</h3>
                <p className="text-base text-gray-600 mt-2">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  If you don't see the email, check your spam folder
                </p>
              </div>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center text-base text-blue-600 hover:text-blue-500 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 