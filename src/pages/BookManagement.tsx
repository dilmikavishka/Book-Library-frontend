import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Badge } from "../components/ui/badge"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import type { Book } from "../types"
import { getAllBooks, createBook, updateBook, deleteBook } from "../service/bookService.ts"

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    copies_Available: ""
  })

  useEffect(() => {
    fetchAllBooks()
  }, [])

  const fetchAllBooks = async () => {
    try {
      const booksData = await getAllBooks()
      setBooks(booksData)
    } catch (error) {
      console.error("Failed to fetch books:", error)
    }
  }

  const filteredBooks = books.filter(
      (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.includes(searchTerm)
  )

  const handleAddBook = async () => {
    try {
      const bookData = {
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn,
        category: newBook.category,
        copiesAvailable: newBook.copies_Available,
      }

      const createdBook = await createBook(bookData)
      if (createdBook) {
        await fetchAllBooks()
        setNewBook({
          title: "",
          author: "",
          isbn: "",
          category: "",
          copies_Available: ""
        })
        setIsAddModalOpen(false)
      } else {
        console.error("Failed to create book")
      }
    } catch (error) {
      console.error("Error adding book:", error)
    }
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setIsEditModalOpen(true)
  }

  const handleUpdateBook = async () => {
    if (!editingBook) return
    try {
      const updatedBook = await updateBook(editingBook._id, editingBook)
      if (updatedBook) {
        await fetchAllBooks()
        setEditingBook(null)
        setIsEditModalOpen(false)
      } else {
        console.error("Failed to update book")
      }
    } catch (error) {
      console.error("Error updating book:", error)
    }
  }

  const handleDeleteBook = async (id: string) => {
    try {
      const success = await deleteBook(id)
      if (success) {
        setBooks(books.filter((b) => b._id !== id))
        await fetchAllBooks()
      } else {
        console.error("Failed to delete book")
      }
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Book
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Copies Available</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book) => (
                      <TableRow key={book._id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>{book.copiesAvailable}</TableCell>
                        <TableCell>
                          <Badge
                              className={`${book.category === "Fiction" ? "bg-blue-500" : "bg-green-500"} text-white`}
                              variant="outline"
                          >
                            {book.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditBook(book)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setBookToDelete(book)
                                  setIsDeleteModalOpen(true)
                                }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Book Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Title</Label>
              <Input value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
              <Label>Author</Label>
              <Input value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
              <Label>ISBN</Label>
              <Input value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
              <Label>Category</Label>
              <Input value={newBook.category} onChange={(e) => setNewBook({ ...newBook, category: e.target.value })} />
              <Label>Copies</Label>
              <Input value={newBook.copies_Available} onChange={(e) => setNewBook({ ...newBook, copies_Available: e.target.value })} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={handleAddBook}>Add Book</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Book Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
            </DialogHeader>
            {editingBook && (
                <div className="space-y-4">
                  <Label>Title</Label>
                  <Input value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
                  <Label>Author</Label>
                  <Input value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
                  <Label>ISBN</Label>
                  <Input value={editingBook.isbn} onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })} />
                  <Label>Category</Label>
                  <Input value={editingBook.category} onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })} />
                  <Label>Copies Available</Label>
                  <Input value={editingBook.copiesAvailable} onChange={(e) => setEditingBook({ ...editingBook, copiesAvailable: e.target.value })} />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateBook}>Update Book</Button>
                  </div>
                </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="max-w-sm text-center">
            <DialogHeader>
              <DialogTitle className="text-lg">Are you sure?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600 mb-4">
              This will permanently delete <strong>{bookToDelete?.title}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
              <Button
                  variant="destructive"
                  onClick={async () => {
                    if (bookToDelete) {
                      await handleDeleteBook(bookToDelete._id)
                      setIsDeleteModalOpen(false)
                      setBookToDelete(null)
                    }
                  }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}
