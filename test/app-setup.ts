import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

let app: INestApplication<App> | null = null;

export async function createTheApp(): Promise<INestApplication<App>> {
    if (app) return app;

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            // forbidNonWhitelisted: true,
        })
    );
    await app.init();

    return app;
}

export async function closeApp(): Promise<void> {
    if (app) {
        await app.close();
        app = null;
    }
}
