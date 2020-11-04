import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import {
  EuroStatTable,
  Nace,
  NaceRegion,
  NaceRegionData,
  Region,
} from '../../types';
import { ApiGet } from '../../utils/api';
import { ContentContainer } from '../../components/BaseLayout';
import { ChartView } from '../../components/ChartView/ChartView';
import { ChartPageHeaderComponent } from '../../components/ChartPageHeaderComponent/ChartPageHeaderComponent';
import { NaceRegionCardContainer } from '../../components/NaceRegionCard/NaceRegionCardContainer';
import {
  isValidEsgFactorIdString,
  naceRegionIdStringToList,
} from './helper-functions';
import { ErrorComponent } from '../../components/ErrorComponent/ErrorComponent';
import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';

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
  const [euData, setEuData] = useState<NaceRegionData[]>();
  const [naceRegionDataListList, setNaceRegionData] = useState<
    NaceRegionData[][]
  >();
  //TODO: Remove esgFactorList?
  const [esgFactorList, setEsgFactorList] = useState<string[]>();
  const [naceRegionList, setNaceRegionList] = useState<NaceRegion[]>([]);
  const [, /*eurostatTableList*/ setEurostatTableList] = useState<
    EuroStatTable[]
  >();
  const [esgFactorInfo, setEsgFactorInfo] = useState<EuroStatTable>();

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
  // Fetch EU data. Needed for OverviewTable and PercentageTable
  useEffect(() => {
    ApiGet<NaceRegionData[]>(`/naceregiondata/12/105`)
      .then((res) => setEuData(res))
      .catch((err) => setError(err));
  }, []);
  // TODO: Split up in multiple useEffect chunks?
  useEffect(() => {
    async function fetchData() {
      return await Promise.all([
        ApiGet<EuroStatTable[]>('/tables')
          .then((res) => {
            setEurostatTableList(res);
            console.log(res);
            const esgFactorInfo = res.find(
              (r) => r.attributeName === props.esgFactor,
            );
            if (!esgFactorInfo) throw new Error('No esgFactorInfo Found');
            setEsgFactorInfo(esgFactorInfo);
            // Fetch data from API
            console.log(esgFactorInfo);
          })
          .catch((err) => setError(err)),

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

  console.log(urlParams);

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
            <LoadingComponent />
          ) : error ? (
            <ErrorComponent error={error} />
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
                {naceRegionDataListList &&
                naceRegionList &&
                esgFactorInfo &&
                euData ? (
                  <ChartView
                    naceRegionData={naceRegionDataListList}
                    euData={euData}
                    naceRegionList={naceRegionList}
                    esgFactorInfo={esgFactorInfo}
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

const ChartPageContainer = styled.div`
  grid-template-rows: [card-start] 200px [card-stop chart-start] 500px [chart-stop];
`;
