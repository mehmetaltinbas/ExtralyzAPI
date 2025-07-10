import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { UserDocument } from './user-interfaces';

export interface ReadAllResponse extends ResponseBase {
    users: UserDocument[];
}

export interface ReadByIdResponse extends ResponseBase {
    user?: UserDocument;
}
