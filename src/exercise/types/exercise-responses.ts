import ResponseBase from '../../shared/interfaces/response-base.interface';
import { ExerciseDocument } from './exercise-interfaces';

export interface ReadAllQuestionsResponse extends ResponseBase {
    exercises?: ExerciseDocument[];
}

export interface ReadSingleQuestionResponse extends ResponseBase {
    exercise?: ExerciseDocument;
}
