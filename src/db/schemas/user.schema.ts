import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        userName: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);
