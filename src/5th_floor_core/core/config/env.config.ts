import { API_BASE_URL } from '../constants/app.constant';

export const ENV = {
    // Ưu tiên lấy biến môi trường từ file .env của Vite, nếu không có thì lấy link localhost mặc định
    API_URL: import.meta.env.VITE_API_BASE_URL || API_BASE_URL,

    // Kiểm tra xem có phải đang chạy trên môi trường dev không
    IS_DEV: import.meta.env.DEV,
};