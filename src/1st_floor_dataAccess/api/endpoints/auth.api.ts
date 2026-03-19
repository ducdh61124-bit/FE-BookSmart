import axiosClient from '../axiosClient';
import type { LoginRequest } from '../../../5th_floor_core/core/types/auth.type';
import type { User } from '../../../5th_floor_core/core/types/user.type';

export const authApi = {
    // Đăng nhập
    login: (data: LoginRequest) => {
        return axiosClient.post('/users/login', data);
    },

    // Đăng ký (Tạo tài khoản nhân viên mới)
    register: (data: Omit<User, 'id'> & { password: string }) => {
        return axiosClient.post('/users/register', data);
    },

    // Quên mật khẩu (Gửi email lên để lấy lại pass)
    forgotPassword: (email: string) => {
        return axiosClient.post('/users/forgot-password', { email });
    },

    // Gửi OTP và mật khẩu mới
    resetPassword: (payload: any) => {
        return axiosClient.post('/users/reset-password', payload);
    }
}