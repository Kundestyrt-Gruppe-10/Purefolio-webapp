import React from 'react';
import styled from 'styled-components';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: '2014',
    Norway: 4552353,
    Sweden: 3035235,
    Denmark: 4425235,
    Netherlands: 8235235,
    Germany: 13664235,
  },
  {
    name: '2015',
    Norway: 5052353,
    Sweden: 3435235,
    Denmark: 5025235,
    Netherlands: 9235235,
    Germany: 14664635,
  },
  {
    name: '2016',
    Norway: 5152353,
    Sweden: 3835235,
    Denmark: 5245235,
    Netherlands: 9535235,
    Germany: 16542635,
  },
  {
    name: '2017',
    Norway: 5152353,
    Sweden: 4035235,
    Denmark: 5425235,
    Netherlands: 9435235,
    Germany: 18664265,
  },
  {
    name: '2018',
    Norway: 5152353,
    Sweden: 4035235,
    Denmark: 5425235,
    Netherlands: 9235235,
    Germany: 19664635,
  },
];

export const HistoryGraphComponent: React.FC = () => {
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <GraphContainer active={false}>
          <ResponsiveContainer aspect={2.7} width="97%" height="97%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#f7f8f6" tick={{ fontSize: 14 }} />
              <YAxis
                tickFormatter={DataFormater}
                stroke="#f7f8f6"
                tick={{ fontSize: 14 }}
              />
              <Tooltip />
              {/*TODO: Fix color fetching from index.css */}
              <Line
                type="monotone"
                dataKey="Norway"
                stroke="#e87f38"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Sweden"
                stroke="#a84924"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Denmark"
                stroke="#91e5ce"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Netherlands"
                stroke="#f9c4a0"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Germany"
                stroke="#7f96f7"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContainer>
        <TextBox active={false}>
          <TableTitleContainer active={false}>
            <TitleBox active={false}>History Graph</TitleBox>
            <UnitOfMeasureBox active={false}>
              By million tonnes of CO2
            </UnitOfMeasureBox>
          </TableTitleContainer>
          <TableInfoContainer active={false}>
            <ESGFactorContainer active={false}>
              <DescriptorBox active={false}>ESG Factor:</DescriptorBox>
              <DescriptionBox active={false}>
                Air Emission accounts
              </DescriptionBox>
            </ESGFactorContainer>
            <PeriodContainer active={false}>
              <DescriptorBox active={false}>Year:</DescriptorBox>
              <DescriptionBox active={false}> 2014-2018</DescriptionBox>
            </PeriodContainer>
          </TableInfoContainer>
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
`;
const TableTitleContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  margin-left: 2%;
  margin-right: 2%;
`;
const TitleBox = styled.div<{ active: boolean }>`
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

const TableInfoContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  font-weight: 450;
  }
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

const DescriptorBox = styled.div<{ active: boolean }>`
  font-size: 14px;
  }
`;

const DescriptionBox = styled.div<{ active: boolean }>`
  font-size: 14px;
`;
