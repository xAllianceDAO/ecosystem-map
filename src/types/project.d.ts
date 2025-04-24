export interface CategoryType {
    id: string;
    name: string;
}

export interface ProjectType {
    category: string;
    name: string;
    url: string | null;
    icon: string | null;
    description?: string;
}
