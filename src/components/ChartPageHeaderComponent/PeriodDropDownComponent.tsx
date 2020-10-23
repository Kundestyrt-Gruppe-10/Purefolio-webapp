import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '../../pages/GlobalProvider/GlobalProvider';
import { useHistory } from 'react-router-dom';

interface Props {
  periodStart: boolean;
}

export const PeriodDropdown: React.FC<Props> = (props) => {
  const { setSearchQuery } = useQuery();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chosenYear, setChosenYear] = useState<string>('20100');
  const years: string[] = [
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
  ];

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(
        (document.getElementById('searchInput') as HTMLInputElement).value,
      );
      history.push(`/results/`);
    } else if (e.key) {
    }
  };

  const handleMousdownClick = () => {
    setDropdownOpen(false);
  };

  document.addEventListener('mouseup', handleMousdownClick);

  return (
    <>
      <Title active={false}>
        {props.periodStart ? 'Period Start:' : 'Period End:'}
      </Title>
      <Input
        id="searchInput"
        autoComplete="off"
        value={dropdownOpen ? undefined : chosenYear}
        active={false}
        onClick={() => setDropdownOpen(true)}
      />
      <DropdownContainer active={dropdownOpen}>
        {years.map((yearString: string, i: number) => (
          <ResultRow
            key={i}
            id={yearString}
            active={false}
            onClick={() => setChosenYear(yearString)}
          >
            <NameBox active={false}>{yearString}</NameBox>
          </ResultRow>
        ))}
        {/*
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
        */}
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
  padding: 14px;
  border-radius: 0;
  width: 50px;
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
  padding: 23px;
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
