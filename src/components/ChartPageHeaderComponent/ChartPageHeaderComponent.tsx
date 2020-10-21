import React from 'react';
import styled from 'styled-components';
import { SearchBar } from '../HeaderComponent/SearchBarComponent';
import { EsgSectorDropdown } from './EsgSectorDropdownComponent';
import { PeriodDropdown } from './PeriodDropDownComponent';

export const ChartPageHeaderComponent: React.FC = () => {
  return (
    <>
      <HeaderContainer active={false}>
        <SearchBox active={false}>
          <SearchBar onChartPage={true} />
        </SearchBox>
        <DropDownBox active={false}>
          <EsgSectorDropdown />
        </DropDownBox>
        <YearBox active={false}>
          <PeriodDropdown />
        </YearBox>
        <YearLineBox active={false} />
        <YearBox active={false}>
          <PeriodDropdown />
        </YearBox>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: var(--sec-purple-color);
  padding: 10px 30px 10px 30px;
  color: white;
  display: flex;
  flex-direction: row;
`;

const SearchBox = styled.div<{ active: boolean }>`
  font: Roboto, sans-serif;
  flex-basis: 40%;
  border: 1px solid var(--third-bluegrey-color);
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const DropDownBox = styled.div<{ active: boolean }>`
  font: Roboto, sans-serif;
  flex-basis: 20%;
  border: 1px solid var(--third-bluegrey-color);
  padding: 10px;
`;
const YearBox = styled.div<{ active: boolean }>`
  flex-basis: 10%;
  border: 1px solid var(--third-bluegrey-color);
  padding: 10px;
`;

const YearLineBox = styled.div<{ active: boolean }>`
  flex-basis: 5%;
  height: 2px;
  border: 0;
  border-top: 1px solid var(--third-bluegrey-color);
  margin: 20px 0;
  padding: 0;
`;
