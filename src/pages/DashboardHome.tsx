import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { BookIcon, Users, BookOpen, AlertTriangle, Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardHome() {
  const stats = [
    { title: "Total Books", value: "1,234", icon: BookIcon, color: "bg-blue-500" },
    { title: "Total Readers", value: "567", icon: Users, color: "bg-green-500" },
    { title: "Books Lent Out", value: "89", icon: BookOpen, color: "bg-yellow-500" },
    { title: "Overdue Books", value: "12", icon: AlertTriangle, color: "bg-red-500" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">John Doe returned "The Great Gatsby"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">New reader "Alice Brown" registered</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">"1984" is now overdue for Jane Smith</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Charlie Wilson borrowed "Pride and Prejudice"</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link to="/dashboard/books">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Book
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link to="/dashboard/readers">
                  <Users className="h-4 w-4 mr-2" />
                  Register New Reader
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link to="/dashboard/lending">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Process Book Lending
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link to="/dashboard/overdue">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  View Overdue Books
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
