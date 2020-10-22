import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Nace, NaceRegion, NaceRegionData, Region } from '../../types';
import { ApiGet } from '../../utils/api';
import { ContentContainer } from '../../components/BaseLayout';
import { HistoryGraphComponent } from '../../components/HistoryGraphComponent/HistoryGraphComponent';
import { NaceRegionCardContainer } from '../../components/NaceRegionCard/NaceRegionCardContainer';
import { ChartView } from '../../components/ChartView/ChartView';
import { ChartPageHeaderComponent } from '../../components/ChartPageHeaderComponent/ChartPageHeaderComponent';
import { BarchartComponent } from '../../components/BarchartComponent/BarchartComponent';

// ----Helper functions----
export function isValidNaceRegionIdString(naceRegionIdString: string): boolean {
  return /^[0-9,.;]*$/.test(naceRegionIdString);
}
export function isValidEsgFactorIdString(esgFactorString: string): boolean {
  return /^[0-9]*$/.test(esgFactorString);
}
/**
 * Input: '11,12;21,22'
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
  const [, /*esgFactorList*/ setEsgFactorList] = useState<string[]>();
  const [naceRegionList, setNaceRegionList] = useState<NaceRegion[]>([]);
  const history = useHistory();

  // Check if correct URL and parse URL string
  let regionNaceIdList: number[][];
  // let esgFactorId: number;
  try {
    regionNaceIdList = naceRegionIdStringToList(naceRegionIdString);
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
    async function fetchData() {
      return await Promise.all([
        ApiGet<Region[]>('/regions')
          .then((res) => {
            setRegionList(res);
          })
          .catch((err) => setError(err)),

        // Fetches all Naces. Updates NaceList state, returns the chosen Naces.
        ApiGet<Nace[]>('/naces')
          .then((res) => {
            setNaceList(res);
          })
          .catch((err) => setError(err)),

        // Fetch Chosen Nace Region Cards
        regionNaceIdList.map((regionNace) => {
          // Reset naceRegionState
          setNaceRegionList([]);
          Promise.all([
            ApiGet<Region[]>(`/regions/${regionNace[0]}`).catch((err) =>
              setError(err),
            ),
            ApiGet<Nace[]>(`/naces/${regionNace[1]}`).catch((err) =>
              setError(err),
            ),
          ])
            .then((res) => {
              if (res[0] && res[1] && res[0][0] && res[0][0]) {
                const naceRegion: NaceRegion = {
                  region: res[0][0],
                  nace: res[1][0],
                };
                setNaceRegionList((naceRegionList) => [
                  ...naceRegionList,
                  naceRegion,
                ]);
              }
            })
            .catch((err) => setError(err));
        }),

        ApiGet<string[]>('/tables/esg-factors')
          .then((res) => setEsgFactorList(res))
          .catch((err) => setError(err)),

        Promise.all(
          regionNaceIdList.map((regionIdNaceId) =>
            ApiGet<NaceRegionData[]>(
              `/naceregiondata/${regionIdNaceId[0]}/${regionIdNaceId[1]}`,
            ).then((res): NaceRegionData[] => {
              console.log(res);
              // if (res.length < 1) throw new Error('one list was empy');
              return res;
            }),
          ),
        )
          .then((res) => {
            setNaceRegionData(res);
          })
          .catch((err) => setError(err)),
      ]);
    }

    void fetchData().then(() => setLoading(false));
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
        <ChartPageHeaderComponent />
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
              {regionList && naceList && naceRegionIdString ? (
                <NaceRegionCardContainer
                  regionList={regionList}
                  naceList={naceList}
                  setUrlParams={setUrlParams}
                  naceRegionIdList={naceRegionIdStringToList(
                    naceRegionIdString,
                  )}
                />
              ) : null}
              <ChartView>
                {naceRegionDataListList && naceRegionList ? (
                  <BarchartComponent
                    naceRegionData={naceRegionDataListList}
                    esgFactor={esgFactorIdString}
                    naceRegionList={naceRegionList}
                  />
                ) : null}
              </ChartView>
              <HistoryGraphComponent />
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

// TODO: Unused, remove?
/* const ChartViewContainer = styled.div`
  grid-column-start: left-pad-stop;
  grid-column-end: right-pad-start;
  grid-row-start: main-start;
  grid-row-end: main-stop;
`; */

const ChartPageContainer = styled.div`
  grid-template-rows: [card-start] 200px [card-stop chart-start] 400px [chart-stop];
`;
