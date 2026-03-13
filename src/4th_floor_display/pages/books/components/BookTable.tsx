import React, { useMemo } from 'react';
import { Table, Space, Button, Popconfirm, Image, Typography, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Book } from '../../../../1st_floor_dataAccess/api/endpoints/book.api';

interface Props {
    data: Book[];
    loading: boolean;
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
}

export const BookTable: React.FC<Props> = ({ data, loading, onEdit, onDelete }) => {

    // Tạo danh sách Tác giả duy nhất
    const authorFilters = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return [...new Set(data.map(book => book.author))]
            .filter(Boolean)
        .map(author => ({ text: author, value: author }));
    }, [data]);

    // Tạo danh sách Thể loại duy nhất
    const categoryFilters = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return [...new Set(data.map(book => book.category?.name))]
            .filter(Boolean)
            .map(name => ({ text: name, value: name }));
    }, [data]);

    const columns: ColumnsType<Book> = [
        {
            title: 'Bìa sách',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (img) => (
                <Image src={img} fallback="https://th.bing.com/..." width={60} height={80} className="object-cover rounded-lg shadow-sm" />
            ),
        },
        {
            title: 'Tên sách',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => (a.title || "").localeCompare((b.title || ""), 'vi'),
            render: (text) => <strong className="text-blue-600 font-bold">{text}</strong>,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            filters: authorFilters,
            onFilter: (value, record) => record.author.includes(value as string),
            render: (text) => <span className="text-gray-600 italic font-medium">{text}</span>
        },
        {
            title: 'Thể loại',
            key: 'category',
            filters: categoryFilters,
            onFilter: (value, record) => record.category?.name === value,
            render: (record) => (
                <span className="px-3 py-1 bg-blue-50 text-blue-500 border border-blue-100 rounded-full text-xs font-semibold">
                    {record.category ? record.category.name : 'Chưa phân loại'}
                </span>
            ),
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (p) => <span className="text-red-500 font-extrabold">{p?.toLocaleString() || 0} đ</span>,
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stock',
            key: 'stock',
            align: 'center',
            render: (s) => (
                <Tag color={s > 20 ? 'green' : s > 0 ? 'orange' : 'volcano'} className="rounded-md px-2 font-medium">
                    {s || 0} cuốn
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle" className="flex justify-center">
                    <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} className="text-blue-500 hover:bg-blue-50">Sửa</Button>
                    <Popconfirm title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)}>
                        <Button type="link" danger icon={<DeleteOutlined />} className="hover:bg-red-50">Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={Array.isArray(data) ? data : []}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            className="border border-gray-100 rounded-lg overflow-hidden"
        />
    );
}