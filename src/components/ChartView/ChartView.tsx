import React from 'react';
import styled from 'styled-components';
import { OverviewTableComponent } from '../OverviewTableComponent/OverviewTable';

export const ChartView: React.FC = () => {
  return (
    <ChartViewContainer active={false}>
      <ContainerLine active={true} />
      <ChartViewTabs />
      <OverviewTableComponent />
      <ContainerLine active={true} />
    </ChartViewContainer>
  );
};

export const ChartViewTabs: React.FC = () => {
  return (
    <>
      <ChartTabsContainer active={true}>
        <ChartTabs active={true}>History Graph</ChartTabs>
        <ChartTabs active={true}>History Diagram</ChartTabs>
        <ChartTabs active={true}>Overview Table</ChartTabs>
        <ChartTabs active={true}>Percentage Table</ChartTabs>
      </ChartTabsContainer>
    </>
  );
};

const ChartViewContainer = styled.div<{ active: boolean }>`
  background-color: var(--main-white-color);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ContainerLine = styled.hr<{ active: boolean }>`
  background-color: var(--third-bluegrey-color);
  width: 100%;
  height: 2px;
  border: none;
  margin: 20px;
`;

const ChartTabsContainer = styled.nav<{ active: boolean }>`
  width: 40%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: 40px;
`;

const ChartTabs = styled.a<{ active: boolean }>`
  font: Roboto, sans-serif;
  background-color: var(--main-white-color);
  color: var(--main-blackAlpha-color);
  text-decoration: none;
  font-size: var(--font-size-tiny);
  :hover {
    color: var(--main-black-color);
    font-weight: 700;
  }
`;
