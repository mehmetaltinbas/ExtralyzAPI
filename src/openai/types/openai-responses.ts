import ResponseBase from '../../shared/interfaces/response-base.interface';

export interface OpenaiCompletionResponse extends ResponseBase {
    completion: string;
}
