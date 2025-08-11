import * as mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema(
    {
        sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
        processedSourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProcessedSource' },
        type: {
            type: String,
            enum: ['mcq', 'trueFalse', 'short', 'openEnded'],
            required: true,
        },
        choices: [String], // for 'mcq' and 'trueFalse'
        correctChoiceIndex: Number, // for 'mcq' and 'trueFalse
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        prompt: { type: String, required: true },
        solution: String,
    },
    { timestamps: true }
);
