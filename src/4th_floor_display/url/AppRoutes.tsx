import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../3rd_floor_stateManagement/redux/hooks';

import AuthLayout from '../../4th_floor_display/layouts/AuthLayout';
import MainLayout from '../../4th_floor_display/layouts/MainLayout';
import AuthPage from '../../4th_floor_display/pages/auth/AuthPage';
import RegisterPage from '../../4th_floor_display/pages/auth/RegisterPage';
import ForgotPasswordPage from '../../4th_floor_display/pages/auth/ForgotPasswordPage';
import BookPage from '../../4th_floor_display/pages/books/BookPage';
import CategoryPage from '../../4th_floor_display/pages/category/CategoryPage';
import UserPage from '../../4th_floor_display/pages/user/UserPage';
import HistoryPage from '../../4th_floor_display/pages/history/HistoryPage';

// HÀM BẢO VỆ ROUTE: Nếu chưa login thì đá văng ra /login
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    // Nếu không có token hoặc chưa login, bắt về login ngay
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* NHÓM 1: Các trang dành cho khách (chưa login) */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* NHÓM 2: Các trang yêu cầu Đăng nhập (Dùng MainLayout) */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                {/* Vào / thì tự động nhảy sang /books */}
                <Route index element={<Navigate to="/books" replace />} />
                <Route path="books" element={<BookPage />} />
                <Route path="categories" element={<CategoryPage />} />
                <Route path="users" element={<UserPage />} />
                <Route path="history" element={<HistoryPage />} />
            </Route>

            {/* Bắt link sai: Quay về trang chủ */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;