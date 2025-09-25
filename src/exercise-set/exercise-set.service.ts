import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateExerciseSetDto } from './types/dto/create-exercise-set.dto';
import { SourceService } from '../source/source.service';
import { Model } from 'mongoose';
import { ExerciseSetDocument } from './types/exercise-set-document.interface';
import { ProcessedSourceService } from '../processed-source/processed-source.service';
import { OpenaiService } from '../openai/openai.service';
import { ExerciseService } from '../exercise/exercise.service';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateExerciseDto } from '../exercise/types/dto/create-exercise.dto';
import { ReadAllExerciseSetsResponse } from './types/response/read-all-exercise-sets.response';
import { ExtendedSourceDocument } from '../source/types/extended-source-document.interface';
import { ReadAllExerciseSetsGroupedBySourcesResponse } from './types/response/read-all-exercise-sets-grouped-by-sources.response';
import { ExtendedProcessedSourceDocument } from '../processed-source/types/extended-processed-source-document.interface';
import { ReadSingleExerciseSetResponse } from './types/response/read-single-exercise-set.response';
import {
    EvaluateAnswersResponse,
    ExerciseAnswerEvaluationResult,
} from 'src/exercise-set/types/response/evaluate-answers.response';
import { EvaluateAnswersDto } from 'src/exercise-set/types/dto/evaluate-answers.dto';
import { ExerciseSetTypeStrategyResolverProvider } from 'src/exercise-set/strategies/type/exercise-set-type-strategy-resolver.provider';
import { UpdateExerciseSetDto } from 'src/exercise-set/types/dto/update-exercise-set.dto';

@Injectable()
export class ExerciseSetService {
    constructor(
        @Inject('DB_MODELS') private db: Record<'ExerciseSet', Model<ExerciseSetDocument>>,
        @Inject(forwardRef(() => ExerciseService)) private exerciseService: ExerciseService,
        private openaiService: OpenaiService,
        private sourceService: SourceService,
        private processedSourceService: ProcessedSourceService,
        private exerciseSetTypeStrategyResolverProvider: ExerciseSetTypeStrategyResolverProvider
    ) {}

    async create(
        sourceId: string,
        createExerciseSetDto: CreateExerciseSetDto
    ): Promise<ResponseBase> {
        let sourceText;
        let sourceType;

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
            return this.exerciseService.create(exerciseSet._id, dto);
        });
        const responses = await Promise.all(promises);

        return {
            isSuccess: true,
            message: `exercise set created, type: ${exerciseSet.type}, difficulty: ${exerciseSet.difficulty}, exercise count: ${exerciseSet.count}`,
        };
    }

    async readAllByUserId(userId: string): Promise<ReadAllExerciseSetsResponse> {
        const response = await this.sourceService.readAllByUserId(userId);
        if (!response.sources || response.sources.length === 0) {
            return {
                isSuccess: false,
                message:
                    'No sources associated with the given userId, thus no exercise sets can exist',
            };
        }
        const sourceIds = response.sources.map((s) => s._id);

        const processedSourcesResponses = await Promise.all(
            response.sources.map((source) =>
                this.processedSourceService.readAllBySourceId(source._id)
            )
        );
        for (const res of processedSourcesResponses) {
            if (res.processedSources) {
                sourceIds.push(...res.processedSources.map((ps) => ps._id));
            }
        }

        const exerciseSets = await this.db.ExerciseSet.find({
            sourceId: { $in: sourceIds },
        });

        if (exerciseSets.length === 0) {
            return { isSuccess: false, message: 'No exercises found' };
        }

        return { isSuccess: true, message: 'All exercise sets read', exerciseSets };
    }

    async readAllByUserIdGroupedBySources(
        userId: string
    ): Promise<ReadAllExerciseSetsGroupedBySourcesResponse> {
        const response = await this.sourceService.readAllByUserId(userId);
        if (!response.sources || response.sources.length === 0) {
            return {
                isSuccess: false,
                message:
                    'No sources associated with the given userId, thus no exercise sets can exist',
            };
        }

        let sources = [];
        for (const source of response.sources) {
            const exerciseSetsOfSource = await this.db.ExerciseSet.find({
                sourceId: source._id,
            });
            const response = await this.processedSourceService.readAllBySourceId(source._id);
            if (response.processedSources && response.processedSources.length !== 0) {
                let processedSources = [];
                for (const processedSource of response.processedSources) {
                    const exerciseSetsOfProcessedSource = await this.db.ExerciseSet.find({
                        sourceId: processedSource._id,
                    });
                    const extendedProcessedSource: ExtendedProcessedSourceDocument = {
                        ...(processedSource.toObject() as Omit<
                            ExtendedProcessedSourceDocument,
                            'exerciseSets'
                        >),
                        exerciseSets: exerciseSetsOfProcessedSource,
                    };
                    processedSources.push(extendedProcessedSource);
                }
                const extendedSource: ExtendedSourceDocument = {
                    ...(source.toObject() as Omit<ExtendedSourceDocument, 'exerciseSets'>),
                    exerciseSets: exerciseSetsOfSource,
                    processedSources: processedSources,
                };
                sources.push(extendedSource);
            } else {
                const extendedSource: ExtendedSourceDocument = {
                    ...(source.toObject() as Omit<ExtendedSourceDocument, 'exerciseSets'>),
                    exerciseSets: exerciseSetsOfSource,
                    processedSources: [],
                };
                sources.push(extendedSource);
            }
        }

        return { isSuccess: true, message: 'All exercise sets read', sources };
    }

    async readById(id: string): Promise<ReadSingleExerciseSetResponse> {
        const exerciseSet = await this.db.ExerciseSet.findById(id);
        if (!exerciseSet) {
            return { isSuccess: false, message: `no exerciseSet found by id ${id}` };
        }
        return {
            isSuccess: true,
            message: `exerciseSet read by id ${id}`,
            exerciseSet,
        };
    }

    /**
     * only updates given fields
    */
    async updateById(id: string, updateExerciseSetDto: UpdateExerciseSetDto): Promise<ResponseBase> {
        const cleanedDto = Object.fromEntries(
            Object.entries(updateExerciseSetDto).filter(([_, value]) => value !== undefined)
        );
        const updated = await this.db.ExerciseSet.findByIdAndUpdate(
            id, 
            { $set: cleanedDto},
            { new: true }
        );

        if (!updated) {
            return {isSuccess: false, message: 'exercise set not found' };
        }
        return { isSuccess: true, message: 'exercise set updated' };
    }

    async deleteById(id: string): Promise<ResponseBase> {
        const deletedExerciseSet = await this.db.ExerciseSet.findByIdAndDelete(id);
        if (!deletedExerciseSet) {
            return { isSuccess: false, message: "exercise set couldn't deleted" };
        }
        return { isSuccess: true, message: "exercise set deleted" };
    }

    async evaluateAnswers(
        evaluateAnswersDto: EvaluateAnswersDto
    ): Promise<EvaluateAnswersResponse> {
        // console.log(`came to the evaluateAnswers service method here is the evaluateAnswersDto: `, evaluateAnswersDto);
        // console.log(`\n`);

        const exerciseAnswerEvaluationResults: ExerciseAnswerEvaluationResult[] = [];
        for (const exercise of evaluateAnswersDto.exercises) {
            const readExerciseByIdResponse = await this.exerciseService.readById(exercise.id);
            if (!readExerciseByIdResponse.isSuccess || !readExerciseByIdResponse.exercise)
                continue; // no exercise read
            // console.log(`exercise read by id: `, readExerciseByIdResponse.exercise);
            // console.log(`\n`);

            const resolveTypeStrategyProviderResponse =
                this.exerciseSetTypeStrategyResolverProvider.resolveTypeStrategyProvider(
                    readExerciseByIdResponse.exercise.type
                );
            if (
                !resolveTypeStrategyProviderResponse.isSuccess ||
                !resolveTypeStrategyProviderResponse.strategy
            )
                continue; // no strategy found
            // console.log(`strategy resolved: `, resolveTypeStrategyProviderResponse.strategy);
            // console.log(`\n`);

            const evaluatedAnswer =
                await resolveTypeStrategyProviderResponse.strategy.evaluateAnswer(
                    readExerciseByIdResponse.exercise,
                    exercise.answer
                );
            if (
                !evaluatedAnswer.isSuccess ||
                evaluatedAnswer.score === undefined ||
                !evaluatedAnswer.feedback
            )
                continue;
            // console.log(`evalutedAnswer in strategy: `, evaluatedAnswer);
            // console.log(`\n`);

            exerciseAnswerEvaluationResults.push({
                exerciseId: exercise.id,
                exerciseType: readExerciseByIdResponse.exercise.type,
                userAnswer: exercise.answer,
                solution: readExerciseByIdResponse.exercise.solution,
                correctChoiceIndex: readExerciseByIdResponse.exercise.correctChoiceIndex,
                score: evaluatedAnswer.score,
                feedback: evaluatedAnswer.feedback,
            });

            // console.log(`1 iteration is done \n\n\n\n\n`);
        }
        // console.log(`the final exercise answer evaluation results: `, exerciseAnswerEvaluationResults);
        // console.log(`\n`);

        let totalOfAllScores: number = 0;
        exerciseAnswerEvaluationResults.forEach(
            (element) => (totalOfAllScores += element.score)
        );
        const overallScore = Math.floor(
            totalOfAllScores / exerciseAnswerEvaluationResults.length
        );

        return {
            isSuccess: true,
            message: 'done',
            overallScore,
            exerciseAnswerEvaluationResults,
        };
    }
}
