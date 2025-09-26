import { Mongoose } from 'mongoose';
import { UserModel } from './schemas/user.model';
import { SourceModel } from './schemas/source.model';
import { ProcessedSourceModel } from './schemas/processed-source.model';
import { ExerciseSetModel } from './schemas/exercise-set.model';
import { ExerciseModel } from './schemas/exercise.model';

let models: Record<string, Mongoose['Model']>;

export const dbModelsProvider = {
    provide: 'DB_MODELS',
    useFactory: (mongoose: Mongoose): Record<string, Mongoose['Model']> => {
        console.log('creating models...');
        models = {
            User: UserModel,
            Source: SourceModel,
            ProcessedSource: ProcessedSourceModel,
            ExerciseSet: ExerciseSetModel,
            Exercise: ExerciseModel,
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
