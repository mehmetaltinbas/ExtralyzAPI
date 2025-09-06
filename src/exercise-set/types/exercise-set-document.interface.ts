import { Document as MongooseDocument } from 'mongoose';

export interface ExerciseSetDocument extends MongooseDocument {
    _id: string;
    sourceType: string;
    sourceId: string;
    type: string;
    difficulty: string;
    count: number;
}
