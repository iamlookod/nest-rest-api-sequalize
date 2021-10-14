import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import configuration from '../config/configuration';
import { Logger, LoggerOptions } from '../logger/logger.service';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        ...configuration().database,
        models: [path.resolve(__dirname, '..') + '/**/model/*.model.*'],
        modelMatch: (filename, member) => {
          return (
            filename.substring(0, filename.indexOf('.model')) ===
            member.toLowerCase()
          );
        },
      });

      const logger = new Logger('Database', LoggerOptions);

      sequelize
        .authenticate()
        .then(() => logger.log('Database conneted'))
        .catch((err) => {
          logger.error('Database cannot connect', JSON.stringify(err));
        });

      return sequelize;
    },
  },
];
