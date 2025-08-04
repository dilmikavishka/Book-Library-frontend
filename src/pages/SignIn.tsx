import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Eye, EyeOff, BookOpen } from "lucide-react"
import bgImage from "../images/bg.jpg"
import Cookies from "js-cookie";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 });

      setIsLoading(false);
      navigate("/dashboard");
    } catch (error ) {
        console.error("Login error:", error);
        setIsLoading(false);
        alert("Login failed. Please check your credentials.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Form Section - 1/4 of screen */}
      <div className="w-full lg:w-1/4 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <BookOpen className="h-8 w-8 mr-2 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Book-Club Admin</span>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@library.com"
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
                      placeholder="Enter your password"
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
                </div>

             

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Demo Credentials</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Email: admin@library.com</p>
                    <p>Password: admin123</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

            {/* Image Section - 3/4 of screen */}
      <div className="hidden lg:flex lg:w-3/4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={bgImage}
            alt="Library interior with books and reading area"
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
              Welcome Back to Your
              <span className="block text-yellow-300">Library Dashboard</span>
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Manage your library efficiently with our comprehensive admin system. Track books, readers, lending
              history, and overdue items all in one place.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                <span className="text-lg">Comprehensive book management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                <span className="text-lg">Reader registration and tracking</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                <span className="text-lg">Automated overdue notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
