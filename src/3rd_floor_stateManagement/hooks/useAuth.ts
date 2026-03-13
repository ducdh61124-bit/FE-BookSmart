import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/slices/authSlice';
import { authService } from '../../2nd_floor_professionalSkill/services/authService';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const loginUser = async (values: any) => {
        setLoading(true);
        try {
            const response = await authService.login(values);
            console.log("Dữ liệu thực tế từ Backend:", response);
            const token = response?.token || response?.data?.token || response?.accessToken;
            const userData = response?.user || response?.data?.user || response;

            if (token) {
                dispatch(setCredentials({ user: userData }));
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi API:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loginUser, loading };
};