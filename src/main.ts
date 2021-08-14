import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀
  app.setGlobalPrefix('api');

  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //   })
  // )

  // 设置验证器
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // 白名单模式，必须设置，否则不存在于dto对象中的键值也会被使用
      whitelist: true,
      // forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
        // excludeExtraneousValues: true,
      },
    }),
  );

  if (process.env.NODE_ENV === 'develoment') {
    const options = new DocumentBuilder()
      .setTitle('微博 api文档')
      .setDescription('api文档')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(3333);
}
bootstrap();
