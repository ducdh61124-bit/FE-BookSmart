import axiosClient from '../axiosClient';
import type { Book, BookPayload } from '../../../5th_floor_core/core/types/book.type';

export const bookApi = {
    // Lấy danh sách toàn bộ sách (nhớ chỉnh lại URL '/books' cho khớp với Controller ở Backend)
    getAll: () => axiosClient.get('/books'),

    // Lấy chi tiết 1 cuốn sách theo ID
    getById: (id: number): Promise<any> => {
        return axiosClient.get(`/books/${id}`);
    },

    // Thêm sách mới (Gửi BookPayload lên)
    create: (data: any) => axiosClient.post('/books', data),

    // Sửa sách (Cần ID và Data mới)
    update: (id: number, data: any) => axiosClient.put(`/books/${id}`, data),

    // Xóa sách
    delete: (id: number) => axiosClient.delete(`/books/${id}`),
};