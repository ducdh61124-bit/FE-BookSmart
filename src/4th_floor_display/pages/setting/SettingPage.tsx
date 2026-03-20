import React from 'react';
import { Card, message, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../3rd_floor_stateManagement/redux/hooks';
import { logout as logoutAction } from '../../../3rd_floor_stateManagement/redux/slices/authSlice';
import { authService } from '../../../2nd_floor_professionalSkill/services/authService';
import { userService } from '../../../2nd_floor_professionalSkill/services/userService';
import { ProfileForm } from './components/ProfileForm';
import { DangerZone } from './components/DangerZone';

const { Title, Text } = Typography;

const SettingPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const initialUserData = {
        name: user?.name || user?.user?.name,
        phone: user?.phone || user?.user?.phone,
        email: user?.email || user?.user?.email,
        username: user?.username || user?.user?.username,
    };

    const forceLogout = () => {
        authService.logout();
        dispatch(logoutAction());
        navigate('/login');
    };

    const handleUpdate = async (values: any) => {
        try {
            const userId = user?.id || user?.user?.id;
            if (!userId) {
                message.error("Hệ thống không tìm thấy ID của bạn, vui lòng đăng nhập lại!");
                return;
            }
            await userService.updateUser(userId, values);
            message.success('Cập nhật thành công! Vui lòng đăng nhập lại.');
            forceLogout();
        } catch (error) {
            message.error('Cập nhật thất bại!');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const userId = user?.id || user?.user?.id;
            await userService.deleteUser(userId);
            message.success('Tài khoản đã bị xóa vĩnh viễn!');
            forceLogout();
        } catch (error) {
            message.error('Lỗi khi xóa tài khoản!');
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <Card className="w-full max-w-2xl shadow-sm rounded-xl" variant="borderless">
                {/* Phần Header của trang */}
                <div className="text-center mb-8">
                    <UserOutlined className="text-5xl text-blue-500 bg-blue-50 p-4 rounded-full mb-4" />
                    <Title level={3} className="!mb-1">Cài đặt tài khoản</Title>
                    <Text type="secondary">Quản lý thông tin cá nhân và định danh của bạn</Text>
                </div>
                <ProfileForm initialValues={initialUserData} onUpdate={handleUpdate} />
                <Divider className="border-red-200" />
                <DangerZone onDelete={handleDeleteAccount} />

            </Card>
        </div>
    );
};

export default SettingPage;