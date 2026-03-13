import React, { useState, useEffect } from 'react';
import { UserOutlined, BookOutlined, SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown, Typography, theme, message, Button, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../3rd_floor_stateManagement/store/authStore';
import { authService } from '../../2nd_floor_professionalSkill/services/authService';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

// Khai báo component MainLayout
const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const { token: { colorBgContainer } } = theme.useToken();

    // 1. Hàm xử lý đăng xuất
    const handleLogout = () => {
        authService.logout();
        logout();
        message.success('Đăng xuất thành công!');
        navigate('/login');
    };

    // 2. Hàm xử lý Menu sidebar
    const menuItems = [
        {
            key: '/books',
            icon: <BookOutlined />,
            label: 'Quản lý Kho Sách',
            onClick: () => navigate('/books'),
        },
    ];

    // 3. Hàm xử lý menu dropdown của user
    const userMenuItems = [
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt tài khoản'
        },
        {
            type: 'divider' as const
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            danger: true,
            onClick: handleLogout
        },
    ];

    // 4. Lấy tên user hiển thị
    const displayName = (user as any)?.user?.name || user?.name || (user as any)?.user?.username || 'Người dùng';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={350}>
                <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                    {!collapsed && <span style={{ marginLeft: 12, fontWeight: 'bold', fontSize: 18 }}>SMARTBOOKL</span>}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 24px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)'
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />

                    <Title level={4} style={{ margin: 0 }}>HỆ THỐNG QUẢN LÝ KHO SÁCH</Title>

                    <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: '500', color: '#262626' }}>
                            Chào, <span style={{ color: '#1890ff' }}>{displayName}</span>!
                        </span>
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: '#1890ff' }} />
                        </Dropdown>
                    </Space>
                </Header>

                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: 8,
                    minHeight: 280,
                    overflow: 'initial'
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;