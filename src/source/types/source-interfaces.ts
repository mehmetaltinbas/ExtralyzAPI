import { Document as MongooseDocument } from 'mongoose';

export interface SourceDocument extends MongooseDocument {
    _id: string;
    type: string;
    rawText: string;
    locationType: string;
    location: string;
    title: string;
}
