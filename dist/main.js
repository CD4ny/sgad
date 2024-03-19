"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
require("dotenv/config");
const express_1 = require("express");
const swagger_themes_1 = require("swagger-themes");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.enableCors();
    const apiPath = 'api';
    app.setGlobalPrefix(apiPath);
    if (process.env.ENV !== 'production') {
        const options = new swagger_1.DocumentBuilder()
            .setTitle('SGAD')
            .setDescription('')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .build();
        const theme = new swagger_themes_1.SwaggerTheme();
        const customOptions = {
            customSiteTitle: 'Your API Docs',
            swaggerOptions: {
                jsonEditor: true,
            },
            customCss: theme.getBuffer(swagger_themes_1.SwaggerThemeNameEnum.DARK)
        };
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api/docs', app, document, customOptions);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            console.error('Validation errors:', JSON.stringify(errors));
            return new common_1.BadRequestException(errors);
        },
    }));
    await app.listen(process.env.PORT || 5000);
}
bootstrap().then(r => console.log("Listening a:" + (process.env.PORT || 5000)));
//# sourceMappingURL=main.js.map