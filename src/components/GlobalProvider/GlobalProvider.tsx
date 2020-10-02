import React, { useState, createContext, ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
}

export interface QueryProviderProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const GlobalContext = createContext<QueryProviderProps>({
  searchQuery: '',
  /*eslint-disable */
  setSearchQuery: () => {}, //suppress all warnings between comments, allowing empty arrow function 
  /*eslint-enable */
});

export const GlobalProvider = ({ children }: Props): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchProvider: QueryProviderProps = {
    searchQuery,
    setSearchQuery,
  };

  /*const searchProvider = useMemo(() => ({
        searchQuery,setSearchQuery}),[searchQuery,setSearchQuery]);*/

  return (
    <GlobalContext.Provider value={searchProvider}>
      {' '}
      {children}{' '}
    </GlobalContext.Provider>
  );
};

export const useQuery = () => useContext(GlobalContext);
