import { Document as MongooseDocument } from 'mongoose';

export interface QuestionDocument extends MongooseDocument {
    _id: string;
    sourceId: string;
    processedSourceId: string;
    type: string;
    options: string[];
    correctOptionIndex: number;
    difficulty: string;
    questionText: string;
    answerText: string;
}
