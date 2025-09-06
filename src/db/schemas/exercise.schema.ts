import * as mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema(
    {
        exerciseSetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExerciseSet',
            required: true,
        },
        type: {
            type: String,
            enum: ['mcq', 'trueFalse', 'short', 'openEnded'],
            required: true,
        },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        prompt: { type: String, required: true },
        solution: String, // for 'short' and 'openEnded'
        choices: [String], // for 'mcq' and 'trueFalse'
        correctChoiceIndex: Number, // for 'mcq' and 'trueFalse
    },
    { timestamps: true }
);
