import { Mongoose } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { SourceSchema } from './schemas/source.schema';
import { ProcessedSourceSchema } from './schemas/processed-source.schema';
import { ExerciseSchema } from './schemas/exercise.schema';

let models: Record<string, Mongoose['Model']>;

export const dbModelsProvider = {
    provide: 'DB_MODELS',
    useFactory: (mongoose: Mongoose): Record<string, Mongoose['Model']> => {
        console.log('creating models...');
        models = {
            User: mongoose.model('User', UserSchema),
            Source: mongoose.model('Source', SourceSchema),
            ProcessedSource: mongoose.model('ProcessedSource', ProcessedSourceSchema),
            Exercise: mongoose.model('Exercise', ExerciseSchema),
        };
        return models;
    },
    inject: ['DB_CONNECTION'],
};

export async function cleanDb(mongoose: Mongoose): Promise<void> {
    if (!models || !models.User) {
        throw new Error('Models not initialized');
    }
    await models.User.deleteMany({});
    console.log(`\ndb cleaned\n`);
}
