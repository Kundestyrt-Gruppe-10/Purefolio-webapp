import React from 'react';
import styled from 'styled-components';
import { NaceRegion, NaceRegionData, EuroStatTable } from '../../types';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import info_logo from '../../img/info_img.svg';

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
    | 'co2';
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
          {/*           <TableRow>
            <TableBox>EU</TableBox>
            {euData.map((euDataYear, idx) => {
              return <TableBox key={idx}>{euDataYear[esgFactor]}</TableBox>;
            })}
          </TableRow> */}
          {naceRegionData && naceRegionData[0] && naceRegionList
            ? naceRegionData.map((naceRegion: NaceRegionData[], idx) => {
                return (
                  <TableRow key={idx}>
                    <TableBox>
                      {naceRegion[0].region.regionName +
                        ' - ' +
                        naceRegion[0].nace.naceCode}
                    </TableBox>
                    {naceRegion ? (
                      naceRegion.map((naceRegionYear, idx) => {
                        return (
                          <TableBox key={idx}>
                            {naceRegionYear[esgFactor]}
                          </TableBox>
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
      <BottomContainer active={false}>
        <InfoTableTitleContainer active={false}>
          <InfoTitleBox active={false}>Overview table</InfoTitleBox>
          <UnitOfMeasureBox active={false}>
            {esgFactorInfo.unit}
          </UnitOfMeasureBox>
        </InfoTableTitleContainer>
        <InfoBox active={false}>
          <Logo src={info_logo} alt="Info" />
          <DescriptionBox active={false}>
            <p>
              <span
                style={{ color: 'var(--sec-purple-color)', fontWeight: 'bold' }}
              >
                Information:{' '}
              </span>
              {esgFactorInfo.description}
            </p>
            <p>
              For more information on this data, see the following link: <br />
              <LinkContainer href={esgFactorInfo.href} active={false}>
                {esgFactorInfo.href}
              </LinkContainer>
            </p>
          </DescriptionBox>
        </InfoBox>
      </BottomContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div<{ active: boolean }>`
  margin: auto;
  margin: 45px 0 0 0;
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
  top: -44px;
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
  padding: 32px 20px 20px 20px;
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
  width: 90%;
  justify-content: space-between;
  align-items: start;
  margin-left: 5%;
  margin-right: 5%;
  flex-wrap: wrap;
`;

const InfoTableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
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

const LinkContainer = styled.a<{ active: boolean }>``;

const Logo = styled.img``;

const BottomContainer = styled.div<{ active: boolean }>`
  width: 90%;
  margin: 10px auto 0 auto;
  display: flex;
  justify-content: space-between;
`;

const DescriptionBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-tiny);
  width: 450px;
  color: var(--main-black-color);
`;

const InfoBox = styled.div<{ active: boolean }>`
  display: flex;
`;
