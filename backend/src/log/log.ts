import { env } from 'process';
import winston from 'winston';

const logger = winston.createLogger({
  level: env['LOG_LEVEL'] ?? 'error',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

export default logger;
