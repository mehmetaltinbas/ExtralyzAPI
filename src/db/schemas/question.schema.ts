import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema(
    {
        source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
        processedSource: { type: mongoose.Schema.Types.ObjectId, ref: 'ProcessedSource' },
        type: {
            type: String,
            enum: ['mcq', 'trueFalse', 'short', 'openEnded'],
            required: true,
        },
        options: [String], // for 'mcq' and 'trueFalse'
        correctOptionIndex: Number, // for 'mcq' and 'trueFalse
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        questionText: { type: String, required: true },
        answerText: String,
    },
    { timestamps: true }
);
