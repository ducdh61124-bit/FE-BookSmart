import { useState, useCallback } from 'react';
import { categoryService } from '../../2nd_floor_professionalSkill/services/category.service';
import { Category } from '../../5th_floor_core/core/types/category.type';

export const useCategories = () => {
    // Kho chứa dữ liệu nội bộ của Hook
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // Hàm lấy danh sách sách
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Lỗi lấy danh mục", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { categories, loading, fetchCategories };
};