import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg'; // TODO: Fix search bar icon
import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';
import { useHistory } from 'react-router-dom';

export const EsgFactorDropdown: React.FC = () => {
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
      <Title active={false}>ESG factor</Title>
      <Input
        id="searchInput"
        autoComplete="off"
        onKeyPress={handleKeywordKeyPress}
        placeholder="Choose factor..."
        active={false}
        onClick={() => setDropdownOpen(true)}
      />
      <DropdownContainer active={dropdownOpen}>
        <ResultRow active={false}>
          <NameBox active={false}>Air emission accounts</NameBox>
          <CategoryBox active={false}>Environment</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>Non-fatal accidents at work</NameBox>
          <CategoryBox active={false}>Social</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>Gender pay gap in unadjusted form</NameBox>
          <CategoryBox active={false}>Government</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>
            Environmental taxes by economic activity
          </NameBox>
          <CategoryBox active={false}>Environment</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>Fatal accidents at work</NameBox>
          <CategoryBox active={false}>Social</CategoryBox>
        </ResultRow>
        <ResultRow active={false}>
          <NameBox active={false}>Non-fatal accidents at work</NameBox>
          <CategoryBox active={false}>Social</CategoryBox>
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
  top: 10px;
`;

const Input = styled.input<{ active: boolean }>`
  color: var(--main-black-color);
  font-size: var(--font-size-tiny);
  font-family: Roboto;
  background: var(--main-white-color);
  border: none;
  width: 330px;
  padding: 14px;
  border-radius: 0;
  background-image: 'url(' ${SearchIcon} ')';
`;

const DropdownContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  width: 318px;
  min-height: 200px;
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  padding: 20px;
  z-index: 3;
  border-top: 1px solid var(--main-black-color);
`;

const ResultRow = styled.div<{ active: boolean }>`
  display: flex;
  width: 100%;
  height: 35px;
  flex-direction: row;
  justify-content: space-between;
`;

const NameBox = styled.div<{ active: boolean }>`
  color: var(--main-black-color);
  font-size: 14px;
  font-weight: 500;
  flex-basis: 80%;
  text-align: left;
  text-justify: center;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  font-size: 10px;
  color: var(--sec-purple-color);
  flex-basis: 20%;
  text-align: right;
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
