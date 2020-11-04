import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
import { EsgFactor, EuroStatTable, Nace, Region } from '../../types';

export interface NaceRegionCardInterface {
  id: number;
  regionList: Region[];
  naceList: Nace[];
  naceId: number;
  regionId: number;
  esgFactorInfo: EuroStatTable;
  setNaceRegionId(regionId: number, naceId: number, cardId: number): void;
  addCard(regionId: number, naceId: number): void;
  deleteCard(id: number): void;
}

export interface NaceRegionContainerInterface {
  regionList: Region[];
  naceList: Nace[];
  urlParams: UrlParamsInterface;
  esgFactorInfo: EuroStatTable;
}

export interface SelectItemInterface {
  label: string;
  value: number;
}
