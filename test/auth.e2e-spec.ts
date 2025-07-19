import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { SignInResponse } from '../src/auth/types/auth-responses';
import { getAppInstance } from './app-setup';
import { userCredentials } from './mocks/shared.mock';
import { waitForSignUp } from './utilities/user.utility';

let jwt: string = '';
let isJwtReady = false;
export async function readJwt(): Promise<string> {
    const checkInterval = 100;
    return new Promise((resolve) => {
        const waitForJwt = () => {
            if (isJwtReady) {
                resolve(jwt);
            } else {
                setTimeout(waitForJwt, checkInterval);
            }
        };
        waitForJwt();
    });
}

describe('Auth', () => {
    let app: INestApplication<App>;
    beforeAll(async () => {
        app = await getAppInstance();
    });

    afterAll(async () => {});

    describe('signin', () => {
        beforeAll(async () => {
            await waitForSignUp();
        });

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
            jwt = responseBody.jwt!;
            console.log(`here is the jwt from signin: ${jwt}`);
            isJwtReady = true;
        });
    });

    it('should test a protected route', () => {
        return request(app.getHttpServer())
            .get('/auth/authorize')
            .set({ authorization: `Bearer ${jwt}` })
            .send()
            .expect(200);
    });
});
