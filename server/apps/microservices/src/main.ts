import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { serverVersion } from 'apps/immich/src/constants/server_version.constant';
import { RedisIoAdapter } from '../../immich/src/middlewares/redis-io.adapter.middleware';
import { MicroservicesModule } from './microservices.module';

interface Closable {
  close(): Promise<void>;
}

const closables: Closable[] = [];
const gracefullHandler = async () => {
  Logger.log('Immich Microservices is shutting down...');
  for (const closable of closables) {
    await closable.close();
  }
  process.exit(1);
};

process.on('SIGINT', gracefullHandler);
process.on('SIGTERM', gracefullHandler);

async function bootstrap() {
  const app = await NestFactory.create(MicroservicesModule);

  app.useWebSocketAdapter(new RedisIoAdapter(app));

  closables.push(app);
  await app.listen(3002, () => {
    if (process.env.NODE_ENV == 'development') {
      Logger.log(
        `Running Immich Microservices in DEVELOPMENT environment - version ${serverVersion.major}.${serverVersion.minor}.${serverVersion.patch}`,
        'ImmichMicroservice',
      );
    }

    if (process.env.NODE_ENV == 'production') {
      Logger.log(
        `Running Immich Microservices in PRODUCTION environment - version ${serverVersion.major}.${serverVersion.minor}.${serverVersion.patch}`,
        'ImmichMicroservice',
      );
    }
  });
}
bootstrap();
