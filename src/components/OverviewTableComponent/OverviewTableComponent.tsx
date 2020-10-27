import React from 'react';
import styled from 'styled-components';
import { NaceRegion, NaceRegionData } from '../../types';

interface Props {
  naceRegionData: NaceRegionData[][];
  naceRegionList: NaceRegion[];
  esgFactor:
    | 'emissionPerYear'
    | 'workAccidentsIncidentRate'
    | 'genderPayGap'
    | 'environmentTaxes'
    | 'fatalAccidentsAtWork'
    | 'temporaryemployment'
    | 'employeesPrimaryEducation'
    | 'employeesSecondaryEducation'
    | 'employeesTertiaryEducation';
}

export const OverviewTableComponent: React.FC<Props> = ({
  naceRegionData,
  esgFactor,
}) => {
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <TableTitleContainer active={false}>
          <UpperBox active={false}>
            <TitleBox active={false}>{esgFactor}</TitleBox>
            <PeriodBox active={false}>Period: 2014-2018</PeriodBox>
          </UpperBox>
          <LowerBox active={false}>
            {/* TODO: Iterate over a year object instead?? */}
            <YearBox>Year</YearBox>
            {naceRegionData && naceRegionData[0]
              ? naceRegionData[0].map((year, idx) => {
                  return <YearBox key={idx}>{year.year}</YearBox>;
                })
              : null}
          </LowerBox>
        </TableTitleContainer>
        <TableDataContainer active={false}>
          <TableRow>
            <TableBox>EU avarage (tonnes CO2)</TableBox>
            <TableBox>2000000</TableBox>
            <TableBox>3777667</TableBox>
            <TableBox>4343434</TableBox>
            <TableBox>534343434</TableBox>
            <TableBox>634343</TableBox>
          </TableRow>
          {naceRegionData
            ? naceRegionData.map((naceRegionDataList, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableBox>
                      {naceRegionDataList[0].region.regionName}
                    </TableBox>
                    {naceRegionDataList.map((naceRegion, idx) => {
                      return (
                        <TableBox key={idx}>
                          {naceRegion.emissionPerYear}
                        </TableBox>
                      );
                    })}
                  </TableRow>
                );
              })
            : null}
        </TableDataContainer>
      </TableContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div<{ active: boolean }>`
  margin: auto;
  margin: 70px 0 30px 0;
  width: 100%;
`;
const TableContainer = styled.div<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  width: 90%;
  margin: auto;
  position: relative;
  border-radius: 5px;
  padding-top: 20px;
  z-index: 1;
`;
const TableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: var(--sec-purple-color);
  width: 90%;
  height: 96px;
  left: 5%;
  top: -60px;
  position: absolute;
  border-radius: 5px;
  color: #f7f8f6;
`;

const UpperBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  font-size: var(--font-size-medium);
  border-bottom: 0.5px solid #ced8f4;
  font-weight: 700;
  height: 50%;
`;

const LowerBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  height: 50%;
`;

const TitleBox = styled.div<{ active: boolean }>`
  margin-right: auto;
  text-align: center;
`;

const PeriodBox = styled.div<{ active: boolean }>``;

const YearBox = styled.div`
  flex-basis: 16.7%;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TableDataContainer = styled.div<{ active: boolean }>`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: -1;
  width: 81%;
  margin: auto;
  font-weight: 400;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px dotted #abbdd7;
  height: 40px;
  font-size: var(--font-size-tiny);
  &:nth-child(1) {
    font-weight: 700;
  }
  &:nth-last-child(1) {
    border: none;
  }
`;

const TableBox = styled.div`
  text-align: center;
  align-self: center;
  flex-basis: 16.7%;
  &:nth-child(1) {
    text-align: left;
  }
`;
