import { EsgFactor } from '../../types';

/**
 * Convert naceRegionIdList to a string that can be used to set URL params
 * @param naceRegionIdList
 */
export function naceRegionIdListToString(naceRegionIdList: number[][]): string {
  let naceRegionIdString = '';
  let naceIt, regionIt;
  for (naceIt = 0; naceIt < naceRegionIdList.length; naceIt++) {
    for (regionIt = 0; regionIt < naceRegionIdList[naceIt].length; regionIt++) {
      naceRegionIdString += naceRegionIdList[naceIt][regionIt].toString();
      if (regionIt + 1 != naceRegionIdList[naceIt].length) {
        naceRegionIdString += ',';
      }
    }
    if (naceIt + 1 != naceRegionIdList.length) {
      naceRegionIdString += ';';
    }
  }
  return naceRegionIdString;
}

/**
 * Checks if NaceRegionIdString string passed down from URL is
 * correctly formated.
 * @param naceRegionIdString
 */
export function isValidNaceRegionIdString(naceRegionIdString: string): boolean {
  return /^[0-9,.;]*$/.test(naceRegionIdString);
}
/**
 *
 * Checks if esgFactorString passed down from URL is
 * correctly formated.
 * @param esgFactorString
 */
export function isValidEsgFactorIdString(esgFactorString: string): boolean {
  if (esgFactorString in EsgFactor) return true;
  return false;
}
/**
 * Input: '11,12;21,22'
 * Output: [[11,12],[21,22]]
 */
export function naceRegionIdStringToList(
  naceRegionIdString: string,
): number[][] {
  if (!isValidNaceRegionIdString(naceRegionIdString)) {
    throw new Error('Illegal argument');
  }
  return naceRegionIdString.split(';').map((s) => s.split(',').map(Number));
}
