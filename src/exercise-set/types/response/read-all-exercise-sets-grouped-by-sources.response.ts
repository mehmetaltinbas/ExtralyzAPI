import ResponseBase from "../../../shared/interfaces/response-base.interface";
import { ExtendedSourceDocument } from "../../../source/types/extended-source-document.interface";

export interface ReadAllExerciseSetsGroupedBySources extends ResponseBase {
    sources?: ExtendedSourceDocument[];
}
