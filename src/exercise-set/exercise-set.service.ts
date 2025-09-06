import { Inject, Injectable } from '@nestjs/common';
import { CreateExerciseSetDto } from './types/dto/create-exercise-set.dto';
import { SourceService } from '../source/source.service';
import { Model } from 'mongoose';
import { ExerciseSetDocument } from './types/exercise-set-document.interface';
import { ProcessedSourceService } from '../processed-source/processed-source.service';
import { OpenaiService } from '../openai/openai.service';
import { countWords } from '../shared/utilities/count-words.utility';
import { ExerciseService } from '../exercise/exercise.service';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateExerciseDto } from '../exercise/types/dto/create-exercise.dto';

@Injectable()
export class ExerciseSetService {
    constructor(
        @Inject('DB_MODELS') private db: Record<'ExerciseSet', Model<ExerciseSetDocument>>,
        private exerciseService: ExerciseService,
        private openaiService: OpenaiService,
        private sourceService: SourceService,
        private processedSourceService: ProcessedSourceService
    ) {}

    async create(
        sourceId: string,
        createExerciseSetDto: CreateExerciseSetDto
    ): Promise<ResponseBase> {
        let sourceText;
        let sourceType;

        console.log(sourceId);

        const readSingleSourceResponse = await this.sourceService.readById(sourceId);
        if (readSingleSourceResponse.isSuccess && readSingleSourceResponse.source) {
            sourceText = readSingleSourceResponse.source.rawText;
            sourceType = 'Source';
        } else {
            const readSingleProcessedSourceResponse =
                await this.processedSourceService.readById(sourceId);
            if (
                readSingleProcessedSourceResponse.isSuccess &&
                readSingleProcessedSourceResponse.processedSource
            ) {
                sourceText = readSingleProcessedSourceResponse.processedSource.processedText;
                sourceType = 'ProcessedSource';
            } else {
                return {
                    isSuccess: false,
                    message: 'no source or processed-source found by given id',
                };
            }
        }

        const generateExercisesResponse = await this.openaiService.generateExercises(
            sourceText,
            createExerciseSetDto.type,
            createExerciseSetDto.difficulty,
            createExerciseSetDto.count
        );
        if (!generateExercisesResponse.isSuccess) {
            return generateExercisesResponse;
        }

        const exerciseSet = await this.db.ExerciseSet.create({
            sourceType,
            sourceId,
            type: createExerciseSetDto.type,
            difficulty: createExerciseSetDto.difficulty,
            count: createExerciseSetDto.count,
        });
        console.log(`\n\nexerciseSet created, here`, exerciseSet);

        const promises = generateExercisesResponse.exercises.map((exercise) => {
            const dto: CreateExerciseDto = {
                type: exercise.type,
                difficulty: exercise.difficulty,
                prompt: exercise.prompt,
            };
            if (dto.type === 'mcq' || dto.type === 'trueFalse') {
                dto.choices = exercise.choices;
                dto.correctChoiceIndex = exercise.correctChoiceIndex;
            } else if (dto.type === 'short' || dto.type === 'openEnded') {
                dto.solution = exercise.solution;
            }
            console.log(`\nexerciseDto`, dto);
            return this.exerciseService.create(exerciseSet._id, dto);
        });
        const responses = await Promise.all(promises);

        return {
            isSuccess: true,
            message: `exercise set created, type: ${exerciseSet.type}, difficulty: ${exerciseSet.difficulty}, exercise count: ${exerciseSet.count}`,
        };
    }
}
