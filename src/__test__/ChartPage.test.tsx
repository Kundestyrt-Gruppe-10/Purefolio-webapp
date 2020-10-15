import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { naces } from '../mockData';
import {
  isValidNaceRegionIdString,
  naceRegionIdStringToList,
} from '../pages/ChartPage/ChartPage';

// TODO: Fix eslint
/*eslint-disable*/

// TODO: Implement msw properly
const server = setupServer(
  // Describe the requests to mock.

  rest.get('/naces', (req, res, ctx) => {
    return res(ctx.json(naces));
  }),
);

beforeAll(() => {
  // Establish requests interception layer before all tests.

  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this

  // interception layer from affecting irrelevant tests.

  server.close();
});
/*eslint-enable*/

test('renders a book data', () => {
  // Render components, perform requests, API communication is covered.
});

describe('Function: isValidNaceRegionIdString', () => {
  it('Works on simple input', () => {
    expect(isValidNaceRegionIdString('1,1')).toBeTruthy();
  });
  it('Works on array of input', () => {
    expect(isValidNaceRegionIdString('5,5;2,2;3,3')).toBeTruthy();
  });
  it('Fails on wrong input: IE letters', () => {
    expect(isValidNaceRegionIdString('2,2;a,a;e,e')).toBeFalsy();
  });
});
describe('Function: isValidEsgFactorString', () => {
  it('Works on simple input', () => {
    expect(isValidNaceRegionIdString('155')).toBeTruthy();
  });
  it('Fails on wrong input: IE letters', () => {
    expect(isValidNaceRegionIdString('123a')).toBeFalsy();
  });
});

describe('Function: naceRegionIdStringToListOrThrow404', () => {
  it('Returns list of number given correct input', () => {
    expect(naceRegionIdStringToList('1,1;4,4;2,2')).toEqual([
      [1, 1],
      [4, 4],
      [2, 2],
    ]);
  });
  it('Redirects on wrong input', () => {
    expect(() => {
      naceRegionIdStringToList('1,ae,22');
    }).toThrow('Illegal argument');
  });
});

// TODO: E2E tests with msw does not work in a browserless environment
// Mabye use cypress?
/*eslint-disable*/
/*
describe('Chartpage routing', () => {
  it('Works on correct route', () => {
    const history = createMemoryHistory();
    history.push('/chartpage/1,1/1');
    const document = render(
      <Router history={history}>
        <ChartPage naceRegionIdString="1,1" esgFactor="1" />
      </Router>,
    );

    expect(document.findByTestId('error')).toBeUndefined();
  });
});

*/
