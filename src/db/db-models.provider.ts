import { Mongoose } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

let models: Record<string, Mongoose['Model']>;
export const dbModelsProvider = {
    provide: 'DB_MODELS',
    useFactory: (mongoose: Mongoose): Record<string, Mongoose['Model']> => {
        console.log('creating models...');
        models = {
            User: mongoose.model('User', UserSchema),
        };
        return models;
    },
    inject: ['DB_CONNECTION'],
};

export function cleanDb() {
    models.User.deleteMany({});
    console.log(`\ndb cleaned\n`);
}
