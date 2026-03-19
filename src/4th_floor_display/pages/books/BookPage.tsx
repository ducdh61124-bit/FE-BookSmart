import React, { useEffect, useState } from 'react';
import { Card, Typography, Space, message, Input } from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { bookService } from '../../../2nd_floor_professionalSkill/services/bookService';
import type { Book } from '../../../1st_floor_dataAccess/api/endpoints/book.api';
import { BookTable } from './components/BookTable';
import { BookFormModal } from './components/BookFormModal';
import { CustomButton } from '../../components/shared/CustomButton';
import { useAppDispatch } from '../../../3rd_floor_stateManagement/redux/hooks';

const { Title, Text } = Typography;

const BookPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [searchText, setSearchText] = useState('');
    const dispatch = useAppDispatch();

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await bookService.getAllBooks();
            setBooks(Array.isArray(res) ? res : []);
        }
        catch (e: any) { message.error("Lỗi load data!"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchBooks(); }, []);

    const displayData = books.filter(b =>
        !searchText || b.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
    <div className="flex flex-col w-full" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Card
            variant="flat"
            className="shadow-sm border-none flex-1 flex flex-col"
            style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
            styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
        >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Title level={3} style={{ margin: 0 }}>Hệ thống quản lý kho sách</Title>
                <Text type="secondary">
                    Đang hiển thị: <span className="font-bold text-blue-600">{displayData.length}</span>/{books.length} cuốn
                </Text>
            </div>

            <Space>
                <Input
                    placeholder="Tìm theo tên sách..."
                    prefix={<SearchOutlined />}
                    style={{ width: 250 }}
                    onChange={e => setSearchText(e.target.value)}
                    allowClear
                />
                <CustomButton icon={<ReloadOutlined />} onClick={fetchBooks} loading={loading}>Làm mới</CustomButton>
                <CustomButton type="primary" icon={<PlusOutlined />} onClick={() => { setEditingBook(null); setIsModalOpen(true); }}>
                    Thêm sách
                </CustomButton>
            </Space>
        </div>

        <BookTable
            data={displayData}
            loading={loading}
            onEdit={(book) => { setEditingBook(book); setIsModalOpen(true); }}
            onDelete={async (id) => {
                try {
                    await bookService.removeBook(id);
                    message.success("Đã xóa sách thành công!");
                    fetchBooks();
                } catch (e) {
                    message.error("Xóa thất bại!");
                }
            }}
        />

        <BookFormModal
            open={isModalOpen}
            editingBook={editingBook}
            loading={loading}
            onCancel={() => setIsModalOpen(false)}
            onSave={async (values) => {
                try {
                    setLoading(true);
                    if (editingBook) {
                        await bookService.editBook(editingBook.id, values);
                        message.success("Cập nhật thành công!");
                    } else {
                        await bookService.addBook(values);
                        message.success("Thêm sách mới thành công!");
                    }
                    setIsModalOpen(false);
                    fetchBooks();
                } catch (error: any) {
                    message.error("Không lưu được sách!");
                } finally {
                    setLoading(false);
                }
            }}
        />
        </Card>
    </div>
  );
};

export default BookPage;