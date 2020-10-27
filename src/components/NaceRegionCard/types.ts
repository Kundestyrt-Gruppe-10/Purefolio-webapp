import { Nace, Region } from '../../types';

export interface NaceRegionCardInterface {
  id: number;
  regionList: Region[];
  naceList: Nace[];
  naceId: number;
  regionId: number;
  setNaceRegionId(regionId: number, naceId: number, cardId: number): void;
  addCard(regionId: number, naceId: number): void;
  deleteCard(id: number): void;
}

export interface NaceRegionContainerInterface {
  regionList: Region[];
  naceList: Nace[];
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
  chosenTab: string;
  setUrlParams(
    naceRegionIdList: string,
    esgFactor: string,
    chosenTab: string,
  ): void;
  naceRegionIdList: number[][];
}

export interface SelectItemInterface {
  label: string;
  value: number;
}
