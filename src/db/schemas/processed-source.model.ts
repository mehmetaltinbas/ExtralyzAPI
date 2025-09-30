import * as mongoose from 'mongoose';
import { ExerciseSetModel } from 'src/db/schemas/exercise-set.model';
import { ProcessedSourceDocument } from 'src/processed-source/types/processed-source-interfaces';

const schema = new mongoose.Schema(
    {
        sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
        title: String,
        processedText: String,
    },
    { timestamps: true }
);

schema.post('findOneAndDelete', async function (document: ProcessedSourceDocument) {
    if (document) {
        const associatedExerciseSetDocuments = await ExerciseSetModel.find({
            sourceId: document._id,
        });
        const promises = associatedExerciseSetDocuments.map((exerciseSetDocument) => {
            return ExerciseSetModel.findByIdAndDelete(exerciseSetDocument._id);
        });
        await Promise.all(promises);
    }
});

export const ProcessedSourceModel = mongoose.model('ProcessedSource', schema);
