import type { Book } from "@/types";
import {apiClient} from "@/API/apiClient.ts";

export const getAllBooks = async (): Promise<Book[]> => {
    return apiClient("http://localhost:5000/api/books");

};

export const getBookById = async (id: string): Promise<Book | null> => {
    try {
        const response = await apiClient(`http://localhost:5000/api/books/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return null;
    }
}

export const createBook = async (bookData: Omit<Book, "_id">): Promise<Book> => {
    const response = await apiClient("http://localhost:5000/api/books", {
        method: "POST",
        body: JSON.stringify(bookData),
    });
    return response;
};

export const updateBook = async (id: string, bookData: Omit<Book, "_id">): Promise<Book> => {
    const response = await apiClient(`http://localhost:5000/api/books/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(bookData),
    });
    return response;
};

export const deleteBook = async (id: string): Promise<boolean> => {
    const response = await apiClient(`http://localhost:5000/api/books/delete/${id}`, {
        method: "DELETE",
    });
    return response.ok;
};

