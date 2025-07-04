import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { Mongoose } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@Inject('DB_MODELS') private db: Record<string, Mongoose['Model']>) {}

    async create(userDto: UserDto): Promise<User> {
        const createdUser = await this.db.User.create(userDto);
        return createdUser;
    }

    async findAll(): Promise<User[]> {
        return await this.db.User.find().exec();
    }
}
