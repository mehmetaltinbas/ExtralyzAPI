import { Document as MongooseDocument } from 'mongoose';

export interface UserDocument extends MongooseDocument {
    userName: string;
    email: string;
    passwordHash: string;
}
