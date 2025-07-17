import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { SignInResponse } from '../src/auth/types/auth-responses';
import { SignInAuthTestData } from '../src/auth/types/auth-test-datas';
import { UserCredentialsTestData } from '../src/user/types/user-test-datas';
import { waitForUserSignUp } from './user.e2e-spec';

let authData: SignInAuthTestData = {
    jwt: '',
    userId: '',
};
let userCredentials: UserCredentialsTestData = {
    userName: 'mehmetaltinbas',
    email: 'altinbasmehmet.41@gmail.com',
    password: 'Mehmet+123',
};

let isContinue = false;
export async function readAuthData(): Promise<SignInAuthTestData> {
    while (!isContinue) {}
    return authData;
}

describe('Auth', () => {
    let app: INestApplication<App>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
            })
        );
        await app.init();

        await waitForUserSignUp();
    });

    afterAll(async () => {
        await app.close();
        isContinue = true;
    });

    describe('signin', () => {
        beforeAll(async () => {});

        it('should signin', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({
                    userName: userCredentials.userName,
                    password: userCredentials.password,
                })
                .expect(200)
                .expect(function (res) {
                    const resBody = res.body as SignInResponse;
                    if (!resBody.isSuccess) {
                        throw new Error(resBody.message);
                    }
                });
            const responseBody = response.body as SignInResponse;
            authData.jwt = responseBody.jwt!;
            authData.userId = responseBody.userId!;
        });
    });

    it('should test a protected route', () => {
        return request(app.getHttpServer())
            .get('/auth/authorize')
            .set({ authorization: `Bearer ${authData.jwt}` })
            .send()
            .expect(200);
    });
});
