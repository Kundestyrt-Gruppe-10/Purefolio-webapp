import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { naces } from '../mockData';
import {
  isValidNaceRegionIdString,
  ChartPage,
  naceRegionIdStringToListOrThrow404,
} from '../pages/ChartPage/ChartPage';

// TODO: Fix eslint
/*eslint-disable*/
const server = setupServer(
  // Describe the requests to mock.

  rest.get('/naces', (req, res, ctx) => {
    return res(ctx.json(naces));
  }),
);
/*eslint-enable*/

beforeAll(() => {
  // Establish requests interception layer before all tests.

  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this

  // interception layer from affecting irrelevant tests.

  server.close();
});

test('renders a book data', () => {
  // Render components, perform requests, API communication is covered.
});

describe('Function: isValidNaceRegionIdString', () => {
  it('Works on simple input', () => {
    expect(isValidNaceRegionIdString('55')).toBeTruthy();
  });
  it('Works on array of input', () => {
    expect(isValidNaceRegionIdString('55,22,33')).toBeTruthy();
  });
  it('Fails on wrong input: IE letters', () => {
    expect(isValidNaceRegionIdString('22,aa,ee')).toBeFalsy();
  });
});

describe('Function: naceRegionIdStringToListOrThrow404', () => {
  it('Returns list of number given correct input', () => {
    expect(naceRegionIdStringToListOrThrow404('1,44,22')).toEqual([1, 44, 22]);
  });
  it('Redirects on wrong input', () => {
    expect(() => {
      naceRegionIdStringToListOrThrow404('1,ssae,22');
    }).toThrow('Illegal argument');
  });
});
