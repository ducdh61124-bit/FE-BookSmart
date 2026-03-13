import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../../5th_floor_core/core/types/user.type';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

// 1. Hàm lấy User từ localStorage
const getUserFromStorage = (): User | null => {
    const storedUser = localStorage.getItem('currentUser');
    try {
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
        return null;
    }
};

// 2️. Tạo Auth Store bằng Zustand
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,

            // 3. Hàm setAuth (dùng sau khi login thành công)
            setAuth: (user, token) => set({
                user: user,
                accessToken: token,
                isAuthenticated: true
            }),

            // 4️. Hàm logout (đăng xuất)
            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false
                });
                localStorage.removeItem('auth-storage');
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);