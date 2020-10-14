import React, { useEffect, useState } from 'react';
import { OverviewTableComponent } from '../../components/OverviewTableComponent/OverviewTable';
import { Redirect } from 'react-router-dom';
import { Nace, Region } from '../../types';
import { ApiGet } from '../../utils/api';

interface UrlParams {
  naceRegionIdString: string;
  esgFactor: string;
}

export const ChartPage: React.FC<UrlParams> = ({
  naceRegionIdString,
  esgFactor,
}) => {
  // ----States----
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(true);
  const [regionList, setRegionList] = useState<Region[]>();
  const [naceList, setNaceList] = useState<Nace[]>();

  let naceRegionIdList: number[];
  // Check if correct URL and parse URL string
  try {
    naceRegionIdList = naceRegionIdStringToListOrThrow404(naceRegionIdString);
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

      // TODO: Fetch naceregionData
      //naceRegionIdList.map(nace)

      setLoading(false);
    }

    void fetchData();
  }, [naceRegionIdString, esgFactor]);

  // Render components
  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : error ? (
        /* TODO: Make error component */
        <h1>Error: {error.message}</h1>
      ) : (
        <>
          <h1>
            {regionList ? regionList[0].regionName : null}
            {naceList ? naceList[0].naceName : null}
          </h1>
          <OverviewTableComponent />
        </>
      )}
      {/**TODO: ChartPageHeader */}

      {/**TODO: NaceRegionCardContainer*/}

      {/**TODO: ChartView*/}
    </>
  );
};

export const isValidNaceRegionIdString = (naceRegionIdString: string) => {
  return /^[0-9,.]*$/.test(naceRegionIdString);
};

/**
 * Input: '1,2,3,4,5'
 * Output: [1,2,3,4,5]
 */
export const naceRegionIdStringToListOrThrow404 = (
  naceRegionIdString: string,
): number[] => {
  if (!isValidNaceRegionIdString(naceRegionIdString)) {
    throw new Error('Illegal argument');
  }
  return naceRegionIdString.split(',').map(Number);
};
