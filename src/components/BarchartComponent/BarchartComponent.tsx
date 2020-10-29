import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { NaceRegion, NaceRegionData, EuroStatTable } from '../../types';
import { handleColorType } from '../NaceRegionCard/NaceRegionCard';
// TODO: Add tests

/**
 * Input: [
 * [{
 *  nace=,
 *  Region=
 *  Year
 *  Emission
 * ,
 *  nace=,
 *  Region=
 *  Year
 *  Emission
 * ]
 * ]
 * Output: [
 *  {
 *  Year:
 *  Emmision1
 *  Emission2
 *  Emission3
 * }
 * ]
 */

interface Props {
  naceRegionData: NaceRegionData[][];
  naceRegionList: NaceRegion[];
  //esgFactorInfo: EuroStatTable;
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

interface NaceRegionChartItem {
  year: number; // year
  [dataKey: string]: number | undefined; // naceRegionKey: data
}
export const BarchartComponent: React.FC<Props> = ({
  naceRegionData,
  naceRegionList,
  esgFactor,
}) => {
  const naceRegionItems: NaceRegionChartItem[] = [];

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
          })[element.region.regionName + element.nace.naceCode] =
            element[esgFactor]),
      );
      // Runs when element not yet in naceRegionItems
      const found = naceRegionItems.some((el) => el.year === element.year);
      if (!found) {
        naceRegionItems.push({
          year: element.year,
          [element.region.regionName + element.nace.naceCode]: element[
            esgFactor
          ],
        });
      }
    });
  });
  return (
    <>
      <BarChart
        width={1000}
        height={500}
        data={naceRegionItems}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {naceRegionList.map((item, idx) => {
          return (
            // This is number of Bars per group/ year. If we compare multiple NaceRegions
            // We will have multiple bars
            <Bar
              data-testid="bar"
              key={idx}
              dataKey={item.region.regionName + item.nace.naceCode}
              fill={handleColorType(idx)}
            />
          );
        })}
      </BarChart>
    </>
  );
};
