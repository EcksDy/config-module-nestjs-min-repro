import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class OptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    console.log('this.configService', this.configService);
  }

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const DB_HOST = this.configService.get('DB_HOST');
    const DB_PORT = this.configService.get('DB_PORT');
    const DB_USERNAME = this.configService.get('DB_USERNAME');
    const DB_PASSWORD = this.configService.get('DB_PASSWORD');
    const DB_NAME = this.configService.get('DB_NAME');

    console.log('=======================================================');
    console.log('This is async loader via AsyncConfigService:');
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
  }
}
