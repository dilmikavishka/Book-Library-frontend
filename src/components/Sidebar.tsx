import { Button } from "./ui/button"
import { BookIcon, Users, BookOpen, AlertTriangle, LayoutDashboard, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "readers", label: "Readers", icon: Users, path: "/dashboard/readers" },
    { id: "books", label: "Books", icon: BookIcon, path: "/dashboard/books" },
    { id: "lending", label: "Lending", icon: BookOpen, path: "/dashboard/lending" },
    { id: "overdue", label: "Overdue", icon: AlertTriangle, path: "/dashboard/overdue" },

  ]

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
<div
  className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-x-hidden${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0`}
>


      
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">Book-Club Admin</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    active ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
