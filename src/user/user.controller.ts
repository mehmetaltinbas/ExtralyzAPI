// eslint-disable-next-line no-redeclare
import { Controller, Post, Get, Patch, Delete, Inject, Body, Param } from '@nestjs/common';
import { SignUpUserDto, UpdateUserDto } from './models/user-dtos';
import { UserService } from './user.service';
import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { ReadAllUsersResponse, ReadSingleUserResponse } from './models/user-responses';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<ResponseBase> {
        const response = await this.userService.createAsync(signUpUserDto);
        return response;
    }

    @Post('authorize')
    async authorize(): Promise<ResponseBase> {
        const response = await this.userService.authorizeAsync();
        return response;
    }

    @Get('readall')
    async readAll(): Promise<ReadAllUsersResponse> {
        const response = await this.userService.readAllAsync();
        return response;
    }

    @Get('readbyid/:id')
    async readById(@Param('id') id: string): Promise<ReadSingleUserResponse> {
        const response = await this.userService.readByIdAsync(id);
        return response;
    }

    @Patch('updatebyid/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ResponseBase> {
        const response = this.userService.updateByIdAsync(id, updateUserDto);
        return response;
    }

    @Delete('deletebyid/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = this.userService.deleteByIdAsync(id);
        return response;
    }
}
