import { Controller, Post, Get, Patch, Delete, Inject, Body } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('create')
    async create(@Body() userDto: UserDto): Promise<unknown> {
        const result = await this.userService.create(userDto);
        return result;
    }
}
