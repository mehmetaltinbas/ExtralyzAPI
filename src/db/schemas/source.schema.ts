import * as mongoose from 'mongoose';

export const SourceSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['text', 'document', 'youtubeUrl'], required: true },
        rawText: String,
        locationType: { type: String, enum: ['filePath', 'url'] },
        location: String,
        title: String,
    },
    { timestamps: true }
);
