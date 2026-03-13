import React, { useState } from 'react';
import { UserOutlined, BookOutlined, SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown, Typography, theme, message, Button, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../3rd_floor_stateManagement/redux/hooks';
import { logout as logoutAction } from '../../3rd_floor_stateManagement/redux/slices/authSlice';
import { authService } from '../../2nd_floor_professionalSkill/services/authService';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    // 1. Lấy dữ liệu từ Redux
    const user = useAppSelector((state) => state.auth.user);

    // 2. State cho Sidebar và Theme
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();

    // 3. Logic bảo vệ Route: Nếu mất token thì đá về Login
    React.useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    // 4. Hàm xử lý Đăng xuất
    const handleLogout = () => {
        authService.logout();
        dispatch(logoutAction());
        message.success('Đăng xuất thành công!');
        navigate('/login');
    };

    // 5. Cấu hình Menu
    const menuItems = [
        { key: '/books', icon: <BookOutlined />, label: 'Quản lý Kho Sách', onClick: () => navigate('/books') }
    ];

    const userMenuItems = [
        { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt tài khoản' },
        { type: 'divider' as const },
        { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true, onClick: handleLogout },
    ];

    const displayName = user?.name || user?.user?.name || user?.username || 'Người dùng';

    return (
        <Layout className="min-h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={300} className="shadow-xl">
                <div className="h-16 m-4 flex items-center justify-center text-white border-b border-gray-700 pb-2">
                    <BookOutlined className="text-2xl text-blue-500" />
                    {!collapsed && <span className="ml-3 font-bold text-lg tracking-tight">SMARTBOOK</span>}
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
            </Sider>

            <Layout className="bg-gray-50">
                <Header className="px-6 flex items-center justify-between shadow-sm" style={{ background: colorBgContainer }}>
                    <div className="flex items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-base w-16 h-16 hover:bg-gray-100"
                        />
                        <Title level={4} className="!m-0 hidden md:block">HỆ THỐNG QUẢN LÝ KHO SÁCH</Title>
                    </div>

                    <Space size="large" className="flex items-center">
                        <span className="font-medium text-gray-700">
                            Chào, <span className="text-blue-600 font-bold">{displayName}</span>!
                        </span>
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer bg-blue-500 hover:opacity-80 transition-all shadow-md" />
                        </Dropdown>
                    </Space>
                </Header>

                <Content className="m-6 p-6 rounded-xl shadow-md overflow-auto" style={{ background: colorBgContainer }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;