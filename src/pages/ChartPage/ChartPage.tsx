import React, { useEffect, useState } from 'react';
import { OverviewTableComponent } from '../../components/OverviewTableComponent/OverviewTable';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Nace, NaceRegionData, Region } from '../../types';
import { ApiGet } from '../../utils/api';

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
  const [naceRegionData, setNaceRegionData] = useState<NaceRegionData[]>();
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
      /* 
      ApiGet<string[]>('/tables/esg-factors')
        .then((res) => setEsgFactorList(res))
        .catch((err) => setError(err));
 */
      naceRegionIdList.map((naceId) =>
        ApiGet<NaceRegionData[]>(`/naceregiondata/${naceId[0]}/${naceId[1]}`)
          .then((res) => setNaceRegionData(res))
          .catch((err) => {
            console.log(err);
            setError(err);
          }),
      );

      setLoading(false);
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
      {loading ? (
        <h1>Laster...</h1>
      ) : error ? (
        /* TODO: Make error component */
        <h1 data-testid="error">Error: {error.message}</h1>
      ) : (
        <>
          <h1>
            {regionList && regionList[0] ? regionList[0].regionName : null}
            {naceList && naceList[0] ? naceList[0].naceName : null}
            {esgFactorIdString}
          </h1>
          <ul>
            {naceRegionData?.map((data) => (
              <li key={data.naceRegionDataId}>
                Emission: {data.emissionPerYear} Year:{data.year}
              </li>
            ))}
          </ul>
          <button onClick={() => setUrlParams('2,2', '2')}>Click me! </button>
          <OverviewTableComponent />
        </>
      )}
      {/**TODO: ChartPageHeader */}

      {/**TODO: NaceRegionCardContainer*/}

      {/**TODO: ChartView*/}
    </>
  );
};
