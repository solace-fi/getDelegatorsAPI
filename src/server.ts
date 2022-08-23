import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { getDelegators } from './utils';
const { isAddress } = ethers.utils;
import { logger } from './utils';

const app = express();
const port = process.env.PORT || 18123;

// runServer();

export async function runServer() {
  try {
    app.use(cors());
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    logger.error(e);
    process.exit();
  }
}

// Endpoint for getDelegator function - /getDelegator?address=...
app.get('/getDelegators', async (req, res) => {
  try {
    const address = req.query.address;

    if (!address) {
      res.send('require /getDelegators?address=... input');
    } else {
      if (!isAddress(address.toString())) {
        res.send('not a valid Ethereum address');
      } else {
        const delegators = await getDelegators(address.toString());
        console.log(`getDelegators query for ${address}: ${delegators}`);
        res.send(delegators);
      }
    }
  } catch (e) {
    logger.error(`\n${new Date()}: GET request error for /getDelegators with query object ${req.query}`);
    logger.error(e);
    res.send(`GET request error to /getDelegators endpoint for ${req.query}`);
  }
});
