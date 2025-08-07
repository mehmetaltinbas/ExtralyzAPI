import { Document as MongooseDocument } from 'mongoose';

export interface ProcessedSourceDocument extends MongooseDocument {
    sourceId: string;
    title: string;
    processedText: string;
}
