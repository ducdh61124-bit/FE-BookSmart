import { userApi } from '../../1st_floor_dataAccess/api/endpoints/user.api';
import type { User } from '../../../5th_floor_core/core/types/user.type';

export const userService = {
    getAllUsers: async (): Promise<User[]> => {
        const res = await userApi.getAll();
        return res as any;
    },
    getUserById: async (id: number): Promise<User> => {
        const res = await userApi.getById(id);
        return res.data;
    },
    createUser: async (userData: User): Promise<User> => {
        const res = await userApi.create(userData);
        return res.data;
    },
    updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
        const res = await userApi.update(id, userData);
        return res.data;
    },
    deleteUser: async (id: number): Promise<void> => {
        await userApi.delete(id);
    }
};