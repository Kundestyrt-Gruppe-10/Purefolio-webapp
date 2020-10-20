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
import { NaceRegionData } from '../../types';
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
  esgFactor: string;
}

interface NaceRegionChartItem {
  year: number; // year
  [dataKey: string]: number | undefined; // naceRegionKey: data
  // [key: string]: string | undefined; //NaceRegion
}
export const BarchartComponent: React.FC<Props> = ({
  naceRegionData: naceRegionData,
  // TODO: Fix so esgFactor can be passed as type!
  // esgFactor,
}) => {
  // TODO: Remove this, should be prop
  const esgFactor = 'emissionPerYear';
  const naceRegionItems: NaceRegionChartItem[] = [];
  naceRegionData.forEach((naceRegion: NaceRegionData[]) => {
    naceRegion.forEach((element: NaceRegionData) => {
      // If year already in naceRegionItems, update existing object
      naceRegionItems.map(
        () =>
          // Return object if it exist with new key:value pair
          // or create new object if it does not exist
          ((naceRegionItems.find((el) => el.year === element.year) || {
            year: element.year,
          })[element.region.regionName] = element[esgFactor]),
      );
      // Runs when element not yet in naceRegionItems
      const found = naceRegionItems.some((el) => el.year === element.year);
      if (!found) {
        naceRegionItems.push({
          year: element.year,
          [element.region.regionName]: element[esgFactor],
        });
      }
    });
  });
  return (
    <>
      <BarChart
        width={500}
        height={300}
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
        {naceRegionData.map((item, idx) => {
          return (
            // TODO: Fix dynamic fill color
            // This is number of Bars per group/ year. If we compare multiple NaceRegions
            // We will have multiple bars
            <Bar key={idx} dataKey={item[0].region.regionName} fill="#8884d8" />
          );
        })}
      </BarChart>
    </>
  );
};
