import cron from 'node-cron';
import { logger, saveDelegateMap } from './utils';

// Cronjob to update delegateMap cache every 5 minutes.
export async function runCronjob() {
  logger.info('Starting cronjob');

  cron.schedule('*/5 * * * *', async () => {
    logger.info('delegateMap caching attempt started');

    try {
      await saveDelegateMap();
      logger.info('Successful delegateMap caching attempt');
    } catch (e) {
      logger.error(e);
      logger.error('Failed delegateMap caching attempt');
    }
  });
}
