import { getDelegateMap, logger, strMapToObj } from '.';
import * as fs from 'fs';
import { DELEGATE_MAP_CACHE_PATH } from '../constants';

export async function saveDelegateMap() {
  try {
    const delegateMap = await getDelegateMap();
    logger.info(`Successfully obtained delegate map with ${delegateMap.size} elements`);
    await fs.writeFileSync(DELEGATE_MAP_CACHE_PATH, JSON.stringify(strMapToObj(delegateMap)));
  } catch (e) {
    logger.error(e);
    logger.error('Failed to get delegateMap');
  }
}
