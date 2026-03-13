import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    books: [],
    loading: false,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Thêm các reducers cho Add, Edit, Delete nếu cần
    },
});

export const { setBooks, setLoading } = bookSlice.actions;
export default bookSlice.reducer;