import React from 'react';
import styled from 'styled-components';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { EuroStatTable, Nace, Region } from '../../types';
import { SearchBar } from '../HeaderComponent/SearchBarComponent';
import { EsgFactorDropdown } from './EsgSectorDropdownComponent';
import { PeriodDropdown } from './PeriodDropDownComponent';
import logo from '../../img/NT_Logo_original_primaer_negativ_RGB.svg';
import { Link } from 'react-router-dom';

interface Props {
  regionList: Region[];
  naceList: Nace[];
  esgFactorList: string[];
  urlParams: UrlParamsInterface;
  yearList: string[];
  euroStatTableList: EuroStatTable[];
  esgFactorInfo: EuroStatTable;
}
export const ChartPageHeaderComponent: React.FC<Props> = ({
  regionList,
  naceList,
  esgFactorList,
  urlParams,
  yearList,
  euroStatTableList,
  esgFactorInfo,
}) => {
  return (
    <>
      <LogoContainer active={false}>
        <Link to="/">
          <Logo src={logo} alt="Title" active={false} />
        </Link>
      </LogoContainer>
      <HeaderContainer active={false}>
        <SearchBox active={false}>
          <SearchBar
            onChartPage={true}
            regionList={regionList}
            naceList={naceList}
            // urlParams={urlParams}
          />
        </SearchBox>
        <ESGBox active={false}>
          <EsgFactorDropdown
            esgFactorList={esgFactorList}
            euroStatTableList={euroStatTableList}
            esgFactorInfo={esgFactorInfo}
            urlParams={urlParams}
          />
        </ESGBox>
        <YearBox active={false}>
          <PeriodDropdown
            periodStart={true}
            yearList={yearList.slice(yearList.indexOf(urlParams.yearEnd), -1)}
            setValue={urlParams.yearStart}
            urlParams={urlParams}
          />
        </YearBox>
        <YearLineBox active={false} />
        <YearBox active={false}>
          <PeriodDropdown
            periodStart={false}
            yearList={yearList.slice(0, yearList.indexOf(urlParams.yearStart))}
            setValue={urlParams.yearEnd}
            urlParams={urlParams}
          />
        </YearBox>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ active: boolean }>`
  background-color: var(--sec-purple-color);
  padding: 0px 30px 20px 30px;
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

const LogoContainer = styled.a<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: var(--sec-purple-color);
  width: 100%;
  padding-top: 5px;
  font: Roboto, sans-serif;
`;

const Logo = styled.img<{ active: boolean }>`
  width: 300px;
`;
