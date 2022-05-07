import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const defaultOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    exposedHeaders: null,
    allowedHeaders: null,
    maxAge: null,
    preflight: true,
    strictPreflight: true,
  };
  // app.setGlobalPrefix('api/v1')
  app.enableCors(defaultOptions);
  const options = new DocumentBuilder()
    .setTitle(`MediAssist Eligibility OOP  API`)
    .setDescription(`Eligibility API`)
    .setVersion(`1.0.0`)
    .addBearerAuth(
      {
        description: `Please enter token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'X_MA_KEY'
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const port = 3006;
  await app.listen(port, '0.0.0.0', () => console.log(`Application started on Port ${port}`));
}
bootstrap();
