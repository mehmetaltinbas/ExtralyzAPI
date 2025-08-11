import ResponseBase from '../../shared/interfaces/response-base.interface';
import { ExerciseDocument } from './exercise-interfaces';

export interface ReadAllExercisesResponse extends ResponseBase {
    exercises?: ExerciseDocument[];
}

export interface ReadSingleExerciseResponse extends ResponseBase {
    exercise?: ExerciseDocument;
}
