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
import ResponseBase from '../shared/interfaces/response-base.interface';
import { AuthGuard } from '../auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import User from '../shared/custom-decorators/user.decorator';
import JwtPayload from '../auth/types/jwt-payload.interface';
import { SignUpUserDto } from 'src/user/types/dto/sign-up-user.dto';
import { ReadAllUsersResponse } from 'src/user/types/response/read-all-users.response';
import { ReadSingleUserResponse } from 'src/user/types/response/read-single-user.response';
import { UpdateUserDto } from 'src/user/types/dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<ResponseBase> {
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

    @Patch('update-by-id/:id')
    @UseGuards(AuthGuard)
    async updateById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ResponseBase> {
        const response = this.userService.updateByIdAsync(id, updateUserDto);
        return response;
    }

    @Delete('delete-by-id/:id')
    @UseGuards(AuthGuard)
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = this.userService.deleteByIdAsync(id);
        return response;
    }
}
