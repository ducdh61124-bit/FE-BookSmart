import { useState, useEffect } from 'react';
import { historyService } from '../../2nd_floor_professionalSkill/services/historyService';
import type { HistoryLog } from '../../5th_floor_core/core/types/history.type';
import { message } from 'antd';

export const useHistory = () => {
    const [logs, setLogs] = useState<HistoryLog[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const data = await historyService.getAllLogs();
            setLogs(data);
        } catch (error) {
            message.error('Không thể tải lịch sử hệ thống!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return { logs, loading, fetchLogs };
};