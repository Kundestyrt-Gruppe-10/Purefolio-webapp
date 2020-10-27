import { render } from '@testing-library/react';
import React from 'react';
import { BarchartComponent } from '../components/BarchartComponent/BarchartComponent';
import {
  naceRegionDataListList_1_example,
  naceRegionDataListList_3_examples,
  naceRegionList_1,
  naceRegionList_3,
  // Arrange
} from '../mockData';

describe('<BarchartComponent />', () => {
  it('Matches snapshot when 1 NaceCard is chosen', () => {
    // Act
    const documentBody = render(
      <BarchartComponent
        naceRegionData={naceRegionDataListList_1_example}
        esgFactor="emissionPerYear"
        naceRegionList={naceRegionList_1}
      />,
    );
    // Assert
    expect(documentBody).toMatchSnapshot();
  });

  it('Matches snapshot when 3 NaceCard is chosen', () => {
    // Act
    const documentBody = render(
      <BarchartComponent
        naceRegionData={naceRegionDataListList_3_examples}
        esgFactor="emissionPerYear"
        naceRegionList={naceRegionList_3}
      />,
    );
    // Assert
    expect(documentBody).toMatchSnapshot();
  });
  // Assert
});
