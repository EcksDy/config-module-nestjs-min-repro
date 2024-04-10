import { NestFactory } from '@nestjs/core';
import {
  SyncAppModule,
  AsyncConfigInject,
  AsyncConfigAsService,
} from './app.module';

// async function BootstrapSyncConfig() {
//   const app = await NestFactory.create(SyncAppModule);
//   await app.listen(3000);
// }
// BootstrapSyncConfig();

async function BootstrapAsyncConfigInject() {
  const app = await NestFactory.create(AsyncConfigInject);
  await app.listen(3000);
}
BootstrapAsyncConfigInject();

// async function BootstrapAsyncConfigAsService() {
//   const app = await NestFactory.create(AsyncConfigAsService);
//   await app.listen(3000);
// }
// BootstrapAsyncConfigAsService();
