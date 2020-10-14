export interface Nace {
  naceId: number;
  naceCode: string;
  naceName: string;
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