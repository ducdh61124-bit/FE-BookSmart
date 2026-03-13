import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setBooks, setLoading } from '../redux/slices/bookSlice';
import { bookService } from '../../2nd_floor_professionalSkill/services/bookService';

export const useBooks = () => {
    const dispatch = useAppDispatch();
    const { books, loading } = useAppSelector((state) => state.book);

    const fetchBooks = async () => {
        dispatch(setLoading(true));
        try {
            const data = await bookService.getAll();
            dispatch(setBooks(data));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { books, loading, fetchBooks };
};