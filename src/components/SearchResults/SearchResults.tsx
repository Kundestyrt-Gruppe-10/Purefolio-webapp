import React, { useContext } from 'react';
import Fuse from 'fuse.js';
import { GlobalContext, useQuery } from '../GlobalProvider/GlobalProvider';

const data = [
  { id: 1, country: 'Norway' },
  { id: 2, country: 'Sweden' },
  { id: 3, country: 'Denmark' },
  { id: 4, country: 'Finland' },
];

export const SearchResults: React.FC = () => {
  const fuse = new Fuse(data, {
    keys: ['country'],
  });
  const { searchQuery, setSearchQuery } = useQuery();
  //const {searchProvider} = useContext(GlobalContext);
  const results = fuse.search(searchQuery);
  console.log(results);
  return (
    <>
      <ul>
        {results.map((result, i) => {
          return <li key={result.item.id}>{result.item.country}</li>;
        })}
      </ul>
    </>
  );
};
