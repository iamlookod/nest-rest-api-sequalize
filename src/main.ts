import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import configuration from './app/config/configuration';
import { Logger, LoggerOptions } from './app/logger/logger.service';

async function bootstrap() {
  const { port } = configuration();

  const logger = new Logger('NestApplication', LoggerOptions);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: 'warn',
      },
    }),
  );

  app.setGlobalPrefix('/api');

  await app.listen(port, (err, address) => {
    if (err) {
      logger.error(err);
      app.close();
    }

    logger.log(`Listening at ${address}`);
    logger.log(`Environment at ${configuration().env}`);
  });
}
bootstrap();
