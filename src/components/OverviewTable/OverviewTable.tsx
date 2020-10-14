import React from 'react';
import styled from 'styled-components';

export const OverviewTable: React.FC = () => {
  return (
    <OuterContainer active={false}>
      <TableContainer active={false}>
        <TableTitleContainer active={false}>
          <UpperBox active={false}>
            <TitleBox active={false}>Air Emission accounts</TitleBox>
            <PeriodBox active={false}>Period: 2014-2018</PeriodBox>
          </UpperBox>
          <LowerBox active={false}>
            <YearBox active={false}>Year</YearBox>
            <YearBox active={false}>2014</YearBox>
            <YearBox active={false}>2015</YearBox>
            <YearBox active={false}>2016</YearBox>
            <YearBox active={false}>2017</YearBox>
            <YearBox active={false}>2018</YearBox>
          </LowerBox>
        </TableTitleContainer>
        <TableDataContainer active={false}>
          <TableRow active={false}>
            <TableBox active={false}>EU avarage (tonnes CO2)</TableBox>
            <TableBox active={false}>2000000</TableBox>
            <TableBox active={false}>3777667</TableBox>
            <TableBox active={false}>4343434</TableBox>
            <TableBox active={false}>534343434</TableBox>
            <TableBox active={false}>634343</TableBox>
          </TableRow>
          <TableRow active={false}>
            <TableBox active={false}>Sweden</TableBox>
            <TableBox active={false}>2</TableBox>
            <TableBox active={false}>3</TableBox>
            <TableBox active={false}>4</TableBox>
            <TableBox active={false}>5</TableBox>
            <TableBox active={false}>6</TableBox>
          </TableRow>
          <TableRow active={false}>
            <TableBox active={false}>Denmark</TableBox>
            <TableBox active={false}>2</TableBox>
            <TableBox active={false}>3</TableBox>
            <TableBox active={false}>4</TableBox>
            <TableBox active={false}>5</TableBox>
            <TableBox active={false}>6</TableBox>
          </TableRow>
          <TableRow active={false}>
            <TableBox active={false}>Netherlands</TableBox>
            <TableBox active={false}>2</TableBox>
            <TableBox active={false}>3</TableBox>
            <TableBox active={false}>4</TableBox>
            <TableBox active={false}>5</TableBox>
            <TableBox active={false}>6</TableBox>
          </TableRow>
          <TableRow active={false}>
            <TableBox active={false}>Russia</TableBox>
            <TableBox active={false}>2</TableBox>
            <TableBox active={false}>3</TableBox>
            <TableBox active={false}>4</TableBox>
            <TableBox active={false}>5</TableBox>
            <TableBox active={false}>6</TableBox>
          </TableRow>
          <TableRow active={false}>
            <TableBox active={false}>Germany</TableBox>
            <TableBox active={false}>2</TableBox>
            <TableBox active={false}>3</TableBox>
            <TableBox active={false}>4</TableBox>
            <TableBox active={false}>5</TableBox>
            <TableBox active={false}>6</TableBox>
          </TableRow>
          <TableRow active={false}>
            <TableBox active={false}>England</TableBox>
            <TableBox active={false}>2</TableBox>
            <TableBox active={false}>3</TableBox>
            <TableBox active={false}>4</TableBox>
            <TableBox active={false}>5</TableBox>
            <TableBox active={false}>6</TableBox>
          </TableRow>
        </TableDataContainer>
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
