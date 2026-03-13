import axiosClient from '../../1st_floor_dataAccess/api/axiosClient';
import { Category } from '../../5th_floor_core/core/types/category.type';

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        const response = await axiosClient.get('/categories');
        return response.data;
    }
};