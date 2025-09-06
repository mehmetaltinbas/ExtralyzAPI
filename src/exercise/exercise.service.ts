import { Inject, Injectable } from '@nestjs/common';
import { ExerciseDocument } from './types/exercise-interfaces';
import { Model } from 'mongoose';
import {
    ReadAllExercisesResponse,
    ReadSingleExerciseResponse,
} from './types/exercise-responses';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateMultipleExerciseDto } from './types/exercise-dtos';
import { OpenaiService } from '../openai/openai.service';
import { SourceService } from '../source/source.service';
import { ProcessedSourceService } from '../processed-source/processed-source.service';
import { countWords } from 'src/shared/utilities/count-words.utility';

@Injectable()
export class ExerciseService {
    constructor(
        @Inject('DB_MODELS') private db: Record<'Exercise', Model<ExerciseDocument>>,
        private openaiService: OpenaiService,
        private sourceService: SourceService,
        private processedSourceService: ProcessedSourceService
    ) {}

    async createMultiple(
        sourceId: string,
        createMultipleExerciseDto: CreateMultipleExerciseDto
    ): Promise<ResponseBase> {
        let text;
        let intendedQuestionCount;
        let isProcessedSource;
        const readSingleSourceResponse = await this.sourceService.readById(sourceId);
        if (readSingleSourceResponse.isSuccess && readSingleSourceResponse.source) {
            text = readSingleSourceResponse.source.rawText;
            intendedQuestionCount = Math.floor(
                countWords(readSingleSourceResponse.source.rawText) / 100
            );
            isProcessedSource = false;
        } else {
            const readSingleProcessedSourceResponse =
                await this.processedSourceService.readById(sourceId);
            if (
                readSingleProcessedSourceResponse.isSuccess &&
                readSingleProcessedSourceResponse.processedSource
            ) {
                text = readSingleProcessedSourceResponse.processedSource.processedText;
                intendedQuestionCount = Math.floor(
                    countWords(
                        readSingleProcessedSourceResponse.processedSource.processedText
                    ) / 100
                );
                isProcessedSource = true;
            } else {
                return {
                    isSuccess: false,
                    message: 'no source or processed source found by given id',
                };
            }
        }
        const generateExercisesResponse = await this.openaiService.generateExercises(
            text,
            createMultipleExerciseDto.type,
            createMultipleExerciseDto.difficulty,
            createMultipleExerciseDto.intendedExerciseCount
        );
        if (!generateExercisesResponse.isSuccess) {
            return generateExercisesResponse;
        }
        generateExercisesResponse.exercises.forEach((exercise) => {
            if (isProcessedSource) {
                exercise.processedSourceId = sourceId;
            } else {
                exercise.sourceId = sourceId;
            }
        });
        await this.db.Exercise.insertMany(generateExercisesResponse.exercises);
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

    async readAllBySourceId(sourceId: string): Promise<ReadAllExercisesResponse> {
        const exercises = await this.db.Exercise.find({ sourceId });
        if (!exercises || exercises.length === 0) {
            return {
                isSuccess: false,
                message: `no exercise found that has sourceId: ${sourceId}`,
            };
        }
        return {
            isSuccess: true,
            message: `all exercises read that has sourceId: ${sourceId}`,
            exercises,
        };
    }

    async readAllByProcessedSourceId(
        processedSourceId: string
    ): Promise<ReadAllExercisesResponse> {
        const exercises = await this.db.Exercise.find({ processedSourceId });
        if (!exercises || exercises.length === 0) {
            return {
                isSuccess: false,
                message: `no exercise found that has processedSourceId: ${processedSourceId}`,
            };
        }
        return {
            isSuccess: true,
            message: `all exercises read that has processedSourceId: ${processedSourceId}`,
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
