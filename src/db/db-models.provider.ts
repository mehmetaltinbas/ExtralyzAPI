import { Mongoose } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const dbModelsProvider = {
    provide: 'DB_MODELS',
    useFactory: (mongoose: Mongoose): Record<string, Mongoose['Model']> => {
        console.log('creating models...');
        const models = {
            User: mongoose.model('User', UserSchema),
        };
        return models;
    },
    inject: ['DB_CONNECTION'],
};
