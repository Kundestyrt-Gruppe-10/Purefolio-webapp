import React, { useContext } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg'; // TODO: Fix search bar icon
import { GlobalContext, useQuery } from '../GlobalProvider/GlobalProvider';
import { Button } from '../Button';

//TODO: Only update search results on enter key

export const SearchBar: React.FC = () => {
  //const {searchProvider} = useContext(GlobalContext);
  const { searchQuery, setSearchQuery } = useQuery();
  return (
    <>
      <Input
        id="searchInput"
        onKeyUp={() =>
          setSearchQuery(
            (document.getElementById('searchInput') as HTMLInputElement).value,
          )
        }
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
