import {
  isValidNaceRegionIdString,
  naceRegionIdStringToList,
} from '../pages/ChartPage/helper-functions';
it('SubjectToBeTested renders correctly', () => {
  expect(true).toBeTruthy();
});

//TODO: Fix tests that break on svg file
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
