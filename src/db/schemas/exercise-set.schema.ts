import * as mongoose from 'mongoose';

export const ExerciseSetSchema = new mongoose.Schema(
    {
        sourceType: { type: String, enum: ['Source', 'ProcessedSource'], required: true },
        sourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String },
        type: {
            type: String,
            enum: ['mix', 'mcq', 'trueFalse', 'short', 'openEnded'],
            required: true,
        },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        count: { type: Number, required: true },
    },
    { timestamps: true }
);
