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

    // Xử lý logic Quên mật khẩu
    forgotPassword: async (email: string) => {
        try {
            const response: any = await authApi.forgotPassword(email);
            return response.data?.message || "Gửi OTP thành công";
        } catch (error: any) {
            throw new Error(error.response?.data || "Lỗi gửi mail");
        }
    },

    // Đặt lại mật khẩu
    resetPassword: async (payload: any) => {
        try {
            const response: any = await authApi.resetPassword(payload);
            return response.data?.message || "Đổi mật khẩu thành công!";
        } catch (error: any) {
            const errorMsg = error.response?.data || "Mã OTP không đúng!";
            throw new Error(errorMsg);
        }
    }
};