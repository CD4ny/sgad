import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// @ts-ignore
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import 'dotenv/config';
import { json, urlencoded } from 'express';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
// @ts-ignore
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import session from 'express-session';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  const apiPath: string = 'api';
  app.setGlobalPrefix(apiPath);
  if (process.env.SWAGGER !== 'false') {
    const options = new DocumentBuilder()
      .setTitle('SGAD')
      .setDescription('')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth', // This name is important for matching with @ApiBearerAuth() in your controllera
      )
      .build();


    const theme = new SwaggerTheme();
    const customOptions: SwaggerCustomOptions = {
      customSiteTitle: 'Your API Docs',
      swaggerOptions: {
        jsonEditor: true,
      },
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    };
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document, customOptions);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        console.error('Validation errors:', JSON.stringify(errors));
        return new BadRequestException(errors);
      },
    }),
  );


  await app.listen(process.env.PORT || 5000);
}

bootstrap().then(r => console.log('Listening port:' + (process.env.PORT || 5000)));
