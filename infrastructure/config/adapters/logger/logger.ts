import { customLevels } from "#shared/constants/loggerLevels.js";
import winston from "winston";

winston.addColors(customLevels.colors);

export const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    
    new winston.transports.File({ 
      filename: 'cron.log', 
      level: 'cron',
      format: winston.format((info) => {
        return info.level === 'cron' ? info : false;
      })()
    }),

    new winston.transports.File({ 
      filename: 'info.log', 
      level: 'info',
      format: winston.format((info) => {
        return info.level === 'info' ? info : false;
      })()
    }),

    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
