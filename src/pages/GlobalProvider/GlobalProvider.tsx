import React, { useState, createContext, ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
}

export interface QueryProviderProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  regionCodes: Array<number>;
  setRegionCodes: (regionCode: Array<number>) => void;
}

/*export interface RegionProviderProps{
  regionCode: string;
  setRegionCode: (regionCode: string) => void;
}*/

export const GlobalContext = createContext<QueryProviderProps>({
  searchQuery: '',
  /*eslint-disable */
  setSearchQuery: () => {}, //suppress all warnings between comments, allowing empty arrow function 
  regionCodes: [],
  setRegionCodes:() => {},
  /*eslint-enable */
});

export const GlobalProvider = ({ children }: Props): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regionCodes, setRegionCodes] = useState<Array<number>>([]);

  const searchProvider: QueryProviderProps = {
    searchQuery,
    setSearchQuery,
    regionCodes,
    setRegionCodes,
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
/*eslint-disable */
export const useQuery = () => useContext(GlobalContext);
/*eslint-enable */
