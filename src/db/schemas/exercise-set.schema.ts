import * as mongoose from 'mongoose';

export const ExerciseSetSchema = new mongoose.Schema(
    {
        sourceType: { type: String, enum: ['Source', 'ProcessedSource'], required: true },
        sourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
        type: {
            type: String,
            enum: ['mcq', 'trueFalse', 'short', 'openEnded'],
            required: true,
        },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        count: { type: Number, required: true },
    },
    { timestamps: true }
);
