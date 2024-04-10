import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configAsyncLoader } from 'src/config-async-loader';
import { OptionsFactory } from 'src/options-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const DB_HOST = configService.get('DB_HOST');
        const DB_PORT = configService.get('DB_PORT');
        const DB_USERNAME = configService.get('DB_USERNAME');
        const DB_PASSWORD = configService.get('DB_PASSWORD');
        const DB_NAME = configService.get('DB_NAME');

        console.log('=======================================================');
        console.log('This is sync .env file via imports, useFactory, inject:');
        console.log(
          [DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME].join('\n'),
        );
        console.log('=======================================================');

        return {
          type: 'mysql',
          host: DB_HOST,
          port: parseInt(DB_PORT),
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_NAME,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class SyncAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configAsyncLoader],
      ignoreEnvFile: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const DB_HOST = configService.get('DB_HOST');
        const DB_PORT = configService.get('DB_PORT');
        const DB_USERNAME = configService.get('DB_USERNAME');
        const DB_PASSWORD = configService.get('DB_PASSWORD');
        const DB_NAME = configService.get('DB_NAME');

        console.log('=======================================================');
        console.log('This is async loader via imports, useFactory, inject:');
        console.log(
          [DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME].join('\n'),
        );
        console.log('=======================================================');

        return {
          type: 'mysql',
          host: DB_HOST,
          port: parseInt(DB_PORT),
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_NAME,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AsyncConfigInject {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configAsyncLoader],
      ignoreEnvFile: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: OptionsFactory,
    }),
  ],
})
export class AsyncConfigAsService {}
