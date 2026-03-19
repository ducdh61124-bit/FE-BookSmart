import React from 'react';
import { Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import type { HistoryLog } from '../../../../5th_floor_core/core/types/history.type';

interface HistoryTableProps {
    logs: HistoryLog[];
    loading: boolean;
    onViewDetails: (log: HistoryLog) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ logs, loading, onViewDetails }) => {
    const columns: ColumnsType<HistoryLog> = [
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => <strong>{new Date(text).toLocaleString('vi-VN')}</strong>,
            width: 180,
        },
        {
            title: 'Người thực hiện',
            dataIndex: 'performedBy',
            key: 'performedBy',
            render: (text) => <span className="font-semibold text-blue-600">@{text}</span>,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (action: string) => {
                let color = 'blue';
                if (action === 'CREATE') color = 'green';
                if (action === 'UPDATE') color = 'orange';
                if (action === 'DELETE') color = 'red';
                if (action === 'LOGIN' || action === 'LOGOUT') color = 'purple';
                return <Tag color={color}>{action}</Tag>;
            },
        },
        {
            title: 'Phân hệ',
            dataIndex: 'entityType',
            key: 'entityType',
            render: (type: string) => <Tag>{type}</Tag>,
        },
        {
            title: 'Đối tượng tác động',
            dataIndex: 'entityName',
            key: 'entityName',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => onViewDetails(record)}
                >
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={logs}
            rowKey="id"
            loading={loading}
            scroll={{ x: 'max-content', y: 'calc(95vh - 350px)' }}
            className="[&_.ant-table-body]:!min-h-[calc(95vh-350px)] border border-gray-100 rounded-lg overflow-hidden"
            pagination={{ pageSize: 15, showSizeChanger: false }}
        />
    );
};

export default HistoryTable;