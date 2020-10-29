import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import { Nace, NaceRegion, NaceRegionData, Region } from '../../types';
import { ApiGet } from '../../utils/api';
import { ContentContainer } from '../../components/BaseLayout';
import { ChartView } from '../../components/ChartView/ChartView';
import { ChartPageHeaderComponent } from '../../components/ChartPageHeaderComponent/ChartPageHeaderComponent';
import { NaceRegionCardContainer } from '../../components/NaceRegionCard/NaceRegionCardContainer';
import {
  isValidEsgFactorIdString,
  naceRegionIdStringToList,
} from './helper-functions';

interface Props {
  naceRegionIdString: string;
  chosenTab: string;
  yearStart: string;
  yearEnd: string;
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
}
// Interface for url parameters used in ChartPage
export interface UrlParamsInterface extends Props {
  setUrlParams(
    naceRegionIdList: string,
    esgFactor: string,
    yearStart: string,
    yearEnd: string,
    chosenTab: string,
  ): void;
}
// ----React Component----
export const ChartPage: React.FC<Props> = (props) => {
  const history = useHistory();
  /**
   * Sets new url parameters and pushes the new state to history
   * @param naceRegionIdList
   * @param esgFactor
   */
  function setUrlParams(
    naceRegionIdList: string,
    esgFactor: string,
    yearStart: string,
    yearEnd: string,
    chosenTab: string,
  ): void {
    const path = `/chartpage/${naceRegionIdList}/${esgFactor}/${yearStart}/${yearEnd}/${chosenTab}`;
    history.push(path);
  }
  // Object passed down to child components to easier handle URL-change
  const urlParams: UrlParamsInterface = {
    ...props,
    setUrlParams: setUrlParams,
  };

  // ----States----
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(true);
  const [regionList, setRegionList] = useState<Region[]>();
  const [naceList, setNaceList] = useState<Nace[]>();
  const [naceRegionDataListList, setNaceRegionData] = useState<
    NaceRegionData[][]
  >();
  const [esgFactorList, setEsgFactorList] = useState<string[]>();
  const [naceRegionList, setNaceRegionList] = useState<NaceRegion[]>([]);

  // Check if correct URL and parse URL string
  let regionNaceIdList: number[][];
  // let esgFactorId: number;
  try {
    regionNaceIdList = naceRegionIdStringToList(urlParams.naceRegionIdString);
    console.log(isValidEsgFactorIdString(urlParams.esgFactor));
    if (isValidEsgFactorIdString(urlParams.esgFactor)) {
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
            ApiGet<Region>(`/regions/${regionNace[0]}`).catch((err) =>
              setError(err),
            ),
            ApiGet<Nace>(`/naces/${regionNace[1]}`).catch((err) =>
              setError(err),
            ),
          ])
            .then((res) => {
              if (res[0] && res[1]) {
                const naceRegion: NaceRegion = {
                  region: res[0],
                  nace: res[1],
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
              `/naceregiondata/${regionIdNaceId[0]}/${regionIdNaceId[1]}?fromYear=${props.yearStart}&toYear=${props.yearEnd}`,
            ).then((res): NaceRegionData[] => {
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
  }, [
    urlParams.naceRegionIdString,
    urlParams.esgFactor,
    urlParams.yearStart,
    urlParams.yearEnd,
  ]);

  // Render components
  return (
    <>
      {esgFactorList && regionList && naceList ? (
        <ChartPageHeaderContainer>
          <ChartPageHeaderComponent
            regionList={regionList}
            naceList={naceList}
            esgFactorList={esgFactorList}
            urlParams={urlParams}
          />
        </ChartPageHeaderContainer>
      ) : null}
      <ContentContainer>
        <ChartPageContainer>
          {loading ? (
            <h1>Laster...</h1>
          ) : error ? (
            /* TODO: Make error component */
            <h1 data-testid="error">Error: {error.message}</h1>
          ) : (
            <>
              {regionList && naceList && urlParams.naceRegionIdString ? (
                <NaceRegionCardContainer
                  regionList={regionList}
                  naceList={naceList}
                  urlParams={urlParams}
                />
              ) : null}
              <div>
                {naceRegionDataListList && naceRegionList ? (
                  <ChartView
                    naceRegionData={naceRegionDataListList}
                    esgFactor={urlParams.esgFactor}
                    naceRegionList={naceRegionList}
                    chosenTab={urlParams.chosenTab}
                    urlParams={urlParams}
                  />
                ) : null}
              </div>
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
