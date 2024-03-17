import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';

dotenv.config();

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    const apiPath : string = 'api';
    app.setGlobalPrefix(apiPath);
    if (process.env.ENV !== 'production') {
        const options = new DocumentBuilder()
            .setTitle('SGAD')
            .setDescription('')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api/docs', app, document);
    }
    await app.listen(3000);
}

bootstrap().then(r => console.log(r));
