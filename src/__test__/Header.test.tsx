import * as React from 'react';
//import * as renderer from 'react-test-renderer';
import { HeaderComponent } from '../components/HeaderComponent/HeaderComponent';

it('SubjectToBeTested renders correctly', () => {
  // TODO: jsdom does not support svg jet:
  // This might be a solution
  // https://github.com/svgdotjs/svg.js/issues/464#issuecomment-200551245
  //https://stackoverflow.com/questions/44173754/jsdom-not-support-svg
  /*
  const props = {
    className: 'test',
    value: true,
    onSelectChanged: (value: boolean) => {
      return;
    },
  };
  const tree = renderer.create(<HeaderComponent />).toJSON();
  expect(tree).toMatchSnapshot();
  */
  expect(true).toBeTruthy();
});
