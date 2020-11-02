import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { Nace, Region } from '../../types';
import { Dropdown } from './Dropdown';
import { getConfig } from '../../utils/config-utils';
import {
  ResultInterface,
  RegionInterface,
  NaceInterface,
} from '../../types/search';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';

type Props = {
  onChartPage: boolean;
  naceList: Nace[];
  regionList: Region[];
  urlParams: UrlParamsInterface;
};

export const SearchBar: React.FC<Props> = (props) => {
  const history = useHistory();
  /* For search functionality */
  const { setSearchQuery } = useQuery();
  const [formattedSearchList, setFormattedSearchList] = useState([
    {
      id: 0,
      name: 'Default',
      label: 'region',
    },
  ]);
  const [results, setResults] = useState([
    {
      id: 0,
      name: 'Default',
      label: 'region',
    },
  ]);
  const options: Fuse.IFuseOptions<ResultInterface> = {
    keys: ['id', 'name', 'label'],
  };

  const [inputHighlight, setInputHighlight] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenNaceRegion, setChosenNaceRegion] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const naceRegionStringList = props.naceList
    .map((nace) => nace.naceName)
    .concat(props.regionList.map((region) => region.regionName));

  useEffect(() => {
    async function fetchData() {
      const regionRes = await fetch(getConfig().apiUrl + '/regions/');
      const naceRes = await fetch(getConfig().apiUrl + '/naces/');
      /*eslint-disable */
      const regionResObj: RegionInterface[] = await regionRes.json();
      const naceResObj: NaceInterface[] = await naceRes.json();
      /*eslint-enable */
      const formattedItemList: ResultInterface[] = [];

      regionResObj.forEach((element) => {
        formattedItemList.push({
          id: element.regionId,
          name: element.regionName,
          label: 'region',
        });
      });

      naceResObj.forEach((element) => {
        formattedItemList.push({
          id: element.naceId,
          name: element.naceName,
          label: 'nace',
        });
      });

      setFormattedSearchList(formattedItemList);
    }
    if (!props.onChartPage) {
      void fetchData();
    } else {
      const formattedItemList: ResultInterface[] = [];
      props.regionList.forEach((element) => {
        formattedItemList.push({
          id: element.regionId,
          name: element.regionName,
          label: 'region',
        });
      });
      props.naceList.forEach((element) => {
        formattedItemList.push({
          id: element.naceId,
          name: element.naceName,
          label: 'nace',
        });

        setFormattedSearchList(formattedItemList);
      });
    }
  }, []);

  // TODO: How does this work?
  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    setDropdownOpen(true);
    if (e.key === 'Enter') {
      if (naceRegionStringList.includes(userInput)) {
        setChosenNaceRegion(userInput);
        setDropdownOpen(false);
        // redirectToPage(userInput);
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setUserInput(inputValue);

    const fuse = new Fuse(formattedSearchList, options);
    const searchResult = fuse.search(inputValue);
    const finalResults = searchResult.map((element) => element.item);
    console.log(finalResults);
    setResults(finalResults);
  };

  const handleMousdownClick = () => {
    setInputHighlight(false);
    setDropdownOpen(false);
  };

  document.addEventListener('mouseup', handleMousdownClick);

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
        }}
        onChartPage={props.onChartPage}
        onChange={handleUserInput}
        onKeyPress={handleKeywordKeyPress}
      />
      <DropdownContainer active={dropdownOpen} onChartPage={props.onChartPage}>
        <Dropdown results={results} setUserInput={setUserInput} />
      </DropdownContainer>
      <Button
        id="searchButton"
        active={false}
        onChartPage={props.onChartPage}
        onClick={() => {
          setSearchQuery(userInput);
          history.push(`/results/`);
        }}
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
