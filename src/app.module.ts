import config from 'config/db/config';

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { UrlShortenerEntity } from './url-shortener/url-shortener.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config().database.host,
      port: config().database.port,
      username: config().database.user,
      password: config().database.pass,
      database: config().database.dbName,
      models: [UserEntity, UrlShortenerEntity],
      define: {
        timestamps: true,
        paranoid: true,
      },
    }),
    AuthModule,
    UserModule,
    UrlShortenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
