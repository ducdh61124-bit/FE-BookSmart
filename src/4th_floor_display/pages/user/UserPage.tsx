import React, { useEffect, useState } from 'react';
import { Card, Typography, Space, message, Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { UserTable } from './components/UserTable';
import { UserFormModal } from './components/UserFormModal';
import { userService } from '../../../2nd_floor_professionalSkill/services/userService';

const { Title } = Typography;

const UserPage: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (e) { message.error("Không load được danh sách user!"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const displayData = (users || []).filter(u =>
        u.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full" style={{ minHeight: 'calc(100vh - 120px)' }}>
            <Card className="m-4 shadow-sm">
                <div className="flex justify-between mb-4">
                    <Title level={3}>Quản lý người dùng</Title>
                    <Space>
                        <Input
                            placeholder="Tìm tên hoặc email..."
                            prefix={<SearchOutlined />}
                            onChange={e => setSearchText(e.target.value)}
                        />
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>
                            Thêm thành viên
                        </Button>
                    </Space>
                </div>

                <UserTable
                    data={displayData}
                    loading={loading}
                    onEdit={(u) => { setEditingUser(u); setIsModalOpen(true); }}
                    onDelete={async (id) => {
                        await userService.deleteUser(id);
                        message.success("Đã xóa!");
                        fetchUsers();
                    }}
                />

                <UserFormModal
                    open={isModalOpen}
                    editingUser={editingUser}
                    loading={loading}
                    onCancel={() => setIsModalOpen(false)}
                    onSave={async (values) => {
                        setLoading(true);
                        try {
                            if (editingUser) await userService.updateUser(editingUser.id, values);
                            else await userService.createUser(values);
                            message.success("Thành công!");
                            setIsModalOpen(false);
                            fetchUsers();
                        } catch (e) { message.error("Lỗi rồi ông giáo!"); }
                        finally { setLoading(false); }
                    }}
                />
            </Card>
        </div>
    );
};

export default UserPage;