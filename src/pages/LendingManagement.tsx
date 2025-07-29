import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { BookOpen, CalendarIcon, Pencil } from "lucide-react";
import type { Reader, Book, LendingPopulated, LendingRecord } from "../types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  createLending,
  getAllLendingsNames, updateLending,
} from "@/service/lendingService.ts";
import { getAllBooks } from "@/service/bookService.ts";
import { getAllReaders } from "@/service/readerService.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function LendingManagement() {
  const [lendingRecords, setLendingRecords] = useState<LendingPopulated[]>([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedReader, setSelectedReader] = useState("");
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [allReaders, setAllReaders] = useState<Reader[]>([]);
  const [dueDate, setDueDate] = useState("");


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<LendingPopulated | null>(null);
  const [newStatus, setNewStatus] = useState("");




  useEffect(() => {
    fetchAllLendingRecords();
  }, []);

  const fetchAllLendingRecords = async () => {
    try {
      const lendingData = await getAllLendingsNames();
      const allBook = await getAllBooks();
      const allReaders = await getAllReaders();
      setAllReaders(allReaders);
      setAvailableBooks(allBook);
      setLendingRecords(lendingData);
    } catch (error) {
      console.error("Error fetching lending records:", error);
    }
  };

  const handleLendBook = async () => {
    if (!selectedBook || !selectedReader || !dueDate) {
      alert("Please fill in all fields");
      return;
    }

    const borrowedDate = new Date().toISOString().split("T")[0];
    if (new Date(dueDate) < new Date(borrowedDate)) {
      alert("Due date cannot be before borrowed date!");
      return;
    }

    try {
      const newRecord = {
        bookId: selectedBook,
        readerId: selectedReader,
        borrowedDate,
        dueDate,
        status: "borrowed",
      } satisfies Omit<LendingRecord, "_id">;

      const response = await createLending(newRecord);
      if (response) {
        alert("Book lent successfully!");
        setSelectedBook("");
        setSelectedReader("");
        setDueDate("");
        fetchAllLendingRecords();
      } else {
        alert("Failed to lend book");
      }
    } catch (error) {
      console.error("Error lending book:", error);
      alert("Failed to lend book");
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedRecord) {
      alert("No lending record selected.");
      return;
    }

    try {
      const response = await updateLending(selectedRecord._id, {
        status: newStatus,
      });

      if (response) {
        alert("Lending status updated successfully!");
        setIsEditModalOpen(false);
        fetchAllLendingRecords();
      } else {
        alert("Failed to update lending status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Lending Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Lend a Book</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Book Selector */}
              <div className="space-y-2">
                <Label>Select Book</Label>
                <Select value={selectedBook} onValueChange={setSelectedBook}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBooks.map((book) => (
                        <SelectItem key={book._id} value={book._id}>
                          {book.title} - {book.author}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reader Selector */}
              <div className="space-y-2">
                <Label>Select Reader</Label>
                <Select value={selectedReader} onValueChange={setSelectedReader}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a reader" />
                  </SelectTrigger>
                  <SelectContent>
                    {allReaders.map((reader) => (
                        <SelectItem key={reader._id} value={reader._id}>
                          {reader.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date Picker */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                            !dueDate ? "text-muted-foreground" : ""
                        }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate
                          ? format(new Date(dueDate), "PPP")
                          : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={dueDate ? new Date(dueDate) : undefined}
                        onSelect={(date) => {
                          if (date) setDueDate(date.toISOString().split("T")[0]);
                        }}
                        initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                        setDueDate(
                            new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                                .toISOString()
                                .split("T")[0]
                        )
                    }
                >
                  Auto-calculate (14 days)
                </Button>
              </div>

              <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 text-base rounded-xl shadow-md hover:shadow-lg transition"
                  onClick={handleLendBook}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Lend Book
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Books Currently Lent</span>
                  <span className="font-semibold">
                  {lendingRecords.filter((r) => r.status === "borrowed").length}
                </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lending Records</span>
                  <span className="font-semibold">{lendingRecords.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Books Returned</span>
                  <span className="font-semibold">
                  {lendingRecords.filter((r) => r.status === "returned").length}
                </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lending History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lending History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Reader Name</TableHead>
                    <TableHead>Lent Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lendingRecords.map((record) => (
                      <TableRow key={record._id}>
                        <TableCell className="font-medium">
                          {record.bookId.title}
                        </TableCell>
                        <TableCell>{record.readerId.name}</TableCell>
                        <TableCell>{record.borrowedDate}</TableCell>
                        <TableCell>{record.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                              variant={
                                record.status === "returned" ? "default" : "secondary"
                              }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedRecord(record);
                                setNewStatus(record.status);
                                setIsEditModalOpen(true);
                              }}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Lending Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Update status for:</Label>
              <div className="text-gray-700">
                <strong>Book:</strong> {selectedRecord?.bookId.title} <br />
                <strong>Reader:</strong> {selectedRecord?.readerId.name}
              </div>

              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                  onClick={handleUpdateStatus}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
