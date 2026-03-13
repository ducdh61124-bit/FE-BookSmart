import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../3rd_floor_stateManagement/store/authStore';

// Layout dành cho các trang Authentication (login, register...)
const AuthLayout: React.FC = () => {

    // 1. Lấy trạng thái đăng nhập từ global store (Zustand)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // 2. Nếu user đã đăng nhập → chuyển hướng sang trang /books
    if (isAuthenticated) {
        return <Navigate to="/books" replace />;
    }

    // 3. Nếu chưa đăng nhập → hiển thị layout cho trang auth
    return (
        <div className="min-h-screen w-full bg-slate-50">
            <Outlet />
        </div>
    );
};

export default AuthLayout;