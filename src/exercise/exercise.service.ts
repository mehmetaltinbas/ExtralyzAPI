import { Inject, Injectable } from '@nestjs/common';
import { ExerciseDocument } from './types/exercise-document.interface';
import { Model } from 'mongoose';
import { ReadAllExercisesResponse } from './types/response/read-all-exercises.response';
import { ReadSingleExerciseResponse } from './types/response/read-single-exercise.response';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateExerciseDto } from './types/dto/create-exercise.dto';
import { OpenaiService } from '../openai/openai.service';
import { SourceService } from '../source/source.service';
import { ProcessedSourceService } from '../processed-source/processed-source.service';
import { countWords } from '../shared/utilities/count-words.utility';

@Injectable()
export class ExerciseService {
    constructor(
        @Inject('DB_MODELS') private db: Record<'Exercise', Model<ExerciseDocument>>,
        private openaiService: OpenaiService,
        private sourceService: SourceService,
        private processedSourceService: ProcessedSourceService
    ) {}

    async create(
        exerciseSetId: string,
        createExerciseDto: CreateExerciseDto
    ): Promise<ResponseBase> {
        const createdExercise = await this.db.Exercise.create({
            exerciseSetId,
            ...createExerciseDto,
        });
        if (!createdExercise) {
            return { isSuccess: false, message: "exercise couldn't created" };
        }
        return { isSuccess: true, message: 'exercises created' };
    }

    async readAll(): Promise<ReadAllExercisesResponse> {
        const exercises = await this.db.Exercise.find();
        if (exercises.length === 0) {
            return { isSuccess: false, message: 'no exercise found' };
        }
        return { isSuccess: true, message: 'all exercises read', exercises };
    }

    async readById(id: string): Promise<ReadSingleExerciseResponse> {
        const exercise = await this.db.Exercise.findById(id);
        if (!exercise) {
            return { isSuccess: false, message: 'no exercise found' };
        }
        return { isSuccess: true, message: `exercise read by id: ${id}`, exercise };
    }

    async readAllByExerciseSetId(exerciseSetId: string): Promise<ReadAllExercisesResponse> {
        const exercises = await this.db.Exercise.find({ exerciseSetId });
        if (!exercises || exercises.length === 0) {
            return {
                isSuccess: false,
                message: `no exercise found that has exerciseSetId: ${exerciseSetId}`,
            };
        }
        return {
            isSuccess: true,
            message: `all exercises read that has exerciseSetId: ${exerciseSetId}`,
            exercises,
        };
    }

    // async updateById() {

    // }

    async deleteById(id: string): Promise<ResponseBase> {
        const deletedExercise = await this.db.Exercise.findByIdAndDelete(id);
        if (!deletedExercise) {
            return { isSuccess: false, message: 'no exercise found to delete' };
        }
        return { isSuccess: true, message: `exercise deleted by id: ${id}` };
    }
}
