import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { FooterComponent } from '../components/FooterComponent/FooterComponent';
let documentBody: RenderResult;

describe('<FooterComponent />', () => {
  beforeEach(() => {
    documentBody = render(<FooterComponent />);
  });
  it('Matches snapshot', () => {
    expect(documentBody).toMatchSnapshot();
  });
});
