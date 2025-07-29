import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { AlertTriangle, Mail, Users, Calendar } from "lucide-react";
import type { LendingPopulated } from "../types";
import { getAllLendingsNames, notifyAll, sendOverdueNotification } from "@/service/lendingService.ts";

export default function LendingTable() {
  const [lendings, setLendings] = useState<LendingPopulated[]>([]);
  const [sendingAll, setSendingAll] = useState(false);

  useEffect(() => {
    fetchLendings();
  }, []);

  const fetchLendings = async () => {
    try {
      const data = await getAllLendingsNames();
      setLendings(data);
    } catch (error) {
      console.error("Failed to fetch lendings:", error);
      alert("Failed to fetch lendings. Try again later.");
    }
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getRowColorClass = (daysOverdue: number) => {
    if (daysOverdue > 0 && daysOverdue <= 5) return "bg-red-100";
    if (daysOverdue > 5) return "bg-yellow-100";
    return "bg-green-100";
  };

  const totalOverdueBooks = lendings.filter((l) => getDaysOverdue(l.dueDate) > 0).length;

  const overdueReadersSet = new Set(
      lendings.filter((l) => getDaysOverdue(l.dueDate) > 0).map((l) => l.readerId._id)
  );
  const totalReadersAffected = overdueReadersSet.size;

  const overdueDaysArray = lendings
      .filter((l) => getDaysOverdue(l.dueDate) > 0)
      .map((l) => getDaysOverdue(l.dueDate));

  const avgDaysOverdue =
      overdueDaysArray.length > 0
          ? Math.round(overdueDaysArray.reduce((a, b) => a + b, 0) / overdueDaysArray.length)
          : 0;

  const handleSendNotification = async (readerID: string) => {
    alert(`Sending notification to ${readerID}`);
    const response = await sendOverdueNotification(readerID);
    if (!response) {
      alert("Failed to send notification.");
      return;
    }
    alert("Notification sent successfully.");
    fetchLendings();
  };

  const handleContactReader = (readerName: string) => {
    alert(`Contacting ${readerName}`);
  };

  const handleSendAllNotifications = async () => {
    setSendingAll(true);
    try {
      const response = await notifyAll();
      if (!response) {
        alert("Failed to send notifications to all overdue readers.");
        setSendingAll(false);
        return;
      } else {
        alert("Notifications sent to all overdue readers successfully.");
        fetchLendings();
      }
    } catch (error) {
      alert("Failed to send notifications.");
      console.error(error);
    }
    setSendingAll(false);
  };

  return (
      <div className="p-6 space-y-6">
        {/* Cards + Send All Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Overdue</p>
                  <p className="text-3xl font-bold text-red-600">{totalOverdueBooks}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Readers Affected</p>
                  <p className="text-3xl font-bold text-orange-600">{totalReadersAffected}</p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Days Overdue</p>
                  <p className="text-3xl font-bold text-yellow-600">{avgDaysOverdue}</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-500" />
              </CardContent>
            </Card>
          </div>

          <Button
              onClick={handleSendAllNotifications}
              disabled={sendingAll}
              className="whitespace-nowrap"
              variant="secondary"
          >
            <Mail className="h-4 w-4 mr-2" />
            {sendingAll ? "Sending..." : "Send All Notifications"}
          </Button>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Library Lending Records</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reader Name</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Borrowed Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Overdue Info</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lendings.map((lending) => {
                    const daysOverdue = getDaysOverdue(lending.dueDate);
                    const rowColor = getRowColorClass(daysOverdue);

                    return (
                        <TableRow key={lending._id} className={rowColor}>
                          <TableCell>{lending.readerId.name}</TableCell>
                          <TableCell>{lending.bookId.title}</TableCell>
                          <TableCell>{lending.borrowedDate}</TableCell>
                          <TableCell>{lending.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                                variant={
                                  lending.status === "overdue"
                                      ? "destructive"
                                      : lending.status === "returned"
                                          ? "secondary"
                                          : "default"
                                }
                            >
                              {lending.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {daysOverdue > 0 ? `${daysOverdue} days overdue` : "Not overdue"}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSendNotification(lending.readerId._id)}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleContactReader(lending.readerId._id)}
                              >
                                Contact
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {lendings.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    <AlertTriangle className="mx-auto mb-2" />
                    No lending records found.
                  </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
