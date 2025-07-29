import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { BookIcon, Users, BookOpen, AlertTriangle, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { getDashboardData } from "@/service/dashboardService"
import { useEffect, useState } from "react"
import type { DashboardData } from "@/types"

export default function DashboardHome() {
  const [data, setData] = useState<DashboardData>({
    totalBooks: 0,
    totalReaders: 0,
    totalLendings: 0,
    overdueLendings: 0,
    recentLendings: [],
  });

useEffect(() => {
  async function fetchData() {
    try {
      const response = await getDashboardData();
      console.log("Dashboard API response:", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }
  fetchData();
}, []);


  const stats = [
    { title: "Total Books", value: data.totalBooks || 0, icon: BookIcon, color: "bg-blue-500" },
    { title: "Total Readers", value: data.totalReaders || 0, icon: Users, color: "bg-green-500" },
    { title: "Books Lent Out", value: data.totalLendings || 0, icon: BookOpen, color: "bg-yellow-500" },
    { title: "Overdue Books", value: data.overdueLendings || 0, icon: AlertTriangle, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
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
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentLendings.length === 0 ? (
                <p className="text-sm text-gray-500">No recent activity found.</p>
              ) : (
                data.recentLendings.map((lending) => {
                  const { _id, bookId, readerId, status } = lending;
                  const statusColor =
                    status === "borrowed"
                      ? "bg-yellow-500"
                      : status === "returned"
                      ? "bg-green-500"
                      : status === "overdue"
                      ? "bg-red-500"
                      : "bg-gray-500";

                  return (
                    <div key={_id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
                      <span className="text-sm">
                        {readerId.name} {status === "returned" ? "returned" : "borrowed"} "{bookId.title}"
                      </span>
                    </div>
                  );
                })
              )}
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
  );
}
