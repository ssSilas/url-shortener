import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import config from 'config/db/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get(Sequelize);

  // use only in development environment
  await sequelize.sync({ alter: true });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET,PUT,POST,DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(config().portApp);
  console.log(` \n --- Running port: ${config().portApp} --- \n`);
}
bootstrap();
