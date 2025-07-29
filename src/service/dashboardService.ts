import {apiClient} from "@/API/apiClient.ts"
import type {DashboardData} from "@/types";

export const getDashboardData = async (): Promise<DashboardData> => {
    try {
        const response = await apiClient("http://localhost:5000/api/dashboard/stats");
        return response as DashboardData; 
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};