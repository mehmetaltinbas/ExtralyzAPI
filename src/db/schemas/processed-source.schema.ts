import * as mongoose from 'mongoose';

export const ProcessedSourceSchema = new mongoose.Schema(
    {
        source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
        processedText: String,
        title: String,
    },
    { timestamps: true }
);
