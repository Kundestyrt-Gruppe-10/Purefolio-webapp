import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg'; // TODO: Fix search bar icon
import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';
import { Button } from '../Button';
import { useHistory } from 'react-router-dom';

// TODO: Clear search bar on redirect to home page

export const SearchBar: React.FC = () => {
  const { setSearchQuery } = useQuery();
  const history = useHistory();

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(
        (document.getElementById('searchInput') as HTMLInputElement).value,
      );
      history.push(`/results/`);
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
        onClick={() => {
          setSearchQuery(
            (document.getElementById('searchInput') as HTMLInputElement).value,
          );
          history.push(`/results/`);
        }}
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
