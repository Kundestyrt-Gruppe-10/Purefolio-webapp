import { UrlParamsInterface } from '../../pages/ChartPage/ChartPage';
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
  urlParams: UrlParamsInterface;
}

export interface SelectItemInterface {
  label: string;
  value: number;
}
