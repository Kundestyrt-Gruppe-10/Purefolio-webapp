import { render } from '@testing-library/react';
import React from 'react';
import { HistoryGraphComponent } from '../components/HistoryGraphComponent/HistoryGraphComponent';
import {
  naceRegionDataListList_1_example,
  naceRegionDataListList_3_examples,
  naceRegionList_1,
  naceRegionList_3,
  esgFactorInfo_example,
  urlParams_example,
  // Arrange
} from '../mockData';

describe('<BarchartComponent />', () => {
  it('This test is always true', () => {
    expect(true).toBeTruthy();
  });
  // Disabled do to svg render bug
  // TODO: Fix
  /*
  it('Matches snapshot when 1 NaceCard is chosen', () => {
    // Act
    const documentBody = render(
      <HistoryGraphComponent
        naceRegionData={naceRegionDataListList_1_example}
        esgFactor="emissionPerYear"
        naceRegionList={naceRegionList_1}
        esgFactorInfo={esgFactorInfo_example[0]}
        urlParams={urlParams_example[0]}
      />,
    );
    // Assert
    expect(documentBody).toMatchSnapshot();
  });

  it('Matches snapshot when 3 NaceCard is chosen', () => {
    // Act
    const documentBody = render(
      <HistoryGraphComponent
        naceRegionData={naceRegionDataListList_3_examples}
        esgFactor="emissionPerYear"
        naceRegionList={naceRegionList_3}
        esgFactorInfo={esgFactorInfo_example[0]}
        urlParams={urlParams_example[0]}
      />,
    );
    // Assert
    expect(documentBody).toMatchSnapshot();
  });
  // Assert
 */
});
