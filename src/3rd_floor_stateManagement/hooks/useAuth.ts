import { useState } from 'react';
import { authService } from '../../2nd_floor_professionalSkill/services/authService';
import type { LoginRequest } from '../../5th_floor_core/core/types/auth.type';
import type { User } from '../../5th_floor_core/core/types/user.type';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
    // Lấy thông tin user từ localStorage nếu đã đăng nhập từ trước
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const setAuth = useAuthStore((state) => state.setAuth);
    const logoutFromStore = useAuthStore((state) => state.logout);

    // Xử lý Đăng nhập
    const loginUser = async (credentials: LoginRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response: any = await authService.login(credentials);
            const userData = response.data || response;
            const token = response.accessToken || 'dummy-token';

            if (userData) {
                setAuth(userData, token);
                console.log("Đăng nhập thành công, User:", userData.name);
                return true;
            }
            return false;
        } catch (err: any) {
            setError(err.message || 'Tài khoản hoặc mật khẩu không đúng!');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Xử lý Đăng ký nhân viên mới
    const registerUser = async (userData: Omit<User, 'id' | 'isActive'>) => {
        setLoading(true);
        setError(null);
        try {
            await authService.register(userData);
            return true;
        } catch (err: any) {
            setError(err.message || 'Đăng ký thất bại!');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Xử lý Đăng xuất
    const logoutUser = () => {
        logoutFromStore();
    };

    return {
        loading,
        error,
        loginUser,
        registerUser,
        logoutUser,
    };
};