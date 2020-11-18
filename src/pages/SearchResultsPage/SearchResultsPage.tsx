import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from '../GlobalProvider/GlobalProvider';
import { getConfig } from '../../utils/config-utils';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  ResultInterface,
  RegionInterface,
  NaceInterface,
} from '../../types/search';
import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';

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
      setResults(finalResults);
      setLoading(false);
    }

    void fetchData();
  }, [searchQuery]);

  function handleClick(id: number, label: string) {
    let path = '';
    if (label === 'region') {
      path = `/chartpage/${id.toString()},1/emissionPerYear/2015/2018/1`;
    } else {
      path = `/chartpage/1,${id.toString()}/emissionPerYear/2015/2018/1`;
    }
    history.push(path);
  }

  if (loading === true) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  } else {
    return (
      <>
        <div style={{ marginTop: '30px' }}>
          {results.map((result) => {
            return (
              <>
                <Result
                  key={result.id.toString() + ' ' + result.label}
                  style={{ paddingTop: 5, marginBottom: 0 }}
                  onClick={() => handleClick(result.id, result.label)}
                  active={false}
                >
                  {/* TODO:  On hover cursor and object change indicator, changes color for instance */}
                  <ElementTitle active={false}>{result.name}</ElementTitle>
                  <ElementType active={false}>
                    {
                      result.label.replace(/^\w/, (c) =>
                        c.toUpperCase(),
                      ) /* Convert the first letter of the string to uppercase */
                    }
                  </ElementType>
                </Result>
                <hr style={{ margin: 0, border: '0.1px black solid' }} />
              </>
            );
          })}
        </div>
      </>
    );
  }
};

const Result = styled.div<{ active: boolean }>`
  padding: 0 10px 5px 10px;
  &:hover {
    cursor: pointer;
    background: rgb(240, 240, 240);
  }
`;

const ElementTitle = styled.p<{ active: boolean }>`
  font-size: var(--font-size-large);
  padding-top: 30px;
  padding-bottom: 6px;
  margin: 0;
`;

const ElementType = styled.p<{ active: boolean }>`
  color: var(--sec-purple-color);
  padding-top: 6px;
  padding-bottom: 30px;
  margin: 0;
`;
