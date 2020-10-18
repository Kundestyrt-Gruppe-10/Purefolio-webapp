import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const HistoryGraphComponent: React.FC = () => {
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <UpperBox active={false}>
          <TitleBox active={false}>Air Emission accounts</TitleBox>
          <PeriodBox active={false}>Period: 2014-2018</PeriodBox>
        </UpperBox>
        <LineChart
          /*TODO: Make size responsive/flex */
          width={950}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </TableContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div<{ active: boolean }>`
  height: 75vh;
  margin: auto;
  padding-top: 8em;
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
  font-size: 20px;
  border-bottom: 0.6px solid #ced8f4;
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

const YearBox = styled.div<{ active: boolean }>`
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

const TableRow = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px dotted #abbdd7;
  height: 40px;
  font-size: 14px;
  &:nth-child(1) {
    font-weight: 700;
  }
  &:nth-last-child(1) {
    border: none;
  }
`;

const TableBox = styled.div<{ active: boolean }>`
  text-align: center;
  align-self: center;
  flex-basis: 16.7%;
  &:nth-child(1) {
    text-align: left;
  }
`;
