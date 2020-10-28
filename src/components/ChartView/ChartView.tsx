import React, { useState } from 'react';
import styled from 'styled-components';
import { NaceRegion, NaceRegionData } from '../../types';
import { OverviewTableComponent } from '../OverviewTableComponent/OverviewTableComponent';
import { HistoryGraphComponent } from '../HistoryGraphComponent/HistoryGraphComponent';
import { BarchartComponent } from '../BarchartComponent/BarchartComponent';
import { useLocation } from 'react-router-dom';

interface Props {
  naceRegionData: NaceRegionData[][];
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
  naceRegionList: NaceRegion[];
  chosenTab: string;
  setUrlParams(
    naceRegionIdList: string,
    esgFactor: string,
    chosenTab: string,
  ): void;
}

interface TabProps {
  tableIndex: number;
  setTableIndex(id: number): void;
}

export const ChartView: React.FC<Props> = ({
  naceRegionData: naceRegionData,
  esgFactor: esgFactor,
  naceRegionList,
  chosenTab,
  setUrlParams,
}) => {
  const location = useLocation();
  const chosenTabN = Number(chosenTab);
  const [tableIndex, setTableIndex] = useState(chosenTabN);
  // TODO: Check if chosenTab is a number and within range, or return error
  function setTableIndexAndUpdateUrl(n: number) {
    const splitedString = location.pathname.split('/');
    setTableIndex(n);
    setUrlParams(splitedString[2], splitedString[3], n.toString());
  }
  return (
    <ChartViewContainer active={false}>
      <ContainerLine active={true} />
      <ChartViewTabs
        tableIndex={tableIndex}
        setTableIndex={setTableIndexAndUpdateUrl}
      />

      <DataView active={true}>
        <HistoryGraphContainer index={tableIndex}>
          <HistoryGraphComponent
            naceRegionData={naceRegionData}
            esgFactor={esgFactor}
            naceRegionList={naceRegionList}
          />
        </HistoryGraphContainer>

        <BarChartContainer index={tableIndex}>
          <BarchartComponent
            naceRegionData={naceRegionData}
            esgFactor={esgFactor}
            naceRegionList={naceRegionList}
          />
        </BarChartContainer>

        <OverviewTableContainer index={tableIndex}>
          <OverviewTableComponent
            naceRegionData={naceRegionData}
            esgFactor={esgFactor}
            naceRegionList={naceRegionList}
          />
        </OverviewTableContainer>
      </DataView>

      <ContainerLine active={true} />
    </ChartViewContainer>
  );
};

export const ChartViewTabs: React.FC<TabProps> = ({
  // TODO: Unused, remove??
  // tableIndex: tableIndex,
  setTableIndex: setTableIndex,
}) => {
  function setTabBold(id: string) {
    const IDs = ['1', '2', '3', '4'];
    IDs.forEach((element) => {
      if (element === id) {
        (document.getElementById(id) as HTMLElement).style.fontWeight = '700';
        (document.getElementById(id) as HTMLElement).style.color =
          'var(--main-black-color)';
      } else {
        (document.getElementById(element) as HTMLElement).style.fontWeight =
          '200';
        (document.getElementById(element) as HTMLElement).style.color =
          'var( --main-blackAlpha-color)';
      }
    });
  }

  return (
    <>
      <ChartTabsContainer active={true}>
        <ChartTabs
          id="1"
          active={true}
          onClick={() => {
            setTableIndex(1);
            setTabBold('1');
          }}
        >
          History Graph
        </ChartTabs>
        <BarChartTab
          id="2"
          active={true}
          onClick={() => {
            setTableIndex(2);
            setTabBold('2');
          }}
        >
          Bar Chart
        </BarChartTab>
        <OverviewTableTab
          id="3"
          active={true}
          onClick={() => {
            setTableIndex(3);
            setTabBold('3');
          }}
        >
          Overview Table
        </OverviewTableTab>
        <PercentageTableTab
          id="4"
          active={true}
          onClick={() => {
            setTableIndex(3);
            setTabBold('4');
          }}
        >
          Percentage Table
        </PercentageTableTab>
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

const DataView = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
    //border-top:2px solid var(--main-black-color);
    margin: 0;
    padding: 0;
  }
`;

const HistoryTab = styled(ChartTabs)``;

const BarChartTab = styled(ChartTabs)``;

const OverviewTableTab = styled(ChartTabs)``;

const PercentageTableTab = styled(ChartTabs)``;

const HistoryGraphContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 1 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BarChartContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 2 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const OverviewTableContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 3 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
`;
