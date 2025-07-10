import * as mongoose from 'mongoose';

export const SourceSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        type: { type: String, enum: ['text', 'document', 'youtubeUrl'] },
        rawText: String,
        locationType: { type: String, enum: ['filePath', 'url'] },
        location: String,
    },
    { timestamps: true }
);
