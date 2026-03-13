import type { Book } from './book.type';

export interface Category {
  id: number;
  name: string;
  description?: string;
  status: boolean;
  books?: Book[];
}