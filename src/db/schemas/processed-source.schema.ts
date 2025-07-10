import * as mongoose from 'mongoose';

export const ProcessedSource = new mongoose.Schema(
    {
        source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
        processedText: String,
    },
    { timestamps: true }
);
