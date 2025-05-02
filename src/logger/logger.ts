import * as winston from 'winston';
import colors from '@colors/colors';

import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config({ path: './env/.env'})

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    const msg = message as string;
    let colorizedMessage = message;
    switch(level) {
        case 'error' :
            colorizedMessage = colors.red(msg);
            break;
            case 'warn' :
                colorizedMessage = colors.yellow(msg);
                break;
                case 'info' :
                colorizedMessage = colors.green(msg);
                break;
    }
    return `${timestamp} ${level}: ${colorizedMessage}`;
});

// Create a logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine (
       winston.format.timestamp(),
       myFormat

    ),
    transports: [
        new winston.transports.Console()
    ]
})

export default logger;