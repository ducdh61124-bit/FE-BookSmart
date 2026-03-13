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
        <Image
          src={img}
          fallback="https://th.bing.com/th/id/OIP.f3_96vI7H_OaKIdK7mS5EwHaJ4?pid=ImgDet&rs=1"
          width={60}
          height={80}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
        />
      ),
    },
    {
      title: 'Tên sách',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => (a.title || "").localeCompare((b.title || ""), 'vi'),
      defaultSortOrder: 'ascend',
      showSorterTooltip: { title: 'Bấm để xếp theo bảng chữ cái' },
      render: (text: string) => <strong style={{ color: '#1890ff' }}>{text}</strong>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      filters: authorFilters, // Đã hết lỗi vì đã định nghĩa ở trên
      filterSearch: true,
      onFilter: (value: any, record: any) => record.author.includes(value as string),
      sorter: (a: any, b: any) => (a.author || "").localeCompare((b.author || ""), 'vi'),
    },
    {
      title: 'Thể loại',
      key: 'category',
      filters: categoryFilters, // Đã hết lỗi vì đã định nghĩa ở trên
      onFilter: (value: any, record: any) => record.category?.name === value,
      sorter: (a: any, b: any) => (a.category?.name || "").localeCompare((b.category?.name || ""), 'vi'),
      render: (record: any) => (
        <span style={{
          backgroundColor: '#e6f7ff',
          color: '#1890ff',
          padding: '2px 8px',
          borderRadius: '4px',
          border: '1px solid #91d5ff',
          fontSize: '12px'
        }}>
          {record.category ? record.category.name : 'Chưa phân loại'}
        </span>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
      filters: [
        { text: 'Dưới 100k', value: '0-100000' },
        { text: '100k - 200k', value: '100000-200000' },
        { text: 'Trên 200k', value: '200000-9999999' },
      ],
      onFilter: (value: any, record: any) => {
        const [min, max] = (value as string).split('-').map(Number);
        return record.price >= min && record.price <= max;
      },
      render: (p) => <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{p?.toLocaleString() || 0} đ</span>,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: any, b: any) => a.stock - b.stock,
      filters: [
        { text: 'Hết hàng (0)', value: 'empty' },
        { text: 'Sắp hết (1-20)', value: 'low' },
        { text: 'Còn nhiều (>20)', value: 'high' },
      ],
      onFilter: (value: any, record: any) => {
        if (value === 'empty') return record.stock === 0;
        if (value === 'low') return record.stock > 0 && record.stock <= 20;
        if (value === 'high') return record.stock > 20;
        return true;
      },
      align: 'center',
      render: (s) => <Tag color={s > 20 ? 'green' : s > 0 ? 'orange' : 'volcano'}>{s || 0} cuốn</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>Sửa</Button>
          <Popconfirm title="Xóa hả ông giáo?" onConfirm={() => onDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
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
      pagination={{ pageSize: 8 }} // Chỉnh lại 8 cuốn/trang cho đẹp
    />
  );
};