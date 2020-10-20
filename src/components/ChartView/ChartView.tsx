import React from 'react';
import styled from 'styled-components';

export const ChartView: React.FC = () => {
  return (
    <ChartViewContainer active={false}>
      <ChartViewTabs />
    </ChartViewContainer>
  );
};

export const ChartViewTabs: React.FC = () => {
  return (
    <>
      <ContainerLine active={true} />
      <ChartTabsContainer active={true}>
        <ChartTabs active={true}>History Graph</ChartTabs>
        <ChartTabs active={true}>History Diagram</ChartTabs>
        <ChartTabs active={true}>Overview Table</ChartTabs>
        <ChartTabs active={true}>Percentace Table</ChartTabs>
      </ChartTabsContainer>
      <ContainerLine active={true} />
    </>
  );
};

const ChartViewContainer = styled.div<{ active: boolean }>`
  background-color: var(--main-white-color);
  padding: 10px;
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
  width: 30%;
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
  font-size: var(--font-size-xtiny);
  :hover {
    color: var(--main-black-color);
    font-weight: 700;
  }
`;
