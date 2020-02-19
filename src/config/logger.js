import { LogglyTracker } from 'loggly-jslogger';

const logger = new LogglyTracker();

logger.push({ 'logglyKey': '53958527-ed89-4267-98a0-7ddbc5be1cbf' });

export default logger;