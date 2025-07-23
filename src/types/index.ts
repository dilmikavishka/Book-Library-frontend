export interface Reader {
  _id: string
  name: string
  email: string
  phone: string
  membershipDate: string
}

export interface Book {
  _id: string
  title: string
  author: string
  isbn: string
  category: string;
  copiesAvailable: string;
}

export interface LendingRecord {
  _id: string
  bookId: string
  readerId: string
  borrowedDate: string
  dueDate: string
  returnedDate?: string
  status: 'borrowed' | 'returned' | 'overdue' | 'pending'
}

// for update lending type of id with states

export interface LendingPopulated {
  _id: string
  bookId: { _id: string; title: string; author: string }
  readerId: { _id: string; name: string; email: string }
  borrowedDate: string
  dueDate: string
  returnedDate?: string
  status: 'borrowed' | 'returned' | 'overdue' | 'pending'
}



export interface OverdueRecord {
  _id: string
  readerId: string
  readerName: string
  books: Array<{
    title: string
    dueDate: string
    daysOverdue: number
  }>
}
