// eslint-disable-next-line no-redeclare
import {
    Body,
    Controller,
    Req,
    Post,
    Get,
    Patch,
    Delete,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './types/auth-dtos';
import { SignInResponse } from './types/auth-responses';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { AuthGuard } from './auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('signin')
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        const response = await this.authService.signInAsync(signInDto);
        return response;
    }

    @UseGuards(AuthGuard)
    @Get('authorize')
    async authorize(@Req() req: ExpressRequest): Promise<ResponseBase> {
        const response = await this.authService.authorizeAsync();
        return response;
    }
}
