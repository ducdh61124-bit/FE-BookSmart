import axiosClient from '../axiosClient';
import type { User } from '../../../../5th_floor_core/core/types/user.type';

export const userApi = {
    getAll: () => axiosClient.get<User[]>('/users'),
    getById: (id: number) => axiosClient.get<User>(`/users/${id}`),
    create: (data: User) => axiosClient.post<User>('/users', data),
    update: (id: number, data: Partial<User>) => axiosClient.put<User>(`/users/${id}`, data),
    delete: (id: number) => axiosClient.delete<void>(`/users/${id}`)
};