import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema(
    {
        sourceModel: { type: String, enum: ['Source', 'ProcessedSource'], required: true },
        source: { type: mongoose.Schema.Types.ObjectId, required: true },
        processedSource: { type: mongoose.Schema.Types.ObjectId, ref: 'ProcessedSource' },
        questionText: String,
        answerText: String,
    },
    { timestamps: true }
);
