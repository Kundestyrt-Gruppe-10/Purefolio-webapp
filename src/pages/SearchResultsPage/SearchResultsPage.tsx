import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from '../GlobalProvider/GlobalProvider';

interface ResultInterface {
  regionID: number;
  regionCode: string;
  regionName: string;
  area: number;
}

export const SearchResultsPage: React.FC = () => {
  const { searchQuery } = useQuery();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([
    {
      regionID: 0,
      regionCode: 'DE',
      regionName: 'Default',
      area: 0,
    },
  ]);

  const options: Fuse.IFuseOptions<ResultInterface> = {
    keys: ['regionName'],
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/regions/');
      /*eslint-disable */
      const ResObj: ResultInterface[] = await res.json();
      /*eslint-enable */

      const fuse = new Fuse(ResObj, options);
      const searchResult = fuse.search(searchQuery);
      const regionResults = searchResult.map((region) => region.item);
      setResults(regionResults);
      setLoading(false);
    }

    void fetchData();
  }, [searchQuery]);

  if (loading === true) {
    return (
      <>
        <p>Loading ...</p>
      </>
    );
  } else {
    return (
      <>
        <ul>
          {results.map((result) => {
            return (
              <li key={result.regionCode} style={{ marginBottom: 20 }}>
                <button /*onClick={() => setRegionCodes([result.regionID])}*/>
                  {' '}
                  {/* TODO: Set region code when real data is ready */}
                  {result.regionName}
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
};
