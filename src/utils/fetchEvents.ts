import { Contract, Event, EventFilter, providers } from 'ethers';
import { logger } from './';

export async function fetchEvents(
  contract: Contract,
  eventFilter: EventFilter,
  startBlock: providers.BlockTag,
  endBlock: providers.BlockTag
): Promise<Array<Event>> {
  if (endBlock == 'latest') endBlock = await contract.provider.getBlockNumber();

  // ENSURE startBlock and endBlock consist of only digits after this point
  const isNum1 = /^\d+$/.test(startBlock.toString());
  const isNum2 = /^\d+$/.test(endBlock.toString());
  if (!isNum1 || !isNum2) {
    logger.error('Error: Did not provide string with only digits for startBlock or endBlock');
    throw 'Error: Did not provide string with only digits for startBlock or endBlock';
  }

  try {
    const events = await contract.queryFilter(eventFilter, startBlock, endBlock);
    return events;
  } catch (e) {
    // ERROR => RECURSIVE CALLS INTO TWO HALVES OF ORIGINAL BLOCK INTERVAL
    let errorString = 'Unknown Error';
    if (e instanceof Error) errorString = e.toString();

    // CHECK FOR ERROR TYPE
    if (
      !errorString.includes('10K') &&
      !errorString.includes('1000 results') &&
      !errorString.includes('statement timeout') &&
      !errorString.includes('response size exceeded')
    ) {
      logger.error('errorString: ', errorString);
      logger.error(e);
      return [];
    }

    // RECURSIVE CALLS
    const midBlock = Math.floor((parseInt(startBlock.toString(), 10) + parseInt(endBlock.toString(), 10)) / 2);

    const [left, right] = await Promise.all([
      fetchEvents(contract, eventFilter, startBlock, midBlock),
      fetchEvents(contract, eventFilter, midBlock + 1, endBlock),
    ]);

    const events = left.concat(right);
    return events;
  }
}
