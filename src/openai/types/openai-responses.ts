import { ExerciseDocument } from '../../exercise/types/exercise-interfaces';
import ResponseBase from '../../shared/interfaces/response-base.interface';

export interface OpenaiCompletionResponse extends ResponseBase {
    completion: string;
}

export interface GenerateExercisesResponse extends ResponseBase {
    exercises: ExerciseDocument[];
}
