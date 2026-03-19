import axios from 'axios';
import { ENV } from '../../5th_floor_core/core/config/env.config';

// 1. Axios Instance (Khởi tạo máy bơm)
    const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// 2. Request Interceptor (Can thiệp trước khi gửi request)
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        let currentUser = null;
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                currentUser = userObj.username;
            } catch (e) {
            }
        }
        if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        if (currentUser && config.headers) {
            config.headers['X-Username'] = currentUser;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor (Xử lý response : Bóc tách dữ liệu & Bắt lỗi)
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            switch (response.status) {
                case 401:
                    console.error('Hết hạn Token, yêu cầu đăng nhập lại!');
                    break;
                case 403:
                    console.error('Bạn không có quyền làm thao tác này!');
                    break;
                case 500:
                    console.error('Lỗi server Spring Boot rồi, check lại backend!');
                    break;
                default:
                    console.error(response.data?.message || 'Có lỗi xảy ra!');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;