import React from 'react';
import Fuse from 'fuse.js';
import { useQuery } from '../GlobalProvider/GlobalProvider';

const data = [
  { regionCode: 1, regionName: 'Norway' },
  { regionCode: 2, regionName: 'Sweden' },
  { regionCode: 3, regionName: 'Denmark' },
  { regionCode: 4, regionName: 'Finland' },
];
/*fetchCountries(){
  fetch('https://purefolio-backend-test.azurewebsites.net/regions')
  .then(res => res.json())
  .then(data => this.setState({data:data}));
  console.log("Data: ", this.state.data);
}*/

export const SearchResults: React.FC = () => {
  //const [result, setResult] = useState({});
  const { searchQuery, regionCodes, setRegionCodes } = useQuery();

  const options = {
    keys: ['regionName'],
  };
  const fuse = new Fuse(data, options);
  const res = fuse.search(searchQuery);
  const regionResult = res.map((region) => region.item);

  console.log(regionCodes);

  return (
    <>
      <ul>
        {regionResult.map((result) => {
          return (
            <li key={result.regionCode}>
              <button onClick={() => setRegionCodes([result.regionCode])}>
                {result.regionName}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
