import axiosClient from '../axiosClient';
import type { HistoryLog } from '../../../../5th_floor_core/core/types/history.type';

export const historyApi = {
    getAll: async (): Promise<HistoryLog[]> => {
        const response = await axiosClient.get('/history');
        return Array.isArray(response) ? response : response.data;
    },
};