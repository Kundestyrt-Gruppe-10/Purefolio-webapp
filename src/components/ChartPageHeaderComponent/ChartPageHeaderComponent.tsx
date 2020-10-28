import React from 'react';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { SearchBar } from '../HeaderComponent/SearchBarComponent';
import { EsgFactorDropdown } from './EsgSectorDropdownComponent';
import { PeriodDropdown } from './PeriodDropDownComponent';

interface Props {
  //regionList: Region[];
  esgFactorList: string[];
  urlParams: UrlParamsInterface;
}
export const ChartPageHeaderComponent: React.FC<Props> = ({
  esgFactorList,
  urlParams,
}) => {
  return (
    <>
      <HeaderContainer active={false}>
        <SearchBox active={false}>
          <SearchBar onChartPage={true} naceRegionList={esgFactorList} />
        </SearchBox>
        <ESGBox active={false}>
          <EsgFactorDropdown
            esgFactorList={esgFactorList}
            urlParams={urlParams}
          />
        </ESGBox>
        <YearBox active={false}>
          <PeriodDropdown periodStart={true} />
        </YearBox>
        <YearLineBox active={false} />
        <YearBox active={false}>
          <PeriodDropdown periodStart={false} />
        </YearBox>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ active: boolean }>`
  background-color: var(--sec-purple-color);
  padding: 20px 30px 20px 30px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SearchBox = styled.div<{ active: boolean }>`
  font: Roboto, sans-serif;
  padding: 10px;
  align-items: center;
  flex-basis: 50%;
`;

const ESGBox = styled.div<{ active: boolean }>`
  font: Roboto, sans-serif;
  flex-basis: 20%;
  padding: 10px;
`;
const YearBox = styled.div<{ active: boolean }>`
  padding: 10px;
`;

const YearLineBox = styled.div<{ active: boolean }>`
  flex-basis: 5%;
  height: 2px;
  border-top: 2px solid var(--third-bluegrey-color);
  align-self: center;
`;
