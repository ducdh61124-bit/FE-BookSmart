import type { Category } from './category.type';

export type Book = {
    id: number;
    title: string;
    author: string;
    image?: string;
    price: number;
    stock: number;
    category: Category;
}

export interface BookPayload {
    title: string;
    author: string;
    image?: string;
    price: number;
    stock: number;

    category: {
        id: number;
    };
}