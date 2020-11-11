import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { HeaderComponent } from '../components/HeaderComponent/HeaderComponent';

describe('<HeaderComponent />', () => {
  beforeEach(() => {
    render(<HeaderComponent />);
  });
  it('Matches snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});
