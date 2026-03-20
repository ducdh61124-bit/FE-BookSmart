import { dashboardApi } from "../../1st_floor_dataAccess/api/endpoints/dashboard.api";

export const dashboardService = {
    fetchStats: async () => {
        const response = await dashboardApi.getStats();
        return response.data || response;
    }
};