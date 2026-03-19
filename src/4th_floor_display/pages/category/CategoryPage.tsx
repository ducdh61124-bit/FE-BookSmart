import React, { useEffect, useState } from 'react';
import { Card, Typography, Space, message, Input, Button } from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { CategoryTable } from './components/CategoryTable';
import { CategoryFormModal } from './components/CategoryFormModal';
import { useAppDispatch, useAppSelector } from '../../../3rd_floor_stateManagement/redux/hooks';
import { setCategories, setLoading, addCategory, updateCategory, deleteCategory } from '../../../3rd_floor_stateManagement/redux/slices/categorySlice';
import { categoryService } from '../../../2nd_floor_professionalSkill/services/categoryService';

const { Title, Text } = Typography;

const CategoryPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector(state => state.category);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchText, setSearchText] = useState('');

    const fetchCategories = async () => {
        dispatch(setLoading(true));
        try {
            const data = await categoryService.getAllCategories();
            dispatch(setCategories(data));
        } catch (e: any) {
            console.error("Chi tiết lỗi tải danh mục:", e.response || e);
            message.error("Lỗi khi tải danh mục!");
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const loadData = async () => {
            dispatch(setLoading(true));
            const data = await categoryService.getAllCategories();
            dispatch(setCategories(data));
        };
        loadData();
    }, [dispatch]);

    const displayData = (categories || []).filter(c =>
        !searchText || (c.name && c.name.toLowerCase().includes(searchText.toLowerCase()))
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
                        <Title level={3} style={{ margin: 0 }}>Quản lý Danh mục</Title>
                        <Text type="secondary">
                            Đang hiển thị: <span className="font-bold text-blue-600">{displayData?.length || 0}</span>/{(categories || []).length} danh mục
                        </Text>
                    </div>

                    <Space>
                        <Input
                            placeholder="Tìm kiếm danh mục..."
                            prefix={<SearchOutlined />}
                            style={{ width: 250 }}
                            onChange={e => setSearchText(e.target.value)}
                            allowClear
                        />
                        <Button icon={<ReloadOutlined />} onClick={fetchCategories} loading={loading}>
                            Làm mới
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className="bg-blue-600"
                            onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
                        >
                            Thêm danh mục
                        </Button>
                    </Space>
                </div>

                <CategoryTable
                    data={displayData}
                    loading={loading}
                    onEdit={(cat) => { setEditingCategory(cat); setIsModalOpen(true); }}
                    onDelete={async (id) => {
                        try {
                            await categoryService.deleteCategory(id);
                            dispatch(deleteCategory(id));
                            message.success("Xóa danh mục thành công!");
                        } catch (e) { message.error("Lỗi hệ thống khi xóa!"); }
                    }}
                />

                <CategoryFormModal
                    open={isModalOpen}
                    editingCategory={editingCategory}
                    loading={loading}
                    onCancel={() => setIsModalOpen(false)}
                    onSave={async (values) => {
                        try {
                            if (editingCategory) {
                                const successMsg = await categoryService.updateCategory(editingCategory.id, values);
                                message.success(successMsg || "Cập nhật danh mục thành công!");
                            } else {
                                const successMsg = await categoryService.addCategory(values);
                                message.success(successMsg || "Thêm danh mục mới thành công!");
                            }
                            setIsModalOpen(false);
                            fetchCategories();
                        } catch (e) {
                        const errorMsg = e.response?.data || "Lỗi khi lưu dữ liệu!";
                        message.error(errorMsg);
                        }
                    }}
                />
            </Card>
        </div>
    );
};

export default CategoryPage;