import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import configuration from './app/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('/api');

  await app.listen(configuration().port, (err, address) => {
    if (err) {
      console.error(err);
      app.close();
    }

    console.log(`Listening at ${address}`);
    console.log(`Environment at ${configuration().env}`);
  });
}
bootstrap();
