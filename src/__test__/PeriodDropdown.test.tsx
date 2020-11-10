import { fireEvent, render, screen } from '@testing-library/react';
import { PeriodDropdown } from '../components/ChartPageHeaderComponent/PeriodDropDownComponent';
import React from 'react';
import { urlParams_example } from '../mockData';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
const urlParams = urlParams_example[0];

describe('PerioDropDownComponent', () => {
  beforeEach(() => {
    render(
      <PeriodDropdown
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
