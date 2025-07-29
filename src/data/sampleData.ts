/*
import type { Reader, Book, LendingRecord, OverdueRecord } from "../types"

export const sampleReaders: Reader[] = [
  { _id: "1", name: "John Doe", email: "john@example.com", phone: "+1234567890", membershipDate: "2023-01-15" },
  { _id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", membershipDate: "2023-02-20" },
  { _id: "3", name: "Bob Johnson", email: "bob@example.com", phone: "+1234567892", membershipDate: "2023-03-10" },
  { _id: "4", name: "Alice Brown", email: "alice@example.com", phone: "+1234567893", membershipDate: "2023-04-05" },
  { _id: "5", name: "Charlie Wilson", email: "charlie@example.com", phone: "+1234567894", membershipDate: "2023-05-12" },
]

export const sampleBooks: Book[] = [
  { _id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", status: "Available" },
  { _id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", status: "Lent" },
  { _id: "3", title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", status: "Available" },
  { _id: "4", title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", status: "Lent" },
  { _id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0-316-76948-0", status: "Available" },
]

export const sampleLendingRecords: LendingRecord[] = [
  {
    id: "1",
    bookId: "2",
    bookTitle: "To Kill a Mockingbird",
    readerId: "1",
    readerName: "John Doe",
    lentDate: "2024-01-01",
    dueDate: "2024-01-15",
    status: "Pending",
  },
  {
    id: "2",
    bookId: "1",
    bookTitle: "The Great Gatsby",
    readerId: "2",
    readerName: "Jane Smith",
    lentDate: "2023-12-15",
    dueDate: "2023-12-29",
    status: "Returned",
  },
  {
    id: "3",
    bookId: "4",
    bookTitle: "Pride and Prejudice",
    readerId: "3",
    readerName: "Bob Johnson",
    lentDate: "2024-01-10",
    dueDate: "2024-01-24",
    status: "Pending",
  },
]

export const sampleOverdueRecords: OverdueRecord[] = [
  {
    readerId: "1",
    readerName: "John Doe",
    books: [{ title: "To Kill a Mockingbird", dueDate: "2024-01-15", daysOverdue: 5 }],
  },
  {
    readerId: "3",
    readerName: "Bob Johnson",
    books: [{ title: "Pride and Prejudice", dueDate: "2024-01-24", daysOverdue: 2 }],
  },
]
*/
