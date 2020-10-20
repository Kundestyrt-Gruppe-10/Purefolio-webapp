import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  ResponsiveContainer,
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
    name: '2014',
    Norway: 4552353,
    Sweden: 3035235,
    Denmark: 4425235,
    Netherlands: 5235235,
    Germany: 13664235,
  },
  {
    name: '2015',
    Norway: 5052353,
    Sweden: 3435235,
    Denmark: 5025235,
    Netherlands: 6235235,
    Germany: 14664635,
  },
  {
    name: '2016',
    Norway: 5152353,
    Sweden: 3835235,
    Denmark: 5245235,
    Netherlands: 6535235,
    Germany: 16542635,
  },
  {
    name: '2017',
    Norway: 5152353,
    Sweden: 4035235,
    Denmark: 5425235,
    Netherlands: 6435235,
    Germany: 18664265,
  },
  {
    name: '2018',
    Norway: 5152353,
    Sweden: 4035235,
    Denmark: 5425235,
    Netherlands: 7235235,
    Germany: 22664635,
  },
  {
    name: '2019',
    Norway: 5352353,
    Sweden: 4035235,
    Denmark: 5225235,
    Netherlands: 7525235,
    Germany: 23664635,
  },
];

export const HistoryGraphComponent: React.FC = () => {
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <GraphContainer active={false}>
          <ResponsiveContainer aspect={2} width="97%" height="97%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#f7f8f6" />
              <YAxis tickFormatter={DataFormater} stroke="#f7f8f6" />
              <Tooltip />
              {/*TODO: Fix color fetching from index.css */}
              <Line
                type="monotone"
                dataKey="Norway"
                stroke="#e87f38"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Sweden"
                stroke="#a84924"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Denmark"
                stroke="#91e5ce"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Netherlands"
                stroke="#f9c4a0"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Germany"
                stroke="#7f96f7"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContainer>
        <TextBox active={false}>
          <TitleBox active={false}>History Graph</TitleBox>
          <PeriodBox active={false}>Year: 2014-2018</PeriodBox>
          <ESGFactorBox active={false}>
            ESG Factor: Air Emission accounts
          </ESGFactorBox>
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
  height: 75vh;
  margin: auto;
  padding-top: 8em;
  padding-bottom: 50px;
`;

const TableContainer = styled.div<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  width: 90%;
  margin: auto;
  position: relative;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 20px;
  z-index: 1;
`;

const GraphContainer = styled.div<{ active: boolean }>`
  background-color: var(--sec-purple-color);
  width: 90%;
  margin: auto;
  position: relative;
  border-radius: 5px;
  padding-top: 10px;
  z-index: 1;
  transform: translateY(-70px);
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

const TextBox = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  border-bottom: 0.6px solid #ced8f4;
  height: 50%;
`;

const TitleBox = styled.div<{ active: boolean }>`
  font-size: 20px;
  font-weight: 700;
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

const ESGFactorBox = styled.div<{ active: boolean }>`
  font-size: 12px;
  text-align: center;
  align-self: center;
  flex-basis: 16.7%;
  &:nth-child(1) {
    text-align: left;
  }
`;
