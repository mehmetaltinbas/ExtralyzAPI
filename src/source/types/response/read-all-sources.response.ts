import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { SourceDocument } from 'src/source/types/source-document.interface';

export interface ReadAllSourcesResponse extends ResponseBase {
    sources?: SourceDocument[];
}
