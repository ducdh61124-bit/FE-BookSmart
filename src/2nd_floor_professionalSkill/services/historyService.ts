import {historyApi} from '../../1st_floor_dataAccess/api/endpoints/history.api';
import type { HistoryLog } from '../../../5th_floor_core/core/types/history.type';

export const historyService = {
    getAllLogs: async () => {
        try {
            const data = await historyApi.getAll();
            return data;
        } catch (error) {
            console.error('Lỗi khi lấy lịch sử từ API:', error);
            throw error;
        }
    }
}