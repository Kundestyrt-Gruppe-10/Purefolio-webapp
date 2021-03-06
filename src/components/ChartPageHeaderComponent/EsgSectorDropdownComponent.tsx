import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { EuroStatTable } from '../../types';

interface Props {
  esgFactorList: string[]; // TODO: This is not used any more. Remove.
  urlParams: UrlParamsInterface;
  euroStatTableList: EuroStatTable[];
  esgFactorInfo: EuroStatTable;
}

export const EsgFactorDropdown: React.FC<Props> = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenFactor, setChosenFactor] = useState<string>(
    props.esgFactorInfo.datasetName || props.urlParams.esgFactor,
  );
  const [userInput, setUserInput] = useState<string>('');

  // TODO: Keypress does not work after refactor to EsgFactorInfo. Fix this
  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (props.esgFactorList.includes(userInput)) {
        props.urlParams.setUrlParams(
          props.urlParams.naceRegionIdString,
          userInput, // Setting new esgFactorString
          props.urlParams.yearStart,
          props.urlParams.yearEnd,
          props.urlParams.chosenTab,
        );
        setChosenFactor(userInput);
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
  const handleEsgFactorClick = (esgFactor: EuroStatTable): void => {
    setChosenFactor(esgFactor.datasetName);
    setUserInput(esgFactor.datasetName);
    props.urlParams.setUrlParams(
      props.urlParams.naceRegionIdString,
      esgFactor.attributeName, // Setting new esgFactorString
      props.urlParams.yearStart,
      props.urlParams.yearEnd,
      props.urlParams.chosenTab,
    );
  };

  document.addEventListener('mouseup', handleMousdownClick);

  return (
    <>
      <Title active={false}>ESG factor</Title>
      <Input
        id={'esgDropDown'}
        autoComplete="off"
        placeholder={'Choose factor...'}
        value={dropdownOpen ? userInput : chosenFactor}
        active={dropdownOpen}
        onClick={() => setDropdownOpen(true)}
        onChange={handleUserInput}
        onKeyPress={handleKeywordKeyPress}
      />
      <DropdownContainer active={dropdownOpen}>
        {props.euroStatTableList
          .filter((factor) => factor.datasetName?.includes(userInput))
          .map((factor: EuroStatTable, i: number) => (
            <ResultRow
              key={factor.tableId}
              id={factor.tableId.toString()}
              active={factor.datasetName === chosenFactor ? true : false}
              onClick={() => {
                handleEsgFactorClick(factor);
              }}
            >
              <NameBox
                active={factor.datasetName === chosenFactor ? true : false}
              >
                {factor.datasetName}
              </NameBox>
              <CategoryBox
                active={factor.datasetName === chosenFactor ? true : false}
              >
                {factor.esgFactor}
              </CategoryBox>
            </ResultRow>
          ))}
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
  top: 50px;
`;

const Input = styled.input<{ active: boolean }>`
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
  width: 330px;
  text-align: left;
`;

const DropdownContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 358px;
  min-height: 200px;
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  z-index: 3;
  border-top: 1px solid var(--main-black-color);
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
    props.active ? 'rgba(206, 216, 244, 0.7)' : 'var(--main-white-color)'};
  :hover {
    background-color: rgba(206, 216, 244, 0.7);
  }
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
