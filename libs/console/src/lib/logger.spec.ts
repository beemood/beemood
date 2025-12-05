import { Logger } from './logger.js';

describe('Logger', () => {
  it('should create a logger and log', () => {
    const logger = new Logger('Context');

    logger.error('Error log');
    logger.error('Error log', 'sub');
    logger.info('Info log');
    logger.info('Info log', 'sub');
    logger.log('Some log');
    logger.log('Some log', 'sub');
    logger.warn('Warn log');
    logger.warn('Warn log', 'sub');
  });
});
