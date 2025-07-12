import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { SignInDto } from './models/auth-dtos';
import { SignInResponse } from './models/auth-responses';
import ResponseBase from 'src/shared/interfaces/response-base.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async signInAsync(signInUserDto: SignInDto): Promise<SignInResponse> {
        if (!signInUserDto.userName) {
            return { isSuccess: false, message: 'userName not provided' };
        } else if (!signInUserDto.password) {
            return { isSuccess: false, message: 'password not provided' };
        }
        const readSingleUserResponse = await this.userService.readByUserName(
            signInUserDto.userName
        );
        if (!readSingleUserResponse.user) {
            return readSingleUserResponse;
        }
        const isMatch = await bcrypt.compare(
            signInUserDto.password,
            readSingleUserResponse.user.passwordHash
        );
        if (!isMatch) {
            return { isSuccess: false, message: 'password is incorrect' };
        }
        const payload = {
            sub: readSingleUserResponse.user._id,
            userName: readSingleUserResponse.user.userName,
        };
        const jwt = await this.jwtService.signAsync(payload);
        return { isSuccess: true, message: 'user signed in', jwt };
    }

    async authorizeAsync(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'authorized' };
    }
}
