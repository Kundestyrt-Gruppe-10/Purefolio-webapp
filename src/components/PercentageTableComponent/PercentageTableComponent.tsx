import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

export const PercentageTableComponent: React.FC = () => {
  const percentageList: number[] = [-0.4, -0.652, 0.3378, 1.0];
  const countriesList: string[] = [
    'Sweden',
    'Norway',
    'Germany',
    'Iceland',
    'Greece',
  ];

  return (
    <TableContainer>
      <TableTitleContainer>
        <UpperBox>
          <TitleBox>Air Emission accounts</TitleBox>
          <PeriodBox>Period: 2014-2018</PeriodBox>
        </UpperBox>
        <LowerBox>
          <YearBox>Year</YearBox>
          <YearBox>2014</YearBox>
          <YearBox>2015</YearBox>
          <YearBox>2016</YearBox>
          <YearBox>2017</YearBox>
        </LowerBox>
      </TableTitleContainer>
      <TableDataContainer>
        <TableRow>
          <EuBox>EU avarage (tonnes CO2)</EuBox>
          <EuBox>2000000</EuBox>
          <EuBox>3777667</EuBox>
          <EuBox>4343434</EuBox>
          <EuBox>534343434</EuBox>
        </TableRow>
        <TableRow>
          <TableBox>Russia</TableBox>
          {percentageList.map((percentageValue: number, i: number) => (
            <TableBox key={percentageValue + i} id={String(percentageValue)}>
              <PositivePercentageNumber
                positive={percentageValue > 0 ? true : false}
              >
                {String(percentageValue * 100) + '%'}
              </PositivePercentageNumber>
              <NegativePercentageContainer
                positive={percentageValue > 0 ? true : false}
                percentageValue={percentageValue}
              />
              <DelimiterLine />
              <PositivePercentageContainer
                positive={percentageValue > 0 ? true : false}
                percentageValue={percentageValue}
              />
              <NegativePercentageNumber
                positive={percentageValue > 0 ? true : false}
              >
                {String(percentageValue * 100) + '%'}
              </NegativePercentageNumber>
            </TableBox>
          ))}
        </TableRow>
      </TableDataContainer>
    </TableContainer>
  );
};
const TableContainer = styled.div`
  background-color: var(--third-bluegrey-color);
  width: 100%;
  margin: auto;
  margin-top: 60px;
  position: relative;
  border-radius: 5px;
  padding-top: 20px;
  z-index: 1;
`;
const TableTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--sec-purple-color);
  width: 95%;
  height: 96px;
  left: 2.5%;
  top: -60px;
  position: absolute;
  border-radius: 5px;
  color: #f7f8f6;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
  font-size: 20px;
  border-bottom: 0.6px solid #ced8f4;
  font-weight: 700;
  height: 50%;
`;

const LowerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
  height: 50%;
`;

const TitleBox = styled.div`
  margin-right: auto;
  text-align: center;
`;

const PeriodBox = styled.div``;

const YearBox = styled.div`
  width: 260px;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TableDataContainer = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: -1;
  width: 90%;
  margin: auto;
  font-weight: 400;
`;

const TableRow = styled.div`
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

const EuBox = styled.div`
  text-align: center;
  align-self: center;
  width: 260px;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TableBox = styled.div`
  display: flex;
  text-align: center;
  align-self: center;
  align-items: center;
  width: 260px;
  &:nth-child(1) {
    text-align: left;
  }
`;

const DelimiterLine = styled.div`
  flex-basis: 1%;
  background-color: var(--main-black-color);
  height: 25px;
`;

const NegativePercentageContainer = styled.div<{
  positive: boolean;
  percentageValue: number;
}>`
  flex-basis: ${(props) =>
    String(Math.abs(props.percentageValue) * 49.5) + '%'};
  height: 15px;
  background-color: var(--sec-orange-color);
  border-radius: 2px 0px 0px 2px;
  display: ${(props) => (props.positive ? 'none' : 'block')};
  margin-left: auto;
`;

const PositivePercentageContainer = styled.div<{
  positive: boolean;
  percentageValue: number;
}>`
  flex-basis: ${(props) =>
    String(Math.abs(props.percentageValue) * 49.5) + '%'};
  height: 15px;
  background-color: var(--sec-orange-color);
  border-radius: 0px 2px 2px 0px;
  display: ${(props) => (props.positive ? 'block' : 'none')};
  margin-right: auto;
`;

const PositivePercentageNumber = styled.div<{ positive: boolean }>`
  flex-basis: 46.5%;
  height: 15px;
  display: ${(props) => (props.positive ? 'block' : 'none')};
  text-align: right;
  padding: 0 3% 0 0;
`;

const NegativePercentageNumber = styled.div<{ positive: boolean }>`
  flex-basis: 46.5%;
  height: 15px;
  display: ${(props) => (props.positive ? 'none' : 'block')};
  text-align: left;
  padding: 0 0 0 3%;
`;

/*
<TableBox>Sweden</TableBox>
          <TableBox>
            <PositivePercentageNumber positive={true}>
              50%
            </PositivePercentageNumber>
            <NegativePercentageContainer
              positive={true}
              percentageValue={0.5}
            />
            <DelimiterLine />
            <PositivePercentageContainer
              positive={true}
              percentageValue={0.5}
            />
            <NegativePercentageNumber positive={true}>
              50%
            </NegativePercentageNumber>
          </TableBox>
          <TableBox>
            <NegativePercentageContainer
              positive={false}
              percentageValue={-0.4}
            />
            <DelimiterLine />
            <PositivePercentageContainer positive={true} percentageValue={50} />
          </TableBox>
          <TableBox>
            <NegativePercentageContainer
              positive={false}
              percentageValue={-0.4}
            />
            <DelimiterLine />
            <PositivePercentageContainer positive={true} percentageValue={50} />
          </TableBox>
          <TableBox>
            <NegativePercentageContainer
              positive={false}
              percentageValue={-0.4}
            />
            <DelimiterLine />
            <PositivePercentageContainer positive={true} percentageValue={50} />
          </TableBox>
        </TableRow>

        */
