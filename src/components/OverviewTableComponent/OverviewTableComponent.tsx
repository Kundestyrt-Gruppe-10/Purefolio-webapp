import React from 'react';
import styled from 'styled-components';
import { NaceRegion, NaceRegionData, EuroStatTable } from '../../types';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';

interface Props {
  naceRegionData: NaceRegionData[][];
  naceRegionList: NaceRegion[];
  esgFactorInfo: EuroStatTable;
  euData: NaceRegionData[];
  urlParams: UrlParamsInterface;
  esgFactor:
    | 'emissionPerYear'
    | 'workAccidentsIncidentRate'
    | 'genderPayGap'
    | 'environmentTaxes'
    | 'fatalAccidentsAtWork'
    | 'temporaryemployment'
    | 'employeesPrimaryEducation'
    | 'employeesSecondaryEducation'
    | 'employeesTertiaryEducation'
    | 'employeesLowWage'
    | 'hoursPaidAndNot'
    | 'hoursWorkWeek'
    | 'jobVacancyRate'
    | 'trainingParticipation'
    | 'totalWaste'
    | 'totalHazardousWaste'
    | 'totalNonHazardousWaste'
    | 'environmentalProtectionPollution'
    | 'environmentalProtectionTech'
    | 'seasonalWork'
    | 'supplyEnergyProducts'
    | 'supplyEnergyResiduals'
    | 'useNaturalEnergyInputs'
    | 'useEnergyProducts'
    | 'useEnergyResiduals';
}

export const OverviewTableComponent: React.FC<Props> = ({
  naceRegionData,
  naceRegionList,
  euData,
  esgFactor,
  esgFactorInfo,
  urlParams,
}) => {
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <TableTitleContainer active={false}>
          <UpperBox active={false}>
            <TitleBox active={false}>{esgFactorInfo.datasetName}</TitleBox>
            <PeriodBox active={false}>
              Period: {urlParams.yearStart} - {urlParams.yearEnd}
            </PeriodBox>
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
            <TableBox>EU</TableBox>
            {euData.map((euDataYear, idx) => {
              return <TableBox key={idx}>{euDataYear[esgFactor]}</TableBox>;
            })}
          </TableRow>
          {naceRegionData && naceRegionData[0] && naceRegionList
            ? naceRegionList.map((naceRegion, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableBox>
                      {naceRegion.region.regionName + naceRegion.nace.naceCode}
                    </TableBox>
                    {naceRegionData[idx] ? (
                      naceRegionData[idx].map((naceRegion, idx) => {
                        return (
                          <TableBox key={idx}>{naceRegion[esgFactor]}</TableBox>
                        );
                      })
                    ) : (
                      <p>No data</p>
                    )}
                  </TableRow>
                );
              })
            : null}
        </TableDataContainer>
      </TableContainer>
      <TextBox active={false}>
        <InfoTableTitleContainer active={false}>
          <InfoTitleBox active={false}>Overview table</InfoTitleBox>
          <UnitOfMeasureBox active={false}>
            {esgFactorInfo.unit}
          </UnitOfMeasureBox>
        </InfoTableTitleContainer>
        <LargeDescriptionBox active={false}>
          {esgFactorInfo.description}
          <SmallDescriptionBox active={false}>
            <LinkContainer href={esgFactorInfo.href} active={false}>
              {esgFactorInfo.href}
            </LinkContainer>
          </SmallDescriptionBox>
        </LargeDescriptionBox>
      </TextBox>
    </OuterContainer>
  );
};

const OuterContainer = styled.div<{ active: boolean }>`
  margin: auto;
  margin: 85px 0 30px 0;
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

const TextBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  margin-left: 5%;
  margin-right: 5%;
  flex-wrap: wrap;
`;

const InfoTableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 2%;
`;
const InfoTitleBox = styled.div<{ active: boolean }>`
  font-size: 20px;
  font-weight: 700;
  margin-right: auto;
  text-align: center;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const UnitOfMeasureBox = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-weight: 100;
  text-indent: 4%;
`;

const LargeDescriptionBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-tiny);
  width: 40%;
  margin-top: 2%;
`;

const SmallDescriptionBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-xtiny);
  color: var(--main-black-color);
  margin-top: 15px;
`;

const LinkContainer = styled.a<{ active: boolean }>``;
