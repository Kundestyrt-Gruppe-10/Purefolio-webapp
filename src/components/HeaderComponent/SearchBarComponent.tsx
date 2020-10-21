import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg'; // TODO: Fix search bar icon
import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';
import { useHistory } from 'react-router-dom';

// TODO: Clear search bar on redirect to home page

type searchBarProps = {
  onChartPage: boolean;
};

export const SearchBar: React.FC<searchBarProps> = ({
  onChartPage,
}: searchBarProps) => {
  const { setSearchQuery } = useQuery();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(
        (document.getElementById('searchInput') as HTMLInputElement).value,
      );
      history.push(`/results/`);
    } else if (e.key) {
      setDropdownOpen(true);
    }
  };

  const handleMousdownClick = () => {
    setDropdownOpen(false);
  };

  document.addEventListener('mousedown', handleMousdownClick);

  return (
    <>
      <Input
        id="searchInput"
        autoComplete="off"
        onKeyPress={handleKeywordKeyPress}
        placeholder="Search by country or industry"
        active={false}
        onChartPage={onChartPage}
      />
      <DropdownContainer active={dropdownOpen} onChartPage={onChartPage}>
        <ResultRow active={false}>
          <NameBox active={false}>Norway</NameBox>
          <CategoryBox active={false}>Region</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>Netherlands</NameBox>
          <CategoryBox active={false}>Region</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>North Macedonia</NameBox>
          <CategoryBox active={false}>Region</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>N.85 - Health and social work</NameBox>
          <CategoryBox active={false}>NACE</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>N.85.10 - Human health activitie</NameBox>
          <CategoryBox active={false}>NACE</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>N.85.10 - Human health activitie</NameBox>
          <CategoryBox active={false}>NACE</CategoryBox>
        </ResultRow>
      </DropdownContainer>
      <Button
        id="searchButton"
        active={false}
        onChartPage={onChartPage}
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

/*
const styles: CSS.Properties = {
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'green',
};
*/

const DropdownContainer = styled.div<{ active: boolean; onChartPage: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.onChartPage ? '330px' : '400px')};
  min-height: 200px;
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  padding: 20px;
  z-index: 2;
`;

const ResultRow = styled.div<{ active: boolean }>`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const NameBox = styled.div<{ active: boolean }>`
  height: 40px;
  color: var(--main-black-color);
  font-size: 16px;
  font-weight: 500;
  flex-basis: 70%;
  text-align: left;
  text-justify: center;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  height: 40px;
  font-size: 14px;
  color: var(--sec-purple-color);
  flex-basis: 30%;
  text-align: right;
  text-justify: center;
`;

const Input = styled.input<{ active: boolean; onChartPage: boolean }>`
  color: var(--main-black-color);
  font-size: var(--font-size-tiny);
  font-family: Roboto;
  background: var(--main-white-color);
  border: none;
  width: ${(props) => (props.onChartPage ? '350px' : '420px')};
  height: ${(props) => (props.onChartPage ? '15px' : '25px')};
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
  padding: 10px;
  border-radius: 0;
  background-image: 'url(' ${SearchIcon} ')';
`;

const Button = styled.button<{ active: boolean; onChartPage: boolean }>`
  font-family: 'Roboto', sans-serif;
  background: var(--sec-orange-color);
  color: var(--main-black-color);
  border-radius: 0;
  font-size: var(--font-size-tiny);
  padding: 10px;
  margin-left: 6px;
  border: none;
  height: ${(props) => (props.onChartPage ? '35px' : '45px')};
  width: ${(props) => (props.onChartPage ? '124px' : '137px')};
`;
