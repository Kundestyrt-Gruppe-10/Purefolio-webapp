import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from '../GlobalProvider/GlobalProvider';

export const SearchResults: React.FC = () => {
  //const [result, setResult] = useState({});
  const { searchQuery, setRegionCodes } = useQuery();

  // TODO: Fix api call when backend CORS settings are updated

  const [hasError, setErrors] = useState(false);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([
    {
      regionID: 0,
      regionCode: 'DE',
      regionName: 'Default',
      area: 0,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/regions/');
      res
        .json()
        .then((res) => setRegions(res))
        .catch((err) => setErrors(err));
      setLoading(false);
    }

    void fetchData();
  }, []);

  if (loading === false) {
    const options = {
      keys: ['regionName'],
    };
    const fuse = new Fuse(regions, options);
    const res = fuse.search(searchQuery);
    const regionResults = res.map((region) => region.item);
    console.log(regionResults);
  }

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
              <li key={result.regionCode}>
                <button /*onClick={() => setRegionCodes([result.regionID])}*/>
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
