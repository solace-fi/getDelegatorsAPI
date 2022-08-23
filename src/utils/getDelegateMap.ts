import { fetchEvents } from '.';
import { providers, Contract } from 'ethers';
import 'dotenv/config';

const ABI = ['event DelegateSet(address indexed voter, address indexed delegate)'];
const provider = new providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new Contract(process.env.CONTRACT_ADDRESS || '', ABI, provider);

export async function getDelegateMap(): Promise<Map<string, string>> {
  const delegateMap: Map<string, string> = new Map();
  const filter = contract.filters.DelegateSet();
  const delegateSetEvents = await fetchEvents(contract, filter, 0, 'latest');

  // ENSURE EVENTS SORTED BY BLOCK NUMBER
  delegateSetEvents.sort(function (a, b) {
    if (a.blockNumber == b.blockNumber) {
      return a.transactionIndex - b.transactionIndex;
    } else {
      return a.blockNumber - b.blockNumber;
    }
  });

  // ITERATE THROUGH EVENTS
  for (const event of delegateSetEvents) {
    if (event.args) {
      const { voter, delegate } = event.args;
      delegateMap.set(voter, delegate);
    }
  }

  return delegateMap;
}
