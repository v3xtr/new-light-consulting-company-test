import { customLevels } from "#shared/constants/loggerLevels";
import winston from "winston";

winston.addColors(customLevels.colors);

export const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

    new winston.transports.File({ 
      filename: 'logs/cron.log', 
      level: 'cron',
      format: winston.format((info) => info.level === 'cron' ? info : false)()
    }),

    new winston.transports.File({ 
      filename: 'logs/info.log', 
      level: 'info',
      format: winston.format((info) => info.level === 'info' ? info : false)()
    }),

    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    ),
  }));
}
