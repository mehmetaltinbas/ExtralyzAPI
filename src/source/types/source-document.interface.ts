import { Document as MongooseDocument } from 'mongoose';

export interface SourceDocument extends MongooseDocument {
    _id: string;
    title: string;
    type: string;
    rawText: string;
    locationType: string;
    location: string;
}
