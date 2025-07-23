import {useEffect, useState} from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import type { Reader } from "../types"
import { sampleReaders } from "../data/sampleData"
import {createReader, deleteReader, getAllReaders, updateReader} from "@/service/readerService.ts";

export default function ReaderManagement() {
  const [readers, setReaders] = useState<Reader[]>(sampleReaders)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingReader, setEditingReader] = useState<Reader | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newReader, setNewReader] = useState({
    name: "",
    email: "",
    phone: "",
    membershipDate:""
  })

  useEffect(() => {
    fetchAllReaders()
  },[])

    const fetchAllReaders = async () => {
    try{
      const readersData = await getAllReaders()
      setReaders(readersData)
    }catch(err){
        console.error("Error fetching readers:", err)
    }

    }

  const filteredReaders = readers.filter(
      (reader) =>
          reader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reader.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddReader =async () => {
    try {
      const readerData = {
        name: newReader.name,
        email: newReader.email,
        phone: newReader.phone,
        membershipDate: newReader.membershipDate
      }

      const createdReader = await createReader(readerData)
      if (createdReader) {
        setNewReader({
          name: "",
          email: "",
          phone: "" ,
          membershipDate: ""
        })
        setIsAddModalOpen(false)
      }else {
        console.error("Failed to create reader")
      }
    }catch (error) {
        console.error("Error adding reader:", error)
    }

  }

  const handleEditReader = (reader: Reader) => {
    setEditingReader(reader)
    setIsEditModalOpen(true)
  }

  const handleUpdateReader =async () => {
    if(!editingReader) return
    try{
      const updateReaders = await updateReader(editingReader._id,editingReader);
      if (updateReaders) {
        await fetchAllReaders()
        setEditingReader(updateReaders)
        setIsEditModalOpen(false)
      }else {
        console.error("Failed to update reader")
      }

    }catch (error) {
        console.error("Error updating reader:", error)
    }

  }

  const handleDeleteReader =async (id: string) => {
    try{
        if (!window.confirm("Are you sure you want to delete this reader?")) {
            return
        }
      const success = await deleteReader(id)
      if(success) {
        setReaders(readers.filter((reader) => reader._id !== id))
        console.log("Reader deleted successfully")
        await fetchAllReaders()
      }else {
        console.error("Failed to delete reader")
      }
    }catch(err){
        console.error("Error deleting reader:", err)
    }

  }

  return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Reader Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Reader
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
              placeholder="Search readers..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Membership Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReaders.map((reader) => (
                      <TableRow key={reader._id}>
                        <TableCell className="font-medium">{reader.name}</TableCell>
                        <TableCell>{reader.email}</TableCell>
                        <TableCell>{reader.phone}</TableCell>
                        <TableCell>{reader.membershipDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditReader(reader)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteReader(reader._id)}>
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

        {/* Add Reader Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Reader</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newReader.name}
                    onChange={(e) => setNewReader({ ...newReader, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newReader.email}
                    onChange={(e) => setNewReader({ ...newReader, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={newReader.phone}
                    onChange={(e) => setNewReader({ ...newReader, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="membershipDate">Membership Date</Label>
                <Input
                    id="membershipDate"
                    placeholder="Enter Membership Date"
                    value={newReader.membershipDate}
                    onChange={(e) => setNewReader({ ...newReader, membershipDate: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReader}>Add Reader</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Reader Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={(open) => {
          if (!open) setEditingReader(null)
          setIsEditModalOpen(open)
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Reader</DialogTitle>
            </DialogHeader>
            {editingReader && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                        id="edit-name"
                        placeholder="Enter full name"
                        value={editingReader.name}
                        onChange={(e) => setEditingReader({ ...editingReader, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                        id="edit-email"
                        type="email"
                        placeholder="Enter email address"
                        value={editingReader.email}
                        onChange={(e) => setEditingReader({ ...editingReader, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                        id="edit-phone"
                        placeholder="Enter phone number"
                        value={editingReader.phone}
                        onChange={(e) => setEditingReader({ ...editingReader, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateReader}>Update Reader</Button>
                  </div>
                </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  )
}
