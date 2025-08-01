import * as mongoose from 'mongoose';

export const SourceSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['text', 'document', 'youtubeUrl'], required: true },
        title: String,
        rawText: String,
    },
    { timestamps: true }
);
