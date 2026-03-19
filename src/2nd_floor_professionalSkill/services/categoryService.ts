import { categoryApi } from '../../1st_floor_dataAccess/api/endpoints/category.api';
import type { Category } from '../../../5th_floor_core/core/types/category.type';

export const categoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const res = await categoryApi.getAll();
        return res as any;
    },
    addCategory: async (categoryData: Omit<Category, 'id'>): Promise<string> => {
        const res = await categoryApi.add(categoryData);
        return res.data;
    },
    updateCategory: async (id: number, categoryData: Partial<Category>): Promise<string> => {
        const res = await categoryApi.update(id, categoryData);
        return res.data;
    },
    deleteCategory: async (id: number): Promise<void> => {
        await categoryApi.delete(id);
    }
};