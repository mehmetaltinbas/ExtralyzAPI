// eslint-disable-next-line no-redeclare
import { Controller, Post, Get, Patch, Delete, Inject, Body, Param } from '@nestjs/common';
import { SignUpUserDto, UpdateUserDto } from './models/user-dtos';
import { UserService } from './user.service';
import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { ReadAllResponse, ReadByIdResponse } from './models/user-responses';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<ResponseBase> {
        const result = await this.userService.createAsync(signUpUserDto);
        return result;
    }

    @Post('signin')
    async signIn(): Promise<ResponseBase> {
        const result = await this.userService.signInAsync();
        return result;
    }

    @Post('authorize')
    async authorize(): Promise<ResponseBase> {
        const result = await this.userService.authorizeAsync();
        return result;
    }

    @Get('readall')
    async readAll(): Promise<ReadAllResponse> {
        const result = await this.userService.readAllAsync();
        return result;
    }

    @Get('readbyid/:id')
    async readById(@Param('id') id: string): Promise<ReadByIdResponse> {
        const result = await this.userService.readByIdAsync(id);
        return result;
    }

    @Patch('updatebyid/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ResponseBase> {
        const result = this.userService.updateByIdAsync(id, updateUserDto);
        return result;
    }

    @Delete('deletebyid/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const result = this.userService.deleteByIdAsync(id);
        return result;
    }
}
