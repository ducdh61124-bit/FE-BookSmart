import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../5th_floor_core/core/types/category.type';

interface CategoryState {
    categories: Category[];
    loading: boolean;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
            state.loading = false;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.unshift(action.payload);
        },

        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },

        deleteCategory: (state, action: PayloadAction<number>) => {
            state.categories = state.categories.filter(c => c.id !== action.payload);
        },
    },
});

export const { setCategories, setLoading, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;