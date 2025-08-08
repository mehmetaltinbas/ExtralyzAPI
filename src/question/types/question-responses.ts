import ResponseBase from '../../shared/interfaces/response-base.interface';
import { QuestionDocument } from './question-interfaces';

export interface ReadAllQuestionsResponse extends ResponseBase {
    questions?: QuestionDocument[];
}

export interface ReadSingleQuestionResponse extends ResponseBase {
    question?: QuestionDocument;
}
