import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';

interface Props {
  esgFactorList: string[];
  urlParams: UrlParamsInterface;
}

export const EsgFactorDropdown: React.FC<Props> = (props) => {
  //const { setSearchQuery } = useQuery();
  //const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenFactor, setChosenFactor] = useState<string>(
    props.urlParams.esgFactor,
  );
  const [userInput, setUserInput] = useState<string>('');

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (props.esgFactorList.includes(userInput)) {
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
  const handleEsgFactorClick = (esgfactorString: string): void => {
    setChosenFactor(esgfactorString);
    setUserInput(esgfactorString);
    props.urlParams.setUrlParams(
      props.urlParams.naceRegionIdString,
      esgfactorString, // Setting new esgFactorString
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
        {props.esgFactorList
          .filter((factor) => factor.includes(userInput))
          .map((factorString: string, i: number) => (
            <ResultRow
              key={factorString}
              id={factorString}
              active={factorString === chosenFactor ? true : false}
              onClick={() => {
                handleEsgFactorClick(factorString);
              }}
            >
              <NameBox active={factorString === chosenFactor ? true : false}>
                {factorString}
              </NameBox>
              <CategoryBox
                active={factorString === chosenFactor ? true : false}
              >
                Environment
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
  top: 10px;
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
  text-align: center;
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
