import { Category } from '@/config/categories.tsx';

export type CategoryType = {
    id: Category;
    name: string;
};

export type ProjectType = {
    category: Category;
    name: string;
    url: string | null;
    icon: string | null;
};
