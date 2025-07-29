import ResponseBase from '../../shared/interfaces/response-base.interface';
import { SourceDocument } from './source-interfaces';

export interface ReadAllSourcesResponse extends ResponseBase {
    sources?: SourceDocument[];
}

export interface ReadSingleSourceResponse extends ResponseBase {
    source?: SourceDocument;
}
