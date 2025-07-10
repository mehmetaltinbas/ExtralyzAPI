import { Inject, Injectable } from '@nestjs/common';
import { SignUpUserDto, UpdateUserDto } from './models/user-dtos';
import { UserDocument } from './models/user-interfaces';
import { Model } from 'mongoose';
import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { ReadAllResponse, ReadByIdResponse } from './models/user-responses';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@Inject('DB_MODELS') private db: Record<'User', Model<UserDocument>>) {}

    async createAsync(signUpUserDto: SignUpUserDto): Promise<ResponseBase> {
        const { password, ...restOfSignUpUserDto } = signUpUserDto;
        if (!password) {
            return { isSuccess: false, message: 'no password provided' };
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.db.User.create({
            passwordHash,
            ...restOfSignUpUserDto,
        });
        if (!user) {
            return { isSuccess: false, message: "user couldn't created" };
        }
        return { isSuccess: true, message: 'user created' };
    }

    async signInAsync(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'user signed in' };
    }

    async authorizeAsync(): Promise<ResponseBase> {
        return { isSuccess: true, message: 'authorized' };
    }

    async readAllAsync(): Promise<ReadAllResponse> {
        const users = await this.db.User.find().exec();
        return { isSuccess: true, message: 'all users read', users };
    }

    async readByIdAsync(id: string): Promise<ReadByIdResponse> {
        const user = await this.db.User.findById(id).exec();
        if (!user) {
            return { isSuccess: false, message: `user with id ${id} couldn't read` };
        }
        return { isSuccess: true, message: `user with id ${id} read`, user };
    }

    async updateByIdAsync(id: string, updateUserDto: UpdateUserDto): Promise<ResponseBase> {
        const user = await this.db.User.findByIdAndUpdate(id, updateUserDto);
        if (!user) {
            return { isSuccess: false, message: "user couldn't updated" };
        }
        return { isSuccess: true, message: 'user updated' };
    }

    async deleteByIdAsync(id: string): Promise<ResponseBase> {
        const user = await this.db.User.findByIdAndDelete(id);
        if (!user) {
            return { isSuccess: false, message: "user couldn't deleted" };
        }
        return { isSuccess: true, message: 'user deleted' };
    }
}
