import axiosClient from '../axiosClient';
import type { Category } from '../../5th_floor_core/core/types/category.type';

export const categoryApi = {
    getAll: () => axiosClient.get<Category[]>('/categories'),
    add: (data: Omit<Category, 'id'>) => axiosClient.post<string>('/categories', data),
    update: (id: number, data: Partial<Category>) => axiosClient.put<string>(`/categories/${id}`, data),
    delete: (id: number) => axiosClient.delete<void>(`/categories/${id}`)
}
