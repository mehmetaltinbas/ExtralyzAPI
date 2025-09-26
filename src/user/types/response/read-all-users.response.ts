import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { UserDocument } from 'src/user/types/user-interfaces';

export interface ReadAllUsersResponse extends ResponseBase {
    users: UserDocument[];
}