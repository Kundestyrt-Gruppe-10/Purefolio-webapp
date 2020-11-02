import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { Nace, Region } from '../../types';
import {
  naceRegionIdStringToList,
  naceRegionIdListToString,
} from '../../pages/ChartPage/helper-functions';

type Props = {
  onChartPage: boolean;
  naceList: Nace[];
  regionList: Region[];
  urlParams: UrlParamsInterface;
};

export const SearchBar: React.FC<Props> = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenNaceRegion, setChosenNaceRegion] = useState<string>('');
  const [naceRegionProposalIndex, setNaceRegionProposalIndex] = useState<
    number
  >(0);
  const [userInput, setUserInput] = useState<string>('');
  const naceRegionStringList = props.naceList
    .map((nace) => nace.naceName)
    .concat(props.regionList.map((region) => region.regionName));

  const dropDownList = naceRegionStringList.filter((naceRegion) =>
    naceRegion.toLowerCase().includes(userInput.toLowerCase()),
  );

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setChosenNaceRegion(dropDownList[naceRegionProposalIndex]);
      setDropdownOpen(false);
      redirectToPage(dropDownList[naceRegionProposalIndex]);
      setUserInput('');
    } else if (e.key == 'ArrowUp' && naceRegionProposalIndex != 0) {
      setNaceRegionProposalIndex(naceRegionProposalIndex - 1);
    } else if (
      e.key == 'ArrowDown' &&
      naceRegionProposalIndex != dropDownList.length
    ) {
      setNaceRegionProposalIndex(naceRegionProposalIndex + 1);
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setUserInput(inputValue);
    setNaceRegionProposalIndex(0);
  };

  const handleMousdownClick = () => {
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
        props.urlParams.yearStart,
        props.urlParams.yearEnd,
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
        props.urlParams.yearStart,
        props.urlParams.yearEnd,
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
        value={dropdownOpen ? userInput : chosenNaceRegion}
        active={dropdownOpen}
        onChartPage={props.onChartPage}
        onClick={() => setDropdownOpen(true)}
        onChange={handleUserInput}
        onKeyDown={handleKeywordKeyDown}
      />

      <DropdownContainer active={dropdownOpen} onChartPage={props.onChartPage}>
        {dropDownList.map((naceRegionString: string, idx: number) => (
          <ResultRow
            key={naceRegionString + idx.toString()}
            id={naceRegionString}
            active={naceRegionProposalIndex === idx}
            onClick={() => {
              setChosenNaceRegion(naceRegionString);
              setUserInput(naceRegionString);
              redirectToPage(naceRegionString);
            }}
          >
            <NameBox active={naceRegionProposalIndex === idx}>
              {naceRegionString}
            </NameBox>
            <CategoryBox active={naceRegionProposalIndex === idx}>
              {findNace(naceRegionString) ? (
                <>Nace</>
              ) : findRegion(naceRegionString) ? (
                <>Region</>
              ) : (
                <>String</>
              )}
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
  margin-left: ${(props) => (props.onChartPage ? '0px' : '30px')};
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-top: 1px solid var(--main-black-color);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  padding: ${(props) => (props.onChartPage ? '20px' : '24px')};
  z-index: 3;
  max-height: 50vh;
  overflow-y: auto;
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
  height: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  flex-basis: 80%;
  text-align: left;
  align-self: center;
  overflow-x: hidden;
  white-space: nowrap;
`;

const CategoryBox = styled.div<{ active: boolean }>`
  font-size: 10px;
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--sec-purple-color)'};
  flex-basis: 20%;
  text-align: right;
  align-self: center;
`;
