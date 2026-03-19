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
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.unshift(action.payload);
        },
        updateBook: (state, action: PayloadAction<Book>) => {
            const index = state.books.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        deleteBook: (state, action: PayloadAction<number | string>) => {
            state.books = state.books.filter(b => b.id !== action.payload);
        },
    },
});

export const { setBooks, setLoading } = bookSlice.actions;
export default bookSlice.reducer;