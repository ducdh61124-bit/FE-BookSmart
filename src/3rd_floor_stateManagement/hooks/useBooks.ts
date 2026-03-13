import { useState, useCallback } from 'react';
import { bookService } from '../../2nd_floor_professionalSkill/services/bookService';
import type { Book, BookPayload } from '../../5th_floor_core/core/types/book.type';

export const useBooks = () => {
    // Kho chứa dữ liệu nội bộ của Hook
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Hàm lấy danh sách sách
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (err: any) {
            setError(err.message || 'Lỗi khi tải danh sách sách');
        } finally {
            setLoading(false);
        }
    }, []);

    // Hàm thêm sách mới
    const addBook = async (payload: BookPayload) => {
        setLoading(true);
        setError(null);
        try {
            const newBook = await bookService.createBook(payload);
            setBooks((prev) => [...prev, newBook]);
            return true;
        } catch (err: any) {
            setError(err.message || 'Lỗi khi thêm sách');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Hàm sửa sách
    const editBook = async (id: number, payload: BookPayload) => {
        setLoading(true);
        setError(null);
        try {
            const updatedBook = await bookService.updateBook(id, payload);
            setBooks((prev) => prev.map((book) => (book.id === id ? updatedBook : book)));
            return true;
        } catch (err: any) {
            setError(err.message || 'Lỗi khi cập nhật sách');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Hàm xóa sách
    const removeBook = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await bookService.deleteBook(id);
            setBooks((prev) => prev.filter((book) => book.id !== id));
            return true;
        } catch (err: any) {
            setError(err.message || 'Lỗi khi xóa sách');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Xuất kho những thứ UI cần dùng
    return {
        books,
        loading,
        error,
        fetchBooks,
        addBook,
        editBook,
        removeBook,
    };
};