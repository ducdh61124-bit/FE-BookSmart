import { bookApi } from '../../1st_floor_dataAccess/api/endpoints/book.api'
import type { Book, BookPayload } from '../../5th_floor_core/core/types/book.type'

export const bookService = {
    // 1. Lấy danh sách sách
    getAllBooks: async (): Promise<Book[]> => {
        try {
            const response: any = await bookApi.getAll();
            console.log("Data gốc từ API:", response);
            const finalData = Array.isArray(response) ? response : (response?.data || []);
            return finalData;
        } catch (error: any) {
            console.error("Lỗi tại Service:", error);
            throw new Error('Không thể lấy danh sách sách');
        }
    },

    // 2. Thêm sách mới
    addBook: async (data: any): Promise<void> => {
        try {
            await bookApi.create(data);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Không thể thêm sách mới');
        }
    },

    // 3. Sửa thông tin sách
    editBook: async (id: number, data: any): Promise<void> => {
        try {
            await bookApi.update(id, data);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Không thể cập nhật sách');
        }
    },

    // 4. Xóa sách
    removeBook: async (id: number): Promise<void> => {
        try {
            await bookApi.delete(id);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Không thể xóa sách');
        }
    }
};