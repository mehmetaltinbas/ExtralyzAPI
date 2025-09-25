import ResponseBase from 'src/shared/interfaces/response-base.interface';

export interface EvaluateAnswerStrategyResponse extends ResponseBase {
    score?: number;
    feedback?: string;
}
