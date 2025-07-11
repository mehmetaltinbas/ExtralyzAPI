// eslint-disable-next-line no-redeclare
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './models/auth-dtos';
import { SignInResponse } from './models/auth-responses';
import ResponseBase from 'src/shared/interfaces/response-base.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() signInUserDto: SignInDto): Promise<SignInResponse> {
        const response = await this.authService.signInAsync(signInUserDto);
        return response;
    }

    @Post('authorize')
    async authorize(): Promise<ResponseBase> {
        const response = await this.authService.authorizeAsync();
        return response;
    }
}
