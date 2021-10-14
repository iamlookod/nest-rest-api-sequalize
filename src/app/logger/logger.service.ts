import { ConsoleLogger, ConsoleLoggerOptions, LogLevel } from '@nestjs/common';
import configuration from '../config/configuration';

export class Logger extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    const argArray: Array<any> = [message];
    if (context) {
      argArray.push(context);
    }
    super.log.apply(this, argArray);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, stack?: string, context?: string) {
    const argArray: Array<any> = [message];
    if (stack) {
      argArray.push(stack);
    }
    if (context) {
      argArray.push(context);
    }
    super.error.apply(this, argArray);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string) {
    const argArray: Array<any> = [message];
    if (context) {
      argArray.push(context);
    }
    super.warn.apply(this, argArray);
  }
}

export const LoggerLevel: LogLevel[] =
  configuration().env === 'production'
    ? ['log', 'error', 'warn']
    : ['log', 'error', 'warn', 'debug', 'verbose'];
export const LoggerOptions: ConsoleLoggerOptions = {
  logLevels: LoggerLevel,
  timestamp: true,
};
