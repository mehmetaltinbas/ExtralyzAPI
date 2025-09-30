import * as mongoose from 'mongoose';
import { SourceModel } from 'src/db/schemas/source.model';
import { UserDocument } from 'src/user/types/user-interfaces';

const schema = new mongoose.Schema(
    {
        userName: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);

schema.post('findOneAndDelete', async function (document: UserDocument) {
    if (document) {
        const associatedSourceDocuments = await SourceModel.find({ userId: document._id });
        const promises = associatedSourceDocuments.map((sourceDocument) => {
            return SourceModel.findByIdAndDelete(sourceDocument._id);
        });
        await Promise.all(promises);
    }
});

export const UserModel = mongoose.model('User', schema);
