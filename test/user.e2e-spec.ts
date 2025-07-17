import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { readAuthData } from './auth.e2e-spec';
import { SignInAuthTestData } from '../src/auth/types/auth-test-datas';
import { UserCredentialsTestData } from 'src/user/types/user-test-datas';
import { ReadSingleUserResponse, SignUpResponse } from 'src/user/types/user-responses';

let isContinue = false;
export async function waitForUserSignUp(): Promise<void> {
    while (!isContinue) {}
}

describe('User', () => {
    let app: INestApplication<App>;
    let authData: SignInAuthTestData;
    let userId: string;

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
    });

    afterAll(async () => {
        await app.close();
    });

    const userCredentials: UserCredentialsTestData = {
        userName: 'mehmetaltinbas',
        email: 'altinbasmehmet.41@gmail.com',
        password: 'Mehmet+123',
    };

    describe('signup', () => {
        it('should throw a bad request error due to the missing userName field', () => {
            return request(app.getHttpServer())
                .post('/user/signup')
                .send({ email: userCredentials.email, password: userCredentials.password })
                .expect(400);
        });

        it('should throw a bad request error due to the missing email field', () => {
            return request(app.getHttpServer())
                .post('/user/signup')
                .send({
                    userName: userCredentials.userName,
                    password: userCredentials.password,
                })
                .expect(400);
        });

        it('should throw a bad request error due to the missing password field', () => {
            return request(app.getHttpServer())
                .post('/user/signup')
                .send({ userName: userCredentials.userName, email: userCredentials.email })
                .expect(400);
        });

        it('should throw a bad request error due to the invalid email format', () => {
            return request(app.getHttpServer())
                .post('/user/signup')
                .send({
                    userName: userCredentials.userName,
                    email: 'altinbasmehmet.41gmail.com',
                    password: userCredentials.password,
                })
                .expect(400);
        });

        it('should throw a bad request error due to the invalid email format', () => {
            return request(app.getHttpServer())
                .post('/user/signup')
                .send({
                    userName: userCredentials.userName,
                    email: 'altinbasmehmet.41@gmail',
                    password: userCredentials.password,
                })
                .expect(400);
        });

        it('should signup successfully', () => {
            return request(app.getHttpServer())
                .post('/user/signup')
                .send(userCredentials)
                .expect(201)
                .expect((res) => {
                    const resBody = res.body as SignUpResponse;
                    userId = resBody.user._id;
                })
                .expect((res) => {
                    isContinue = true;
                });
        });
    });

    it('should read all users ', () => {
        return request(app.getHttpServer()).get('/user/readall').expect(200);
    });

    describe('readById', () => {
        it('should successfully read user by id', () => {
            return request(app.getHttpServer())
                .get(`/user/readbyid/${userId}`)
                .expect(200)
                .expect((res) => {
                    const resBody = res.body as ReadSingleUserResponse;
                    if (!resBody.user) {
                        throw new Error("user couldn't be read");
                    } else if (resBody.user.userName !== userCredentials.userName) {
                        throw new Error(
                            "the userName of the user being read doesn't match the true one"
                        );
                    }
                });
        });
    });

    // describe('protected endpoints', () => {
    //     beforeAll(async () => {
    //         authData = await readAuthData();
    //         console.log(`\njwt: ${JSON.stringify(authData, null, 2)}\n`);
    //     });

    //     describe('updateById', () => {
    //         it('should update user by id using jwt', () => {
    //             return request(app.getHttpServer())
    //                 .patch(`/user/updatebyid/${authData.userId}`)
    //                 .send({ email: 'altnbsmehmet@icloud.com' })
    //                 .set({ authorization: `Bearer ${authData.jwt}` });
    //         });
    //     });

    //     describe('deleteById', () => {
    //         it('should delete user by id using jwt', () => {
    //             return request(app.getHttpServer())
    //                 .delete(`/user/deletebyid/${authData.userId}`)
    //                 .set({ authorization: `Bearer ${authData.jwt}` })
    //                 .expect(200);
    //         });
    //     });
    // });
});
