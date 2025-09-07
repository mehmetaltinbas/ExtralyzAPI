import { ExerciseSetDocument } from "../../exercise-set/types/exercise-set-document.interface";
import { ExtendedProcessedSourceDocument } from "../../processed-source/types/extended-processed-source-document.interface";
import { SourceDocument } from "./source-interfaces";

export interface ExtendedSourceDocument extends SourceDocument {
    processedSources?: ExtendedProcessedSourceDocument[];
    exerciseSets?: ExerciseSetDocument[];
}
