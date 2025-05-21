import { Category } from '@/config/categories.tsx';

export interface CategoryType {
    id: Category;
    name: string;
}

export interface ProjectType {
    category: Category;
    name: string;
    url: string | null;
    icon: string | null;
}
