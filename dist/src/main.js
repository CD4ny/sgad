"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const express_1 = require("express");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    const apiPath = 'api';
    app.setGlobalPrefix(apiPath);
    if (process.env.ENV !== 'production') {
        const options = new swagger_1.DocumentBuilder()
            .setTitle('SGAD')
            .setDescription('')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
    }
    await app.listen(3000);
}
bootstrap().then(r => console.log(r));
//# sourceMappingURL=main.js.map