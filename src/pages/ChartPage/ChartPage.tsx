import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FooterComponent } from '../../components/FooterComponent/FooterComponent';

interface UrlParams {
  naceRegionIdString: string;
  esgFactor: string;
}

export const ChartPage: React.FC<UrlParams> = ({
  naceRegionIdString,
  esgFactor,
}) => {
  let naceRegionIdList: number[];
  try {
    naceRegionIdList = naceRegionIdStringToListOrThrow404(naceRegionIdString);
  } catch (error) {
    return <Redirect to="/404" />;
  }
  return (
    <>
      {/**TODO: ChartPageHeader */}

      {/**TODO: NaceRegionCardContainer*/}

      {/**TODO: ChartView*/}
    </>
  );
};

export const isValidNaceRegionIdString = (naceRegionIdString: string) => {
  return /^[0-9,.]*$/.test(naceRegionIdString);
};

/**
 * Input: '1,2,3,4,5'
 * Output: [1,2,3,4,5]
 */
export const naceRegionIdStringToListOrThrow404 = (
  naceRegionIdString: string,
): number[] => {
  if (!isValidNaceRegionIdString(naceRegionIdString)) {
    throw new Error('Illegal argument');
  }
  console.log(naceRegionIdString);
  console.log(isValidNaceRegionIdString(naceRegionIdString));
  return naceRegionIdString.split(',').map(Number);
};
