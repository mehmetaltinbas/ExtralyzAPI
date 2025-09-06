import { Document as MongooseDocument } from 'mongoose';

export interface ExerciseDocument extends MongooseDocument {
    _id: string;
    exerciseSetId: string;
    type: string;
    choices: string[];
    correctChoiceIndex: number;
    difficulty: string;
    prompt: string;
    solution: string;
}
