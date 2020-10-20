import React, { useEffect, useState } from 'react';
import { OverviewTableComponent } from '../../components/OverviewTableComponent/OverviewTable';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Nace, NaceRegionData, Region } from '../../types';
import { ApiGet } from '../../utils/api';
import { ContentContainer } from '../../components/BaseLayout';
import { BarchartComponent } from '../../components/BarchartComponent/BarchartComponent';

// ----Helper functions----
export function isValidNaceRegionIdString(naceRegionIdString: string): boolean {
  return /^[0-9,.;]*$/.test(naceRegionIdString);
}
export function isValidEsgFactorIdString(esgFactorString: string): boolean {
  return /^[0-9]*$/.test(esgFactorString);
}
/**
 * Input: '11,12;21;22'
 * Output: [[11,12],[21,22]]
 */
export function naceRegionIdStringToList(
  naceRegionIdString: string,
): number[][] {
  if (!isValidNaceRegionIdString(naceRegionIdString)) {
    throw new Error('Illegal argument');
  }
  return naceRegionIdString.split(';').map((s) => s.split(',').map(Number));
}

interface Props {
  naceRegionIdString: string;
  esgFactorIdString: string;
}

// ----React Component----
export const ChartPage: React.FC<Props> = ({
  naceRegionIdString,
  esgFactorIdString,
}) => {
  // ----States----
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(true);
  const [regionList, setRegionList] = useState<Region[]>();
  const [naceList, setNaceList] = useState<Nace[]>();
  const [naceRegionDataListList, setNaceRegionData] = useState<
    NaceRegionData[][]
  >();
  const [esgFactorList, setEsgFactorList] = useState<string[]>();
  const history = useHistory();

  // Check if correct URL and parse URL string
  let naceRegionIdList: number[][];
  // let esgFactorId: number;
  try {
    naceRegionIdList = naceRegionIdStringToList(naceRegionIdString);
    if (isValidEsgFactorIdString(esgFactorIdString)) {
      // esgFactorId = Number(esgFactorIdString);
    } else {
      throw new Error('Illegal argument');
    }
  } catch (error) {
    return <Redirect to="/404" />;
  }

  // Fetch data from API
  useEffect(() => {
    function fetchData() {
      ApiGet<Region[]>('/regions')
        .then((res) => setRegionList(res))
        .catch((err) => setError(err));

      ApiGet<Nace[]>('/naces')
        .then((res) => setNaceList(res))
        .catch((err) => setError(err));

      ApiGet<string[]>('/tables/esg-factors')
        .then((res) => setEsgFactorList(res))
        .catch((err) => setError(err));

      Promise.all(
        naceRegionIdList.map((regionIdNaceId) =>
          ApiGet<NaceRegionData[]>(
            `/naceregiondata/${regionIdNaceId[0]}/${regionIdNaceId[1]}`,
          ),
        ),
      )
        .then((res) => {
          console.log('AWAIT ALLL:');
          console.log(res);
          setNaceRegionData(res);
          setLoading(false);
        })
        .catch((err) => console.log(err));

      /*       naceRegionIdList.map((regionIdNaceId) =>
        ApiGet<NaceRegionData[]>(
          // `/naceregiondata?regionId=${regionIdNaceId[0]}&naceId=${regionIdNaceId[1]}`,
          `/naceregiondata/${regionIdNaceId[0]}/${regionIdNaceId[1]}`,
        )
          .then((res) => {
            // console.log(regionIdNaceId);
            // console.log(res);
            let newState: NaceRegionData[][];
            if (naceRegionDataListList) {
              newState = naceRegionDataListList?.concat([res]);
            } else {
              newState = [res];
            }
            setNaceRegionData(newState);
          })
          .catch((err) => {
            console.log(err);
            setError(err);
          }),
      ); */
    }

    void fetchData();
  }, [naceRegionIdString, esgFactorIdString]);

  /**
   * Sets new url parameters and pushes the new state to history
   * @param naceRegionIdList
   * @param esgFactor
   */
  function setUrlParams(naceRegionIdList: string, esgFactor: string) {
    const path = '/chartpage/' + naceRegionIdList + '/' + esgFactor;
    history.push(path);
  }

  // Render components
  return (
    <>
      <ChartPageHeaderContainer>
        {/**TODO: ChartPageHeader */}
        <h1>PLACEHOLDER HEADER</h1>
      </ChartPageHeaderContainer>
      <ContentContainer>
        <ChartPageContainer>
          {loading ? (
            <h1>Laster...</h1>
          ) : error ? (
            /* TODO: Make error component */
            <h1 data-testid="error">Error: {error.message}</h1>
          ) : (
            <>
              <NaceRegionCardContainer>
                {/**TODO: NaceRegionCardContainer*/}
                <h1>PLACEHOLDER NaceRegionCARD</h1>
              </NaceRegionCardContainer>
              <ChartViewContainer>
                {/**TODO: ChartView*/}
                <h1>PLACEHOLDER ChartViewContainer</h1>
                <OverviewTableComponent />
              </ChartViewContainer>
              <h1>
                {regionList && regionList[0] ? regionList[0].regionName : null}
                {naceList && naceList[0] ? naceList[0].naceName : null}
                {esgFactorIdString}
              </h1>
              <ul>
                {!loading && naceRegionDataListList ? (
                  <BarchartComponent
                    naceRegionData2={naceRegionDataListList}
                    esgFactor={'emissionPerYear'}
                  />
                ) : (
                  <h1>No naceRegionDataListList</h1>
                )}
                {naceRegionDataListList?.map((naceRegionDataList) =>
                  naceRegionDataList.map((naceRegionData) => {
                    <li key={naceRegionData.naceRegionDataId}>
                      Emission: {naceRegionData.emissionPerYear} Year:
                      {naceRegionData.year}
                    </li>;
                  }),
                )}
              </ul>
              <button onClick={() => setUrlParams('2,2', '2')}>
                Click me!{' '}
              </button>
            </>
          )}
        </ChartPageContainer>
      </ContentContainer>
    </>
  );
};

const ChartPageHeaderContainer = styled.div`
  grid-column-start: left-pad-start;
  grid-column-end: right-pad-stop;
  grid-row-start: header-start;
  grid-row-end: header-stop;
`;
const NaceRegionCardContainer = styled.div`
  grid-column-start: main-start;
  grid-column-end: main-stop;
  grid-row-start: card-start;
  grid-row-end: card-stop;
`;
const ChartViewContainer = styled.div`
  grid-column-start: left-pad-stop;
  grid-column-end: right-pad-start;
  grid-row-start: main-start;
  grid-row-end: main-stop;
`;

const ChartPageContainer = styled.div`
  grid-template-rows: [card-start] 200px [card-stop chart-start] 400px [chart-stop];
`;
