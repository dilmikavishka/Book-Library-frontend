import type { Book } from "@/types";
import {apiClient} from "@/API/apiClient.ts";

export const getAllBooks = async (): Promise<Book[]> => {
    return apiClient("http://localhost:5000/api/books");

};

    export const uploadBookCoverImage = async (file: File): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);

        const response = await fetch("http://localhost:5000/api/imagekit/", {
        method: "POST",
        body: formData,
        });

        const result = await response.json();
        if (response.ok && result.url) {
        return result.url;
        } else {
        console.error("Image upload failed:", result.error);
        return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
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

