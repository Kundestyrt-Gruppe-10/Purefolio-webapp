const useProductionApi = process.env.production;
const { REACT_APP_USE_PROD_API } = process.env;
export enum Environment {
  LOCAL = 'LOCAL',
  DEV = 'DEV',
  STAGING = 'STAGING',
  PROD = 'PROD',
}

interface IAppConfiguration {
  apiUrl: string;
  environment: Environment;
}

type IEnvToConfigMap = {
  [key in Environment]: IAppConfiguration;
};

const envToConfigMap: IEnvToConfigMap = {
  [Environment.LOCAL]: {
    apiUrl: 'http://localhost:5000',
    environment: Environment.LOCAL,
  },
  [Environment.DEV]: {
    apiUrl: '',
    environment: Environment.DEV,
  },
  [Environment.STAGING]: {
    apiUrl: 'https://purefolio-backend-test.azurewebsites.net',
    environment: Environment.STAGING,
  },
  [Environment.PROD]: {
    apiUrl: 'https://purefolio-backend-test.azurewebsites.net',
    environment: Environment.PROD,
  },
};

export const getEnvironment = (origin: string): Environment => {
  if (/^https:\/\/(www\.){0,1}dev/.test(origin)) {
    return Environment.DEV;
  } else if (/^https:\/\/(www\.){0,1}staging/.test(origin)) {
    return Environment.STAGING;
  } else if (/^https:\/\//.test(origin)) {
    return Environment.PROD;
  }

  return Environment.LOCAL;
};

export const getConfig = (
  origin: string = window.origin,
): IAppConfiguration => {
  console.log(REACT_APP_USE_PROD_API);
  const environment = getEnvironment(origin);
  if (REACT_APP_USE_PROD_API) {
    return envToConfigMap[Environment.PROD];
  }

  return envToConfigMap[environment];
};
