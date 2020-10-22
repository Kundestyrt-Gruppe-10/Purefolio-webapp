import { Nace, Region } from '../../types';

export interface NaceRegionCardInterface {
  id: number;
  regionList: Region[];
  naceList: Nace[];
  naceId: number;
  regionId: number;
  setNaceRegionId(regionId: number, naceId: number, cardId: number): void;
  addCard(naceId: number, regionId: number): void;
  deleteCard(id: number): void;
}

export interface NaceRegionContainerInterface {
  regionList: Region[];
  naceList: Nace[];
  setUrlParams(naceRegionIdList: string, esgFactor: string): void;
  naceRegionIdList: number[][];
}

export interface SelectItemInterface {
  label: string;
  value: number;
}
