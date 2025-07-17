import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { UserDocument } from './user-interfaces';

export interface SignUpResponse extends ResponseBase {
    user: UserDocument;
}

export interface ReadAllUsersResponse extends ResponseBase {
    users: UserDocument[];
}

export interface ReadSingleUserResponse extends ResponseBase {
    user?: UserDocument;
}
