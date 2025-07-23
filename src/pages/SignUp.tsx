"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Eye, EyeOff, BookOpen, Check } from "lucide-react"
import bgImage from "../images/bg.jpg"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to sign in page after successful registration
      navigate("/signin")
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-300"
    }
  }

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "Weak"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Strong"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen flex">


      {/* Form Section - 1/4 of screen */}
      <div className="w-full lg:w-1/4 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <BookOpen className="h-8 w-8 mr-2 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Book-Club Admin</span>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription className="text-gray-600">
                Fill in your details to create your admin account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@library.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${
                              passwordStrength(formData.password) >= level
                                ? getPasswordStrengthColor(passwordStrength(formData.password))
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Password strength: {getPasswordStrengthText(passwordStrength(formData.password))}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="flex items-center space-x-2">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">Passwords match</span>
                        </>
                      ) : (
                        <span className="text-xs text-red-600">Passwords don't match</span>
                      )}
                    </div>
                  )}
                </div>

                
                <Button
                  type="submit"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-emerald-600 hover:text-emerald-500 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


            {/* Image Section - 3/4 of screen */}
      <div className="hidden lg:flex lg:w-3/4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={bgImage}
            alt="Modern library with digital systems and comfortable reading spaces"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="max-w-lg">
            <div className="flex items-center mb-8">
              <BookOpen className="h-12 w-12 mr-4" />
              <h1 className="text-4xl font-bold">Book-Club Admin</h1>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Join Our Library
              <span className="block text-emerald-300">Management System</span>
            </h2>

            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Create your admin account to start managing your library efficiently. Get access to powerful tools for
              book tracking, reader management, and analytics.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3"></div>
                <span className="text-lg">Complete library management suite</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3"></div>
                <span className="text-lg">Real-time analytics and reporting</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3"></div>
                <span className="text-lg">Automated notifications and alerts</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3"></div>
                <span className="text-lg">Secure and reliable platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
