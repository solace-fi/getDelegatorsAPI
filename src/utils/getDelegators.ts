import { DELEGATE_MAP_CACHE_PATH } from '../constants';
import { logger } from '.';
import * as fs from 'fs';

export async function getDelegators(address: string): Promise<Array<string>> {
  let delegators: Array<string> = []; // eslint-disable-line prefer-const
  let delegateMap: { [voter: string]: string } = Object.create(null);

  try {
    delegateMap = JSON.parse(fs.readFileSync(DELEGATE_MAP_CACHE_PATH).toString());
  } catch {
    logger.error('Error reading delegate map cache');
    return delegators;
  }

  for (const voter in delegateMap) {
    if (delegateMap[voter] == address) {
      delegators.push(voter);
    }
  }

  return delegators;
}
