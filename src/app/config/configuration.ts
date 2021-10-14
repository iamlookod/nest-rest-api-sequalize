import { SequelizeOptions } from 'sequelize-typescript';
export interface IConfig {
  env: string;
  port: number;
  jwtSecret: string;
  serviceName: string;
  redis: {
    host: string;
    port: number;
  };
  database: SequelizeOptions;
}

export default (): IConfig => ({
  env: process.env.NODE_ENV || 'developement',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
  serviceName: process.env.SERVICE_NAME || '',
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  database: {
    pool: {
      max: 300,
      min: 0,
      acquire: 30000,
      idle: 30000,
    },
    logging: false,
    replication: {
      read: [
        {
          host: process.env.DB_HOST_READ || 'localhost',
          port: parseInt(process.env.DB_PORT, 10) || 5432,
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || 'postgres',
        },
      ],
      write: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'postgres',
      },
    },
  },
});
