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
} from '@nestjs/common';
import { SignUpUserDto, UpdateUserDto } from './types/user-dtos';
import { UserService } from './user.service';
import ResponseBase from '../shared/interfaces/response-base.interface';
import {
    ReadAllUsersResponse,
    ReadSingleUserResponse,
    SignUpResponse,
} from './types/user-responses';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('test')
    async test(@Body() body: SignUpUserDto): Promise<string> {
        return `test`;
    }

    @Post('signup')
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<SignUpResponse> {
        const response = await this.userService.createAsync(signUpUserDto);
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

    @UseGuards(AuthGuard)
    @Patch('updatebyid/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ResponseBase> {
        const response = this.userService.updateByIdAsync(id, updateUserDto);
        return response;
    }

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Delete('deletebyid/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = this.userService.deleteByIdAsync(id);
        return response;
    }
}
