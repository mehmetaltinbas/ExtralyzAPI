import * as mongoose from 'mongoose';
import { ExerciseSetModel } from 'src/db/schemas/exercise-set.model';
import { ProcessedSourceModel } from 'src/db/schemas/processed-source.model';
import { SourceDocument } from 'src/source/types/source-interfaces';

const schema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['text', 'document', 'youtubeUrl'], required: true },
        title: String,
        rawText: String,
    },
    { timestamps: true }
);

schema.post('findOneAndDelete', async function (document: SourceDocument) {
    if (document) {
        const associatedProcessedSourceDocuments = await ProcessedSourceModel.find({
            sourceId: document._id,
        });
        const promises = associatedProcessedSourceDocuments.map((processedSourceDocument) => {
            return ProcessedSourceModel.findByIdAndDelete(processedSourceDocument._id);
        });
        await Promise.all(promises);
        const associatedExerciseSetDocuments = await ExerciseSetModel.find({
            sourceId: document._id,
        });
        const restPromises = associatedExerciseSetDocuments.map((exerciseSetDocument) => {
            return ExerciseSetModel.findByIdAndDelete(exerciseSetDocument._id);
        });
        await Promise.all(restPromises);
    }
});

export const SourceModel = mongoose.model('Source', schema);
