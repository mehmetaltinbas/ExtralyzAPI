import { ExerciseDocument } from '../../exercise/types/exercise-document.interface';
import ResponseBase from '../../shared/interfaces/response-base.interface';

export interface OpenaiCompletionResponse extends ResponseBase {
    completion: string;
}

export interface GenerateExercisesResponse extends ResponseBase {
    exercises: ExerciseDocument[];
}
