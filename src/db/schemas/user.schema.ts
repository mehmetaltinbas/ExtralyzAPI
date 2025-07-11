import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        userName: { type: String, unique: true },
        email: { type: String, unique: true },
        passwordHash: String,
    },
    { timestamps: true }
);
