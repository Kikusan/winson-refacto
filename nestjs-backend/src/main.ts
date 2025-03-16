import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription(`Documentation de l'API NestJS`)
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: process.env.FRONT_END_HOST,  // Permet les requêtes provenant de http://localhost:3000
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Permet la transformation des données entrantes en type approprié
    whitelist: true, // Ignore les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, // Renvoie une erreur 400 si des propriétés non autorisées sont envoyées
  }));
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(4000);
}
bootstrap();