import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg'; // TODO: Fix search bar icon
import { useQuery } from '../GlobalProvider/GlobalProvider';
import { Button } from '../Button';

//TODO: Only update search results on enter key

export const SearchBar: React.FC = () => {
  //const {searchProvider} = useContext(GlobalContext);
  const { setSearchQuery } = useQuery();

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(
        (document.getElementById('searchInput') as HTMLInputElement).value,
      );
    }
  };

  return (
    <>
      <Input
        id="searchInput"
        onKeyPress={handleKeywordKeyPress}
        placeholder="Search by country or industry"
        active={false}
      />
      <Button
        id="searchButton"
        active={false}
        onClick={() =>
          setSearchQuery(
            (document.getElementById('searchInput') as HTMLInputElement).value,
          )
        }
      >
        Search
      </Button>
    </>
  );
};

const Input = styled.input<{ active: boolean }>`
  color: var(--main-black-color);
  font-size: var(--font-size-tiny);
  font-family: Roboto;
  background: var(--main-white-color);
  border: none;
  width: 300px;
  margin: 0 0 0 30px;
  padding: 10px;
  border-radius: 0;
  background-image: 'url(' ${SearchIcon} ')';
`;
