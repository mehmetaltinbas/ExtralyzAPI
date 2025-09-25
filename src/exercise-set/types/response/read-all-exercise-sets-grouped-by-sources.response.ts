import ResponseBase from '../../../shared/interfaces/response-base.interface';
import { ExtendedSourceDocument } from '../../../source/types/extended-source-document.interface';

export interface ReadAllExerciseSetsGroupedBySourcesResponse extends ResponseBase {
    sources?: ExtendedSourceDocument[];
}
