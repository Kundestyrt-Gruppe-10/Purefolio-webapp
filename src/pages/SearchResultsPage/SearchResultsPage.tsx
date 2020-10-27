import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from '../GlobalProvider/GlobalProvider';
import { getConfig } from '../../utils/config-utils';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

interface ResultInterface {
  id: number;
  name: string;
  label: string;
}

interface RegionInterface {
  regionId: number;
  regionCode: string;
  regionName: string;
  area: number;
}

interface NaceInterface {
  naceId: number;
  naceCode: string;
  naceName: string;
}

export const SearchResultsPage: React.FC = () => {
  const { searchQuery } = useQuery();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([
    {
      id: 0,
      name: 'Default',
      label: 'region',
    },
  ]);

  const options: Fuse.IFuseOptions<ResultInterface> = {
    keys: ['id', 'name', 'label'],
  };

  useEffect(() => {
    async function fetchData() {
      const regionRes = await fetch(getConfig().apiUrl + '/regions/');
      const naceRes = await fetch(getConfig().apiUrl + '/naces/');
      /*eslint-disable */
      const regionResObj: RegionInterface[] = await regionRes.json();
      const naceResObj: NaceInterface[] = await naceRes.json();
      /*eslint-enable */
      const formattedSearchList: ResultInterface[] = [];

      regionResObj.forEach((element) => {
        formattedSearchList.push({
          id: element.regionId,
          name: element.regionName,
          label: 'region',
        });
      });

      naceResObj.forEach((element) => {
        formattedSearchList.push({
          id: element.naceId,
          name: element.naceName,
          label: 'nace',
        });
      });

      const fuse = new Fuse(formattedSearchList, options);
      const searchResult = fuse.search(searchQuery);
      const finalResults = searchResult.map((element) => element.item);
      console.log(finalResults);
      setResults(finalResults);
      setLoading(false);
    }

    void fetchData();
  }, [searchQuery]);

  function handleClick(id: number, label: string) {
    let path = '';

    if (label === 'region') {
      path = `/chartpage/${id.toString()},1/emissionPerYear/1`;
    } else {
      path = `/chartpage/1,${id.toString()}/emissionPerYear/1`;
    }

    history.push(path);
  }

  if (loading === true) {
    return (
      <>
        {/* TODO:  Simple loading animation */}
        <p>Loading ...</p>
      </>
    );
  } else {
    return (
      <>
        <div style={{ marginTop: '60px' }}>
          {results.map((result) => {
            return (
              <div
                key={result.id.toString() + ' ' + result.label}
                style={{ marginBottom: 20 }}
              >
                <button onClick={() => handleClick(result.id, result.label)}>
                  {/* TODO:  On hover cursor and object change indicator, changes color for instance */}
                  <ElementTitle active={false}>{result.name}</ElementTitle>
                  <ElementType active={false}>
                    {
                      result.label.replace(/^\w/, (c) =>
                        c.toUpperCase(),
                      ) /* Convert the first letter of the string to uppercase */
                    }
                  </ElementType>
                </button>
                <hr />
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

const ElementTitle = styled.p<{ active: boolean }>`
  font-size: var(--font-size-large);
  margin-top: 30px;
  margin-bottom: 6px;
`;

const ElementType = styled.p<{ active: boolean }>`
  color: var(--sec-purple-color);
  margin-top: 6px;
  margin-bottom: 30px;
`;
