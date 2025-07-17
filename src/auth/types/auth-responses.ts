import ResponseBase from 'src/shared/interfaces/response-base.interface';

export interface SignInResponse extends ResponseBase {
    jwt?: string;
    userId?: string;
}
