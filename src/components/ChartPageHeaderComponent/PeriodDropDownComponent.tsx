import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  periodStart: boolean;
}

export const PeriodDropdown: React.FC<Props> = (props) => {
  //const { setSearchQuery } = useQuery();
  //const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenYear, setChosenYear] = useState<string>('2014');
  const [userInput, setUserInput] = useState<string>('');
  const years: string[] = [
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
  ];

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (years.includes(userInput)) {
        setChosenYear(userInput);
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
      <Title active={false}>
        {props.periodStart ? 'Period Start:' : 'Period End:'}
      </Title>
      <Input
        id={props.periodStart ? 'inputPeriodStart' : 'inputPeriodEnd:'}
        autoComplete="off"
        value={dropdownOpen ? userInput : chosenYear}
        active={dropdownOpen}
        onClick={() => setDropdownOpen(true)}
        onChange={handleUserInput}
        onKeyPress={handleKeywordKeyPress}
      />
      <DropdownContainer active={dropdownOpen}>
        {years
          .filter((year) => year.includes(userInput))
          .map((yearString: string, i: number) => (
            <ResultRow
              key={i}
              id={yearString}
              active={yearString === chosenYear ? true : false}
              onClick={() => {
                setChosenYear(yearString);
                setUserInput(yearString);
              }}
            >
              {yearString}
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
  width: 50px;
  text-align: center;
`;

const DropdownContainer = styled.div<{ active: boolean }>`
  overflow: auto;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  min-width: 78px;
  max-width: 78px;
  position: absolute;
  background-color: var(--main-white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  z-index: 3;
  border-top: 1px solid var(--main-black-color);
`;

const ResultRow = styled.div<{ active: boolean }>`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  min-height: 35px;
  height: 35px;
  border: ${(props) =>
    props.active ? '2px solid var(--sec-purple-color)' : 'none'};
  color: ${(props) =>
    props.active ? 'var(--third-blue-color)' : 'var(--main-black-color)'};
  background-color: ${(props) =>
    props.active ? 'rgba(206, 216, 244, 0.7);' : 'var(--main-white-color)'};
`;
