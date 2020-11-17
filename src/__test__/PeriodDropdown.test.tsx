import { fireEvent, render, screen } from '@testing-library/react';
import { PeriodDropdown } from '../components/ChartPageHeaderComponent/PeriodDropDownComponent';
import React from 'react';
import { urlParams_example } from '../mockData';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
const urlParams = urlParams_example[0];

const years: string[] = [
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
];

describe('PerioDropDownComponent', () => {
  beforeEach(() => {
    render(
      <PeriodDropdown
        yearList={years}
        periodStart={true}
        setValue="2018"
        urlParams={urlParams}
      />,
    );
  });
  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    urlParams.setUrlParams = handleClick;

    fireEvent.click(screen.getByText(/2018/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('Can search complete word', () => {
    const handleClick = jest.fn();
    urlParams.setUrlParams = handleClick;

    void userEvent.type(screen.getByRole('textbox'), '2014{enter}');
    expect(screen.getByRole('textbox')).toHaveValue('2014');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
