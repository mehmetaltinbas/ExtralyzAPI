import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Inject, // eslint-disable-next-line no-redeclare
    Body,
    Param,
    HttpCode,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto, UpdateUserDto } from './types/user-dtos';
import ResponseBase from '../shared/interfaces/response-base.interface';
import {
    ReadAllUsersResponse,
    ReadSingleUserResponse,
    SignUpResponse,
} from './types/user-responses';
import { AuthGuard } from '../auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import User from '../shared/custom-decorators/user.decorator';
import JwtPayload from '../auth/types/jwt-payload.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard)
    @Post('test')
    async test(@User() user: JwtPayload): Promise<string> {
        console.log(`userInformation: `, user);
        return `test`;
    }

    @Post('signup')
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<SignUpResponse> {
        const response = await this.userService.createAsync(signUpUserDto);
        return response;
    }

    @Get('read-all')
    async readAll(): Promise<ReadAllUsersResponse> {
        const response = await this.userService.readAllAsync();
        return response;
    }

    @Get('read-by-id/:id')
    async readById(@Param('id') id: string): Promise<ReadSingleUserResponse> {
        const response = await this.userService.readByIdAsync(id);
        return response;
    }

    @UseGuards(AuthGuard)
    @Patch('update-by-id/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ResponseBase> {
        const response = this.userService.updateByIdAsync(id, updateUserDto);
        return response;
    }

    @UseGuards(AuthGuard)
    @Delete('delete-by-id/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = this.userService.deleteByIdAsync(id);
        return response;
    }
}
