import ResponseBase from '../../shared/interfaces/response-base.interface';

export interface OpenaiCompletionResponse extends ResponseBase {
    completion: string;
}

export interface GenerateQuestionsResponse extends ResponseBase {
    questions: Question[];
}

export interface Question {
    sourceId?: string;
    processedSourceId?: string;
    type: string;
    options?: string[]; // for 'mcq' and 'trueFalse'
    correctOptionIndex?: number; // for 'mcq' and 'trueFalse
    difficulty: string;
    questionText: string;
    answerText?: string;
}
