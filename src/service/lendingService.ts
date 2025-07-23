import {apiClient} from "@/API/apiClient.ts";
import type {LendingPopulated, LendingRecord} from "@/types";


export const getAllLendings = async (): Promise<LendingRecord[]> => {
    return apiClient("http://localhost:5000/api/lendings");
}

export const getAllLendingsNames = async (): Promise<LendingPopulated[]> => {
    return apiClient("http://localhost:5000/api/lendings/with-names");
}

export const sendOverdueNotification = async (readerId: string): Promise<boolean> => {
    try {
        const response = await apiClient(`http://localhost:5000/api/lendings/notify-overdue-with-user/${readerId}`, {
            method: "POST",
        });
        return response.ok;
    } catch (error) {
        console.error("Error sending overdue notification:", error);
        return false;
    }
}

export const notifyAll = async (): Promise<boolean> => {
    try {
        const response = await apiClient("http://localhost:5000/api/lendings/notify-overdue", {
            method: "POST",
        });
        return response.ok;
    } catch (error) {
        console.error("Error notifying all overdue readers:", error);
        return false;
    }
}

export const getLendingById = async (id: string): Promise<LendingRecord | null> => {
    try {
        const response = await apiClient(`http://localhost:5000/api/lendings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching lending by ID:", error);
        return null;
    }
}
export const createLending = async (lendingData: Omit<LendingRecord, "_id">): Promise<LendingRecord> => {
    const response = await apiClient("http://localhost:5000/api/lendings", {
        method: "POST",
        body: JSON.stringify(lendingData),
    });
    return response;
};

export const updateLending = async (id: string, lendingData: Omit<LendingRecord, "_id">): Promise<LendingRecord> => {
    const response = await apiClient(`http://localhost:5000/api/lendings/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(lendingData),
    });
    return response;
};

export const deleteLending = async (id: string): Promise<boolean> => {
    const response = await apiClient(`http://localhost:5000/api/lendings/delete/${id}`, {
        method: "DELETE",
    });
    return response.ok;
};