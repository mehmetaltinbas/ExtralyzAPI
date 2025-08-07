import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { ProcessedSourceDocument } from './processed-source-interfaces';

export interface ReadAllProcessedSourcesResponse extends ResponseBase {
    processedSources?: ProcessedSourceDocument[];
}

export interface ReadSingleProcessedSourceResponse extends ResponseBase {
    processedSource?: ProcessedSourceDocument;
}
