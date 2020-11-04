export interface Nace {
  naceId: number;
  naceCode: string;
  naceName: string;
}
export interface NaceHasData {
  naceId: number;
  naceCode: string;
  naceName: string;
  hasData: boolean;
}

export interface RegionHasData {
  regionId: number;
  regionCode: string;
  regionName: string;
  hasData: boolean;
}
export interface EuroStatTable {
  tableId: number;
  tableCode?: string;
  attributeName?: string;
  filters?: string;
  dataType?: string;
  unit?: string;
  datasetName?: string;
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
  employeesLowWage?: number;
  hoursPaidAndNot?: number;
  hoursWorkWeek?: number;
  jobVacancyRate?: number;
  trainingParticipation?: number;
  totalWaste?: number;
  totalHazardousWaste?: number;
  totalNonHazardousWaste?: number;
  environmentalProtectionPollution?: number;
  environmentalProtectionTech?: number;
  seasonalWork?: number;
  supplyEnergyProducts?: number;
  supplyEnergyResiduals?: number;
  useNaturalEnergyInputs?: number;
  useEnergyProducts?: number;
  useEnergyResiduals?: number;
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
  'employeesLowWage',
  'hoursPaidAndNot',
  'hoursWorkWeek',
  'jobVacancyRate',
  'trainingParticipation',
  'totalWaste',
  'totalHazardousWaste',
  'totalNonHazardousWaste',
  'environmentalProtectionPollution',
  'environmentalProtectionTech',
  'seasonalWork',
  'supplyEnergyProducts',
  'supplyEnergyResiduals',
  'useNaturalEnergyInputs',
  'useEnergyProducts',
  'useEnergyResiduals',
}
