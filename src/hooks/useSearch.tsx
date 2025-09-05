import SearchContext from '@/contexts/SearchContext.tsx';
import { useContext } from 'react';

export const useSearch = () => {
    return useContext(SearchContext);
};
