import React from 'react';
import {
  euData_example,
  naceRegionDataListList_1_example,
  naceRegionDataListList_3_examples,
  naceRegionList_1,
  urlParams_example,
} from '../mockData';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { ChartView } from '../components/ChartView/ChartView';
import { esgFactorInfo_example } from '../mockData';
import { render, screen } from '@testing-library/react';

describe('ChartView Tests', () => {
  beforeEach(() => {
    render(
      <ChartView
        esgFactorInfo={esgFactorInfo_example[0]}
        euData={euData_example}
        urlParams={urlParams_example[0]}
        euDataForAllChosenNaces={naceRegionDataListList_3_examples}
        naceRegionData={naceRegionDataListList_1_example}
        naceRegionList={naceRegionList_1}
      />,
    );
  });

  it('Tab navigating works', () => {
    screen.debug();
    const handleClick = jest.fn();
    void userEvent.click(screen.getByText('Bar Chart'));
  });
});
