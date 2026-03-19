import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../../../5th_floor_core/core/types/user.type';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
        },

        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },

        updateUserInState: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(u => u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },

        removeUserFromState: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(u => u.id !== action.payload);
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
});

export const {
    setLoading,
    setUsers,
    addUser,
    updateUserInState,
    removeUserFromState,
    setError
} = userSlice.actions;

export default userSlice.reducer;