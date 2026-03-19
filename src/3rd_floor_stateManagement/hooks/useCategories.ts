import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCategories } from '../redux/slices/categorySlice';
import { categoryService } from '../../2nd_floor_professionalSkill/services/categoryService';

export const useCategories = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.category);

    const fetchCategories = async () => {
        const data = await categoryService.getAllCategories();
        dispatch(setCategories(data));
    };

    return { categories, fetchCategories };
};