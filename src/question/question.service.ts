import { Inject, Injectable } from '@nestjs/common';
import { QuestionDocument } from './types/question-interfaces';
import { Model } from 'mongoose';
import {
    ReadAllQuestionsResponse,
    ReadSingleQuestionResponse,
} from './types/question-responses';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateMultipleQuestionDto } from './types/question-dtos';
import { OpenaiService } from '../openai/openai.service';
import { SourceService } from '../source/source.service';
import { ProcessedSourceService } from '../processed-source/processed-source.service';
import { countWords } from 'src/shared/utilities/count-words.utility';

@Injectable()
export class QuestionService {
    constructor(
        @Inject('DB_MODELS') private db: Record<'Question', Model<QuestionDocument>>,
        private openaiService: OpenaiService,
        private sourceService: SourceService,
        private processedSourceService: ProcessedSourceService
    ) {}

    async createMultiple(
        sourceId: string,
        createMultipleQuestionDto: CreateMultipleQuestionDto
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
        const generateQuestionsResponse = await this.openaiService.generateQuestions(
            text,
            createMultipleQuestionDto.type,
            createMultipleQuestionDto.difficulty,
            createMultipleQuestionDto.intendedQuestionCount
        );
        if (!generateQuestionsResponse.isSuccess) {
            return generateQuestionsResponse;
        }
        generateQuestionsResponse.questions.forEach((question) => {
            if (isProcessedSource) {
                question.processedSourceId = sourceId;
            } else {
                question.sourceId = sourceId;
            }
        });
        await this.db.Question.insertMany(generateQuestionsResponse.questions);
        return { isSuccess: true, message: 'question created' };
    }

    async readAll(): Promise<ReadAllQuestionsResponse> {
        const questions = await this.db.Question.find();
        if (questions.length === 0) {
            return { isSuccess: false, message: 'no question found' };
        }
        return { isSuccess: true, message: 'all questions read', questions };
    }

    async readById(id: string): Promise<ReadSingleQuestionResponse> {
        const question = await this.db.Question.findById(id);
        if (!question) {
            return { isSuccess: false, message: 'no question found' };
        }
        return { isSuccess: true, message: `question read by id: ${id}`, question };
    }

    async readAllBySourceId(sourceId: string): Promise<ReadAllQuestionsResponse> {
        const questions = await this.db.Question.find({ sourceId });
        if (!questions || questions.length === 0) {
            return { isSuccess: false, message: `no question found that has sourceId: ${sourceId}` };
        }
        return { isSuccess: true, message: `all questions read that has sourceId: ${sourceId}`, questions };
    }

    async readAllByProcessedSourceId(processedSourceId: string): Promise<ReadAllQuestionsResponse> {
        const questions = await this.db.Question.find({ processedSourceId });
        if (!questions || questions.length === 0) {
            return { isSuccess: false, message: `no question found that has processedSourceId: ${processedSourceId}` };
        }
        return { isSuccess: true, message: `all questions read that has processedSourceId: ${processedSourceId}`, questions };
    }

    // async updateById() {

    // }

    async deleteById(id: string): Promise<ResponseBase> {
        const deletedQuestion = await this.db.Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return { isSuccess: false, message: 'no question found to delete' };
        }
        return { isSuccess: true, message: `question deleted by id: ${id}` };
    }
}
