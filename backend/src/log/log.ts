// eslint-disable-next-line import/no-extraneous-dependencies
import winston from 'winston';

const getLogger = (production: boolean) => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
    transports: [
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/combined.log' }),
    ],
  });

  if (production) {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return logger;
};

export default getLogger;
