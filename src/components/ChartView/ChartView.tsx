import React, { useState } from 'react';
import styled from 'styled-components';
import { NaceRegion, NaceRegionData, EuroStatTable } from '../../types';
import { OverviewTableComponent } from '../OverviewTableComponent/OverviewTableComponent';
import { HistoryGraphComponent } from '../HistoryGraphComponent/HistoryGraphComponent';
import { BarchartComponent } from '../BarchartComponent/BarchartComponent';
import { PercentageTableComponent } from '../PercentageTableComponent/PercentageTableComponent';
import { useLocation } from 'react-router-dom';
import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';

interface Props {
  naceRegionData: NaceRegionData[][];
  euData: NaceRegionData[];
  naceRegionList: NaceRegion[];
  euDataForAllChosenNaces: NaceRegionData[][];
  esgFactorInfo: EuroStatTable;
  urlParams: UrlParamsInterface;
}

interface TabProps {
  tableIndex: number;
  setTableIndex(id: number): void;
}

export const ChartView: React.FC<Props> = ({
  naceRegionData: naceRegionData,
  naceRegionList,
  esgFactorInfo,
  euData,
  euDataForAllChosenNaces,
  urlParams,
}) => {
  console.log(naceRegionData);
  const chosenTabN = Number(urlParams.chosenTab);
  const [tableIndex, setTableIndex] = useState(chosenTabN);
  // TODO: Check if chosenTab is a number and within range, or return error
  function setTableIndexAndUpdateUrl(n: number) {
    setTableIndex(n);
    urlParams.setUrlParams(
      urlParams.naceRegionIdString,
      urlParams.esgFactor,
      urlParams.yearStart,
      urlParams.yearEnd,
      n.toString(),
    );
  }
  return (
    <ChartViewContainer className={'chartViewContainer'} active={false}>
      <ContainerLine active={true} />
      <ChartViewTabs
        tableIndex={tableIndex}
        setTableIndex={setTableIndexAndUpdateUrl}
      />

      <DataView active={true}>
        <HistoryGraphContainer index={tableIndex}>
          <HistoryGraphComponent
            naceRegionData={naceRegionData}
            esgFactor={urlParams.esgFactor}
            naceRegionList={naceRegionList}
            esgFactorInfo={esgFactorInfo}
            urlParams={urlParams}
          />
        </HistoryGraphContainer>

        <BarChartContainer index={tableIndex}>
          <BarchartComponent
            naceRegionData={naceRegionData}
            esgFactor={urlParams.esgFactor}
            naceRegionList={naceRegionList}
            esgFactorInfo={esgFactorInfo}
            urlParams={urlParams}
          />
        </BarChartContainer>

        <OverviewTableContainer index={tableIndex}>
          <OverviewTableComponent
            naceRegionData={naceRegionData}
            esgFactor={urlParams.esgFactor}
            euData={euData}
            naceRegionList={naceRegionList}
            esgFactorInfo={esgFactorInfo}
            urlParams={urlParams}
          />
        </OverviewTableContainer>

        <PercentageTableContainer index={tableIndex}>
          {euDataForAllChosenNaces[0].length == naceRegionData[0].length ? (
            <PercentageTableComponent
              naceRegionData={naceRegionData}
              esgFactor={urlParams.esgFactor}
              euData={euData}
              euDataForAllChosenNaces={euDataForAllChosenNaces}
              naceRegionList={naceRegionList}
              esgFactorInfo={esgFactorInfo}
              urlParams={urlParams}
            />
          ) : (
            <ErrorComponent
              error={
                new Error(
                  'Cannot compare euData because they have different length',
                )
              }
            />
          )}
        </PercentageTableContainer>
      </DataView>

      <ContainerLine active={true} />
    </ChartViewContainer>
  );
};

export const ChartViewTabs: React.FC<TabProps> = ({
  // TODO: Unused, remove??
  tableIndex: tableIndex,
  setTableIndex: setTableIndex,
}) => {
  return (
    <>
      <ChartTabsContainer active={true}>
        <HistoryTab
          //id='1'
          className={'historyTab'}
          index={tableIndex}
          onClick={() => {
            setTableIndex(1);
            //setTabBold('1');
          }}
        >
          History Graph
        </HistoryTab>
        <BarChartTab
          //id='2'
          className={'barchartTab'}
          index={tableIndex}
          onClick={() => {
            setTableIndex(2);
            //setTabBold('2');
          }}
        >
          Bar Chart
        </BarChartTab>
        <OverviewTableTab
          //id='3'
          className={'overviewtableTab'}
          index={tableIndex}
          onClick={() => {
            setTableIndex(3);
            //setTabBold('3');
          }}
        >
          Overview Table
        </OverviewTableTab>
        <PercentageTableTab
          className={'percentagetableTab'}
          //id='4'
          index={tableIndex}
          onClick={() => {
            setTableIndex(4);
            //setTabBold('4');
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

const ChartTabs = styled.a<{ index: number }>`
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

const HistoryTab = styled(ChartTabs)<{ index: number }>`
  font-weight: ${(props) => (props.index === 1 ? '700' : '200')};
  color: ${(props) =>
    props.index === 1
      ? 'var(--main-black-color)'
      : 'var( --main-blackAlpha-color)'};
`;

const BarChartTab = styled(ChartTabs)`
  font-weight: ${(props) => (props.index === 2 ? '700' : '200')};
  color: ${(props) =>
    props.index === 2
      ? 'var(--main-black-color)'
      : 'var( --main-blackAlpha-color)'};
`;

const OverviewTableTab = styled(ChartTabs)`
  font-weight: ${(props) => (props.index === 3 ? '700' : '200')};
  color: ${(props) =>
    props.index === 3
      ? 'var(--main-black-color)'
      : 'var( --main-blackAlpha-color)'};
`;

const PercentageTableTab = styled(ChartTabs)`
  font-weight: ${(props) => (props.index === 4 ? '700' : '200')};
  color: ${(props) =>
    props.index === 4
      ? 'var(--main-black-color)'
      : 'var( --main-blackAlpha-color)'};
`;

const HistoryGraphContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 1 ? 'flex' : 'none')};
  justify-content: center;
  align-items: top;
  width: 100vw;
  min-height: 60vh;
`;

const BarChartContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 2 ? 'flex' : 'none')};
  justify-content: center;
  align-items: top;
  width: 100vw;
  min-height: 60vh;
`;

const OverviewTableContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 3 ? 'flex' : 'none')};
  justify-content: center;
  align-items: top;
  width: 100vw;
  min-height: 60vh;
`;

const PercentageTableContainer = styled.div<{ index: number }>`
  display: ${(props) => (props.index === 4 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 60vh;
`;
