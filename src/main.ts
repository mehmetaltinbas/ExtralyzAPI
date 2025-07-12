import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 4001;
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            // forbidNonWhitelisted: true,
        })
    );
    console.log(`Server is running on http://localhost:${port}`);
    await app.listen(port);
}
bootstrap();
