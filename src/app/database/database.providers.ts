import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import configuration from '../config/configuration';

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

      sequelize
        .authenticate()
        .then(() => console.log('Database conneted'))
        .catch((err) => {
          console.log('Database cannot connect', JSON.stringify(err));
        });

      return sequelize;
    },
  },
];
