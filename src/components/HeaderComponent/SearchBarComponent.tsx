import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
//import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';
//import { useHistory } from 'react-router-dom';

type Props = {
  onChartPage: boolean;
  naceRegionList: string[];
};

export const SearchBar: React.FC<Props> = (props) => {
  //const { setSearchQuery } = useQuery();
  //const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenNaceRegion, setChosenNaceRegion] = useState<string>(
    'Choose Region or Industry...',
  );
  const [userInput, setUserInput] = useState<string>('');

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (props.naceRegionList.includes(userInput)) {
        setChosenNaceRegion(userInput);
        setDropdownOpen(false);
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setUserInput(inputValue);
  };

  const handleMousdownClick = () => {
    setDropdownOpen(false);
    setUserInput('');
  };

  document.addEventListener('mouseup', handleMousdownClick);

  return (
    <>
      <Input
        id={'searchBar'}
        autoComplete="off"
        placeholder="Search by country or industry"
        value={dropdownOpen ? userInput : chosenNaceRegion}
        active={dropdownOpen}
        onChartPage={props.onChartPage}
        onClick={() => setDropdownOpen(true)}
        onChange={handleUserInput}
        onKeyPress={handleKeywordKeyPress}
      />
      <DropdownContainer active={dropdownOpen} onChartPage={props.onChartPage}>
        {props.naceRegionList
          .filter((naceRegion) => naceRegion.includes(userInput))
          .map((naceRegionString: string, i: number) => (
            <ResultRow
              key={i}
              id={naceRegionString}
              active={naceRegionString === chosenNaceRegion ? true : false}
              onClick={() => {
                setChosenNaceRegion(naceRegionString);
                setUserInput(naceRegionString);
              }}
            >
              <NameBox
                active={naceRegionString === chosenNaceRegion ? true : false}
              >
                {naceRegionString}
              </NameBox>
              <CategoryBox
                active={naceRegionString === chosenNaceRegion ? true : false}
              >
                Environment
              </CategoryBox>
            </ResultRow>
          ))}
      </DropdownContainer>
      <Button
        id="searchButton"
        active={false}
        onChartPage={props.onChartPage}
        /*onClick={() => {
          setSearchQuery(
            (document.getElementById('searchInput') as HTMLInputElement).value,
          );
          history.push(`/results/`);
        }}*/
      >
        Search
      </Button>
    </>
  );
};
const Input = styled.input<{ active: boolean; onChartPage: boolean }>`
  font-size: var(--font-size-tiny);
  font-family: Roboto;
  font-weight: 700;
  background: ${(props) =>
    props.active ? 'var(--main-white-color)' : 'transparent'};
  border: ${(props) =>
    props.active ? 'none' : '1px solid var(--main-white-color)'};
  color: ${(props) =>
    props.active ? 'var(--main-black-color)' : 'var(--main-white-color)'};
  padding: 14px;
  border-radius: 0;
  width: ${(props) => (props.onChartPage ? '350px' : '420px')};
  padding: ${(props) => (props.onChartPage ? '10px' : '14px')};
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
  text-align: center;
`;

const Button = styled.button<{ active: boolean; onChartPage: boolean }>`
  font-family: 'Roboto', sans-serif;
  background: var(--sec-orange-color);
  color: var(--main-black-color);
  border-radius: 0;
  font-size: var(--font-size-tiny);
  padding: ${(props) => (props.onChartPage ? '10px' : '14px')};
  margin-left: 6px;
  border: 1px solid var(--sec-orange-color);
  width: ${(props) => (props.onChartPage ? '114px' : '137px')};
`;

const DropdownContainer = styled.div<{ active: boolean; onChartPage: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.onChartPage ? '330px' : '400px')};
  min-height: 200px;
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-top: 1px solid var(--main-black-color);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  padding: ${(props) => (props.onChartPage ? '20px' : '24px')};
  z-index: 3;
`;

const ResultRow = styled.div<{ active: boolean }>`
  padding: 0px 20px 0px 20px;
  display: flex;
  height: 35px;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  min-height: 35px;
  border: ${(props) =>
    props.active ? '2px solid var(--sec-purple-color)' : 'none'};
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  background-color: ${(props) =>
    props.active ? 'rgba(206, 216, 244, 0.7);' : 'var(--main-white-color)'};
`;

const NameBox = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  font-size: 14px;
  font-weight: 500;
  flex-basis: 80%;
  text-align: left;
  align-self: center;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  font-size: 10px;
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--sec-purple-color)'};
  flex-basis: 20%;
  text-align: right;
  align-self: center;
`;
