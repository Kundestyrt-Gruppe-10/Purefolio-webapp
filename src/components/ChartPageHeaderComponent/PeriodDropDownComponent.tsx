import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg'; // TODO: Fix search bar icon
import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';
import { useHistory } from 'react-router-dom';

export const PeriodDropdown: React.FC = () => {
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
      <Title active={false}>Period Start:</Title>
      <Input
        id="searchInput"
        autoComplete="off"
        onKeyPress={handleKeywordKeyPress}
        placeholder="2014"
        active={false}
        onClick={() => setDropdownOpen(true)}
      />
      <DropdownContainer active={dropdownOpen}>
        <ResultRow active={false}>
          <NameBox active={false}>2018</NameBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>2017</NameBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>2016</NameBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>2015</NameBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>2014</NameBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>2013</NameBox>
        </ResultRow>
      </DropdownContainer>
    </>
  );
};
const Title = styled.div<{ active: boolean }>`
  color: var(--third-bluegrey-color);
  font-size: var(--font-size-tiny);
  font-weight: 700;
  font-family: Roboto;
  position: absolute;
  top: 5px;
`;

const Input = styled.input<{ active: boolean }>`
  color: var(--main-black-color);
  font-size: var(--font-size-tiny);
  font-family: Roboto;
  background: var(--main-white-color);
  border: none;
  padding: 14px;
  border-radius: 0;
  width: 40px;
  text-align: center;
`;

const DropdownContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  padding: 18.3px;
  z-index: 3;
  border-top: 1px solid var(--main-black-color);
`;

const ResultRow = styled.div<{ active: boolean }>`
  width: 100%;
  height: 35px;
`;

const NameBox = styled.div<{ active: boolean }>`
  color: var(--main-black-color);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-justify: center;
`;

// TODO: Unused, remove??
/*
const Button = styled.button<{ active: boolean }>`
  font-family: 'Roboto', sans-serif;
  background: var(--sec-orange-color);
  color: var(--main-black-color);
  border-radius: 0;
  font-size: var(--font-size-tiny);
  margin-left: 6px;
  border: none;
  width: 120px;
  padding: 10px;
`;
*/
