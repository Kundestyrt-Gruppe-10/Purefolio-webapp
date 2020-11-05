import React, { useEffect } from 'react';
import styled from 'styled-components';

import { handleColorType } from '../../pages/ChartPage/helper-functions';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { NaceRegion, NaceRegionData, EuroStatTable } from '../../types';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';

interface Props {
  naceRegionData: NaceRegionData[][];
  naceRegionList: NaceRegion[];
  esgFactorInfo: EuroStatTable;
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

interface NaceRegionChartItem {
  year: number; // year
  [dataKey: string]: number | undefined; // naceRegionKey: data
}

export const HistoryGraphComponent: React.FC<Props> = ({
  naceRegionData,
  naceRegionList,
  esgFactor,
  esgFactorInfo,
  urlParams,
}) => {
  const naceRegionItems: NaceRegionChartItem[] = [];

  // TODO: BUG: If the compared NaceRegionCards does not have
  // data on the same years it can sometime fuck up
  // TODO: This should be a function and moved out from component
  naceRegionData.forEach((naceRegion: NaceRegionData[]) => {
    naceRegion.forEach((element: NaceRegionData) => {
      // If year already in naceRegionItems, update existing object
      naceRegionItems.map(
        () =>
          // Return object if it exist with new key:value pair
          // or create new object if it does not exist
          ((naceRegionItems.find((el) => el.year === element.year) || {
            year: element.year,
          })[element.region.regionName + ' - ' + element.nace.naceCode] =
            element[esgFactor]),
      );
      // Runs when element not yet in naceRegionItems
      const found = naceRegionItems.some((el) => el.year === element.year);
      if (!found) {
        naceRegionItems.push({
          year: element.year,
          [element.region.regionName + ' - ' + element.nace.naceCode]: element[
            esgFactor
          ],
        });
      }
    });
  });
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <GraphContainer active={false}>
          <ResponsiveContainer aspect={2.7} width="97%" height="97%">
            <LineChart data={naceRegionItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dy={5}
                dataKey="year"
                stroke="#f7f8f6"
                tick={{ fontSize: 14 }}
              />
              <YAxis
                dx={-5}
                tickFormatter={DataFormater}
                stroke="#f7f8f6"
                tick={{ fontSize: 14 }}
              />
              <Tooltip />
              {Object.keys(naceRegionItems[0])
                .filter((k) => k != 'year')
                .map((key, idx) => {
                  return (
                    <Line
                      key={idx}
                      type="monotone"
                      dataKey={key}
                      // TODO: Fix Colors.
                      stroke={handleColorType(idx)}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      dot={{ r: 5, fill: handleColorType(idx) }}
                      //connectNulls={true}
                    />
                  );
                })}
            </LineChart>
          </ResponsiveContainer>
        </GraphContainer>
        <TextBox active={false}>
          <TableTitleContainer active={false}>
            <TitleBox active={false}>History Graph</TitleBox>
            <UnitOfMeasureBox active={false}>
              {esgFactorInfo.unit}
            </UnitOfMeasureBox>
          </TableTitleContainer>
          <TableInfoContainer active={false}>
            <ESGFactorContainer active={false}>
              <DescriptionBox active={false}>ESG Factor:</DescriptionBox>
              <DescriptionBox active={false}>
                {esgFactorInfo.datasetName}
              </DescriptionBox>
            </ESGFactorContainer>
            <PeriodContainer active={false}>
              <DescriptionBox active={false}>Year:</DescriptionBox>
              <DescriptionBox active={false}>
                {' '}
                {urlParams.yearStart} - {urlParams.yearEnd}
              </DescriptionBox>
            </PeriodContainer>
          </TableInfoContainer>
          <LargeDescriptionBox active={false}>
            {esgFactorInfo.description}
            <SmallDescriptionBox active={false}>
              <LinkContainer href={esgFactorInfo.href} active={false}>
                {esgFactorInfo.href}
              </LinkContainer>
            </SmallDescriptionBox>
          </LargeDescriptionBox>
        </TextBox>
      </TableContainer>
    </OuterContainer>
  );
};

/*Help function to display Y-axis value with base of number */
const DataFormater = (number: number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + 'B';
  } else if (number > 1000000) {
    return (number / 1000000).toString() + 'M';
  } else if (number > 1000) {
    return (number / 1000).toString() + 'K';
  } else {
    return number.toString();
  }
};
const OuterContainer = styled.div<{ active: boolean }>`
  width: 100%;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 10px;
`;

const TableContainer = styled.div<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  width: 90%;
  margin: auto;
  position: relative;
  border-radius: 5px;
  padding-bottom: 30px;
`;

const GraphContainer = styled.div<{ active: boolean }>`
  background-color: var(--sec-purple-color);
  width: 90%;
  margin: auto;
  border-radius: 5px;
  padding-top: 20px;
  z-index: 1;
  transform: translateY(-35px);
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
const TableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  margin-left: 2%;
  margin-right: 2%;
`;
const TitleBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-large);
  font-weight: 700;
  margin-right: auto;
  text-align: center;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const UnitOfMeasureBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-small);
  font-weight: 200;
  text-indent: 4%;
`;

const TableInfoContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  font-weight: 450;
`;

const ESGFactorContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const PeriodContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const DescriptionBox = styled.div<{ active: boolean }>`
  var(--font-size-tiny)
`;

const LargeDescriptionBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-tiny);
  width: 40%;
  padding: 15px;
`;

const SmallDescriptionBox = styled.div<{ active: boolean }>`
  font-size: var(--font-size-xtiny);
  color: var(--main-black-color);
  margin-top: 15px;
`;

const LinkContainer = styled.a<{ active: boolean }>``;
