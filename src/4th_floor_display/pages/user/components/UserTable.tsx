import React from 'react';
import { Table, Space, Button, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    username: string;
}

interface Props {
    data: User[];
    loading: boolean;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export const UserTable: React.FC<Props> = ({ data, loading, onEdit, onDelete }) => {
    const columns: ColumnsType<User> = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <Space>
                    <UserOutlined className="text-blue-500" />
                    <span className="font-bold text-blue-600">{text}</span>
                </Space>
            ),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            scroll={{ x: 'max-content', y: 'calc(95vh - 350px)' }}
            pagination={{ pageSize: 15 }}
            className="border border-gray-100 rounded-lg overflow-hidden [&_.ant-table-body]:!min-h-[calc(95vh-350px)]"
        />
    );
};