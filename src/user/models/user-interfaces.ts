import { Document as MongooseDocument } from 'mongoose';

export interface UserDocument extends MongooseDocument {
    readonly userName: string;
    readonly passwordHash: number;
}
