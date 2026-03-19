import { useAppDispatch, useAppSelector } from '../hooks'; // Giả định ông giáo đã định nghĩa hooks.ts
import { userService } from '../../../../2nd_floor_professionalSkill/services/userService';
import { setLoading, setUsers, addUser, updateUserInState, removeUserFromState, setError } from '../slices/userSlice';
import type { User } from '../../../../5th_floor_core/core/types/user.type';
import { message } from 'antd';

export const useUser = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.user);

    // Hàm lấy toàn bộ danh sách
    const fetchAllUsers = async () => {
        dispatch(setLoading(true));
        try {
            const data = await userService.getAllUsers();
            dispatch(setUsers(data));
        } catch (err: any) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Hàm thêm người dùng
    const createNewUser = async (data: User) => {
        try {
            const newUser = await userService.createUser(data);
            dispatch(addUser(newUser));
            message.success("Thêm thành viên thành công!");
            return true;
        } catch (err) {
            message.error("Lỗi khi thêm thành viên!");
            return false;
        }
    };

    // Hàm cập nhật
    const updateExistingUser = async (id: number, data: Partial<User>) => {
        try {
            const updated = await userService.updateUser(id, data);
            dispatch(updateUserInState(updated));
            message.success("Cập nhật thành công!");
            return true;
        } catch (err) {
            message.error("Lỗi khi cập nhật!");
            return false;
        }
    };

    // Hàm xóa
    const deleteUser = async (id: number) => {
        try {
            await userService.deleteUser(id);
            dispatch(removeUserFromState(id));
            message.success("Đã xóa người dùng!");
        } catch (err) {
            message.error("Không thể xóa người dùng này!");
        }
    };

    return {
        users,
        loading,
        error,
        fetchAllUsers,
        createNewUser,
        updateExistingUser,
        deleteUser
    };
};