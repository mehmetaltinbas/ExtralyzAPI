import ResponseBase from '../../../shared/interfaces/response-base.interface';
import { ExerciseDocument } from '../exercise-document.interface';

export interface ReadSingleExerciseResponse extends ResponseBase {
    exercise?: ExerciseDocument;
}
