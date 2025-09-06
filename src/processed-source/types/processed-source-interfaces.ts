import { Document as MongooseDocument } from 'mongoose';

export interface ProcessedSourceDocument extends MongooseDocument {
    _id: string;
    sourceId: string;
    title: string;
    processedText: string;
}
