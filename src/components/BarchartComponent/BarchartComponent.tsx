import React from 'react';
import { naceRegionData } from '../../mockData';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { NaceRegionData } from '../../types';

const data = [
  /*   {
    year: '2013',
    NaceRegion1: NaceRegion,
    corruptionRate:  0.5,
    emission: 50000,
  }, */
  {
    year: '2014',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    year: '2015',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    year: '2016',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];
/**
 * Input: [
 * [{
 *  nace=,
 *  Region=
 *  Year
 *  Emission
 * }]
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
  naceRegionData2: NaceRegionData[][];
  esgFactor: string;
}

interface BarChartItem {
  name: string; //Year
}
interface NaceRegionChartItem {
  year: number; // year
  [dataKey: string]: number | undefined; // naceRegionKey: data
  // [key: string]: string | undefined; //NaceRegion
}
export const BarchartComponent: React.FC<Props> = ({ naceRegionData2 }) => {
  /*   const barChartItems: BarChartItem[] = naceRegionData.forEach((item) => item.map((naceRegiondata): BarChartItem => (
    {
      name: naceRegionData.
    }
    ))) */

  console.log('naceRegionData2');
  console.log(naceRegionData2);
  const esgFactor = 'emissionPerYear';
  const barChartItems = [];
  const naceRegionItem: NaceRegionChartItem[] = [];
  naceRegionData2.forEach((naceRegion: NaceRegionData[]) => {
    /*     naceRegionItem.map(
      (obj) =>
        (naceRegionItem.find((el) => el.year === obj.year)[esgFactor] = obj[
          esgFactor
        ] || { year: obj.year, [obj.regionId]: obj[esgFactor] }),
    ); */
    naceRegion.forEach((element: NaceRegionData) => {
      naceRegionItem.map(
        (obj) =>
          ((naceRegionItem.find((el) => el.year === element.year) || {
            year: element.year,
          })[element.regionId] = element[esgFactor]),
      );
      /*       // year existsexists
      naceRegionItem.map((obj) =>
        obj.year === element.year
          ? Object.assign(obj, { [element.regionId]: element[esgFactor] })
          : { year: element.year, [element.regionId]: element[esgFactor] },
      );
 */
      // Not exists yet
      const found = naceRegionItem.some((el) => el.year === element.year);
      if (!found) {
        console.log(
          `Not found ${element.year}, id ${element.regionId}: Pushing`,
        );
        naceRegionItem.push({
          year: element.year,
          [element.regionId]: element[esgFactor],
          // [naceRegion]: element.region.regionName,
        });
      }
    });
  });
  /*   for (
    let naceRegionId = 0;
    naceRegionId < naceRegionData2.length;
    naceRegionId++
  ) {
    const item: NaceRegionChartItem = {
      year: naceRegionData2[0][0].year,
    };
    for (let dataId = 0; dataId < naceRegionData2[dataId].length; dataId++) {
      item[naceRegionData2[naceRegionId][dataId].nace.naceCode] =
        naceRegionData2[naceRegionId][dataId][esgFactor];
      console.log('item1');
      console.log(item);
    }
    naceRegionItem.push(item);
  }
  console.log('items');
  console.log(naceRegionItem); */
  console.log(naceRegionItem);

  return (
    <>
      <BarChart
        width={500}
        height={300}
        data={naceRegionItem}
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
        {naceRegionData2.map((item, idx) => {
          return <Bar key={idx} dataKey={item[0].regionId} fill="#8884d8" />;
          // <Bar dataKey={item[item.test]?.toString()} fill="#8884d8" />;
        })}
      </BarChart>
    </>
  );
};
