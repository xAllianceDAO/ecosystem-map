import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

type SearchContextType = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType>({
    search: '',
    setSearch: () => null,
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider
            value={{
                search,
                setSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;
