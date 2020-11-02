import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { Nace, Region } from '../../types';
import {
  naceRegionIdStringToList,
  naceRegionIdListToString,
} from '../../pages/ChartPage/helper-functions';
import { Dropdown } from './Dropdown';

type Props = {
  onChartPage: boolean;
  naceList: Nace[];
  regionList: Region[];
  urlParams: UrlParamsInterface;
};

export const SearchBar: React.FC<Props> = (props) => {
  const [inputHighlight, setInputHighlight] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenNaceRegion, setChosenNaceRegion] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const naceRegionStringList = props.naceList
    .map((nace) => nace.naceName)
    .concat(props.regionList.map((region) => region.regionName));

  // TODO: How does this work?
  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    setDropdownOpen(true);
    if (e.key === 'Enter') {
      if (naceRegionStringList.includes(userInput)) {
        setChosenNaceRegion(userInput);
        setDropdownOpen(false);
        redirectToPage(userInput);
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setUserInput(inputValue);
  };

  const handleMousdownClick = () => {
    setInputHighlight(false);
    setDropdownOpen(false);
    setUserInput('');
  };

  document.addEventListener('mouseup', handleMousdownClick);

  const findNace = (naceName: string) => {
    return props.naceList.find((nace) => nace.naceName === naceName);
  };
  const findRegion = (regionName: string) => {
    return props.regionList.find((region) => region.regionName === regionName);
  };
  const redirectToPage = (naceRegionString: string): void => {
    if (findNace(naceRegionString)) {
      const nace = findNace(naceRegionString);
      props.urlParams.setUrlParams(
        naceRegionIdListToString(
          naceRegionIdStringToList(
            // Lol, fuck this line in perticular: DON'T LOOK AT ME, I'M SO UGLY
            '1,' + (nace ? nace.naceId.toString() : '1'),
          ),
        ),
        props.urlParams.esgFactor,
        props.urlParams.chosenTab,
      );
    } else if (findRegion(naceRegionString)) {
      const region = findRegion(naceRegionString);
      props.urlParams.setUrlParams(
        naceRegionIdListToString(
          naceRegionIdStringToList(
            // Lol, fuck this line in perticular: DON'T LOOK AT ME, I'M SO UGLY
            (region ? region.regionId.toString() : '1') + ',1',
          ),
        ),
        props.urlParams.esgFactor,
        props.urlParams.chosenTab,
      );
    } else {
      console.log(
        `Could not match name: ${naceRegionString} with either a nace or a region`,
      );
    }
  };

  return (
    <>
      <Input
        id={'searchBar'}
        autoComplete="off"
        placeholder="Search by country or industry"
        value={userInput}
        active={inputHighlight}
        onClick={() => {
          setInputHighlight(true);
          setUserInput('');
        }}
        onChartPage={props.onChartPage}
        onChange={handleUserInput}
        onKeyPress={handleKeywordKeyPress}
      />
      <DropdownContainer active={dropdownOpen} onChartPage={props.onChartPage}>
        <Dropdown
          naceList={props.naceList}
          regionList={props.regionList}
          findNace={findNace}
          findRegion={findRegion}
          setChosenNaceRegion={setChosenNaceRegion}
          setUserInput={setUserInput}
          redirectToPage={redirectToPage}
          userInput={userInput}
          chosenNaceRegion={chosenNaceRegion}
        />
      </DropdownContainer>
      <Button
        id="searchButton"
        active={false}
        onChartPage={props.onChartPage}
        /*onClick={() => {
          setSearchQuery(
            (document.getElementById('searchBar') as HTMLInputElement).value,
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
  border: 1px solid var(--main-white-color);
  color: ${(props) =>
    props.active ? 'var(--main-black-color)' : 'var(--main-white-color)'};
  border-radius: 0;
  width: ${(props) => (props.onChartPage ? '350px' : '420px')};
  padding: 10px 15px;
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
`;

const Button = styled.button<{ active: boolean; onChartPage: boolean }>`
  font-family: 'Roboto', sans-serif;
  background: var(--sec-orange-color);
  color: var(--main-black-color);
  border-radius: 0;
  font-size: var(--font-size-tiny);
  padding: 10px 15px;
  margin-left: 6px;
  border: 1px solid var(--sec-orange-color);
  width: ${(props) => (props.onChartPage ? '114px' : '137px')};
`;

const DropdownContainer = styled.div<{ active: boolean; onChartPage: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.onChartPage ? '382px' : '400px')};
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-top: 1px solid var(--main-black-color);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  padding: 0;
  z-index: 3;
`;
