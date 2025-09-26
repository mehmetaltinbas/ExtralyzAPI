import ResponseBase from 'src/shared/interfaces/response-base.interface';
import { UserDocument } from 'src/user/types/user-interfaces';

export interface ReadSingleUserResponse extends ResponseBase {
    user?: UserDocument;
}
