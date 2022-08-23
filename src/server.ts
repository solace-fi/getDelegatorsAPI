import express from 'express';
import { ethers } from 'ethers';
import { getDelegator } from './utils';
const { isAddress } = ethers.utils;
import { logger } from './utils';

const app = express();
const port = process.env.PORT || 18123;

main();

async function main() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    logger.error(e);
    process.exit();
  }
}

// Endpoint for getDelegator function - /getDelegator?address=...
app.get('/getDelegator', async (req, res) => {
  try {
    const address = req.query.address;

    if (!address) {
      res.send('require /getDelegator?address=... input');
    } else {
      if (!isAddress(address.toString())) {
        res.send('not a valid Ethereum address');
      } else {
        const delegators = await getDelegator(address.toString());
        console.log(`getDelegator query for ${address}: ${delegators}`);
        res.send(delegators);
      }
    }
  } catch (e) {
    logger.error(`\n${new Date()}: GET request error for /getDelegator with query object ${req.query}`);
    logger.error(e);
    res.send(`GET request error to /getDelegator endpoint for ${req.query}`);
  }
});
