import { ExerciseSetDocument } from "../../exercise-set/types/exercise-set-document.interface";
import { ProcessedSourceDocument } from "./processed-source-interfaces";

export interface ExtendedProcessedSourceDocument extends ProcessedSourceDocument {
    exerciseSets?: ExerciseSetDocument[];
}
