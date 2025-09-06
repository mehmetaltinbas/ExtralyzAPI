import ResponseBase from '../../../shared/interfaces/response-base.interface';
import { ExerciseSetDocument } from '../exercise-set-document.interface';

export interface ReadAllExerciseSetsResponse extends ResponseBase {
    exerciseSets?: ExerciseSetDocument[];
}
