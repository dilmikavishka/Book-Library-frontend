import type {Reader} from "@/types";
import {apiClient} from "@/API/apiClient.ts";


export const getAllReaders = async (): Promise<Reader[]> => {
    return apiClient("http://localhost:5000/api/readers")

}

export const getReaderById = async (id: string): Promise<Reader | null> => {
    try {
        const response = await apiClient(`http://localhost:5000/api/readers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reader by ID:", error);
        return null;
    }
}

export const createReader = async (readerData: Omit<Reader, "_id">): Promise<Reader> => {
    const response = await apiClient("http://localhost:5000/api/readers", {
        method: "POST",
        body: JSON.stringify(readerData),
    });
    return response;
};

export const updateReader = async (id: string, readerData: Omit<Reader, "_id">): Promise<Reader> => {
    const response = await apiClient(`http://localhost:5000/api/readers/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(readerData),
    });
    return response;
};

export const deleteReader = async (id: string): Promise<boolean> => {
    const response = await apiClient(`http://localhost:5000/api/readers/delete/${id}`, {
        method: "DELETE",
    });
    return response.ok;
};
