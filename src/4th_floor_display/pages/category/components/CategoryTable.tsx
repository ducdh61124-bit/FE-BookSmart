import React from 'react';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Category } from '../../../../../5th_floor_core/core/types/category.type';

interface CategoryTableProps {
    data: Category[];
    loading: boolean;
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ data, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            align: 'center' as const,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="font-bold text-blue-600">{text}</span>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            width: 150,
            render: (status: boolean) => (
                <Tag color={status ? 'green' : 'red'} className="font-bold">
                    {status ? 'HOẠT ĐỘNG' : 'TẠM ẨN'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            width: 200,
            render: (_: any, record: Category) => (
                <div className="flex justify-center gap-4">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => onEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa danh mục này?"
                        description="Hành động này không thể hoàn tác. Bạn chắc chứ?"
                        onConfirm={() => onDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
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
            className="shadow-sm border border-gray-100 rounded-lg [&_.ant-table-body]:!min-h-[calc(95vh-350px)]"
        />
    );
};