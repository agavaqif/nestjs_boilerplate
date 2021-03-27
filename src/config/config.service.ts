import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { loadEnvironmentVariables } from 'src/loader';

class ConfigService {
  constructor() {
    this.loadConfig();
  }

  async loadConfig() {
    await loadEnvironmentVariables();
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }

  public getJWTSecret(): string {
    return process.env.JWT_SECRET
  }
}

const configService = new ConfigService();
export { configService };
