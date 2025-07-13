import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import {} from '../src/auth/models/auth-dtos';
import { SignInResponse } from '../src/auth/models/auth-responses';

describe('Auth', () => {
    let app: INestApplication<App>;
    let jwt: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should signin', async () => {
        const response = await request(app.getHttpServer())
            .get('/auth/signin')
            .send({ userName: 'mehmetaltinbas', password: 'Mehmet+123' })
            .expect(200);
        const responseBody = response.body as SignInResponse;
        jwt = responseBody.jwt!;
    });

    it('should test a protected route', () => {
        return request(app.getHttpServer()).get('/auth/test').expect(200).expect(Object);
    });

    afterAll(async () => {
        await app.close();
    });
});
