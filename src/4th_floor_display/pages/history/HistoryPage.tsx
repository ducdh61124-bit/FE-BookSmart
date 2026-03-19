import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { useHistory } from '../../../3rd_floor_stateManagement/hooks/useHistory';
import HistoryTable from './components/HistoryTable';
import HistoryFormModal from './components/HistoryFormModal';

const { Title } = Typography;

const HistoryPage: React.FC = () => {

    const { logs, loading } = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLog, setSelectedLog] = useState<HistoryLog | null>(null);

    const handleViewDetails = (log: HistoryLog) => {
        setSelectedLog(log);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedLog(null);
    };

    return (
        <Card className="shadow-sm rounded-lg border-none">
            <div className="flex items-center gap-2 mb-6">
                <HistoryOutlined className="text-2xl text-[#FFB400]" />
                <Title level={3} className="!mb-0">Lịch sử Hoạt động Hệ thống</Title>
            </div>

            <HistoryTable
                logs={logs}
                loading={loading}
                onViewDetails={handleViewDetails}
            />

            <HistoryFormModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                log={selectedLog}
            />
        </Card>
    );
};

export default HistoryPage;