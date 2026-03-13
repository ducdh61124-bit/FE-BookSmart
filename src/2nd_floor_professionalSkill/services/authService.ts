import { authApi } from '../../1st_floor_dataAccess/api/endpoints/auth.api';
import type { LoginRequest, LoginResponse } from '../../5th_floor_core/core/types/auth.type';
import type { User } from '../../5th_floor_core/core/types/user.type';

export const authService = {
    // Xử lý logic Đăng nhập
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            const response: any = await authApi.login(credentials);
            return {
                accessToken: "fake-jwt-token",
                user: response.data
            };
        } catch (error: any) {
            const errorMsg = error.response?.data || 'Đăng nhập thất bại';
            throw new Error(errorMsg);
        }
    },

    // Xử lý logic Đăng ký
    register: async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
        try {
            const response = await authApi.register(userData);
            return response.data;
        } catch (error: any) {
            const errorMsg = error.response?.data || 'Đăng ký không thành công';
            throw new Error(errorMsg);
        }
    },

    // Xử lý logic Đăng xuất (Chỉ xóa Token ở Frontend)
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
    },

    // Xử lý logic Quên mật khẩu (Chỉ xóa Token ở Frontend)
    forgotPassword: async (email: string) => {
        return await axiosClient.post('/users/forgot-password', { email });
    },

    // Gọi API Xác nhận OTP & Đổi mật khẩu
    resetPassword: async (payload: { email: string, otp: string, newPassword: string }) => {
        const response = await axiosClient.post('/users/reset-password', payload);
        return response.data;
    }
};