export interface Nace {
  naceId: number;
  naceCode: string;
  naceName: string;
}
export interface EuroStatTable {
  tableId: number;
  tableCode?: string;
  attributeName?: string;
  filters?: string;
  dataType?: string;
  unit?: string;
  dataSetName?: string;
  esgFactor?: string;
  description?: string;
  href?: string;
}

export interface NaceRegionData {
  naceRegionDataId: number;
  nace: Nace;
  naceId: number;
  region: Region;
  regionId: number;
  year: number;
  emissionPerYear?: number;
  genderPayGap?: number;
  workAccidentsIncidentRate?: number;
  environmentTaxes?: number;
  fatalAccidentsAtWork?: number;
  temporaryemployment?: number;
  employeesPrimaryEducation?: number;
  employeesSecondaryEducation?: number;
  employeesTertiaryEducation?: number;
}

export interface Region {
  regionId: number;
  regionCode: string;
  regionName: string;
  area: number;
}

export interface RegionData {
  regionDataId: number;
  regionId: number;
  region: Region;
  year: number;
  population?: number;
  gdp?: number;
  corruptionRate?: number;
}

export interface NaceRegion {
  nace: Nace;
  region: Region;
}

export enum EsgFactor {
  'emissionPerYear',
  'workAccidentsIncidentRate',
  'genderPayGap',
  'environmentTaxes',
  'fatalAccidentsAtWork',
  'temporaryemployment',
  'employeesPrimaryEducation',
  'employeesSecondaryEducation',
  'employeesTertiaryEducation',
}
