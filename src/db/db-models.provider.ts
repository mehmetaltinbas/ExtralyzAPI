import { Mongoose } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

let models: Record<string, Mongoose['Model']>;
export function initModels(mongoose: Mongoose): void {
    models = {
        User: mongoose.model('User', UserSchema),
    };
}

export const dbModelsProvider = {
    provide: 'DB_MODELS',
    useFactory: (mongoose: Mongoose): Record<string, Mongoose['Model']> => {
        console.log('creating models...');
        initModels(mongoose);
        return models;
    },
    inject: ['DB_CONNECTION'],
};

export async function cleanDb(): Promise<void> {
    if (!models || !models.User) {
        throw new Error('Models not initialized');
    }
    await models.User.deleteMany({});
    console.log(`\ndb cleaned\n`);
}
