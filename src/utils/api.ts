import { getConfig } from './config-utils';

//const domain = getConfig().apiUrl;
const domain = 'https://purefolio-backend-test.azurewebsites.net/'; //getConfig().apiUrl;
// For the "unwrapping" variation

export function ApiGet<T>(path: string): Promise<T> {
  return fetch(domain + path).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
