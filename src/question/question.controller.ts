import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Inject, // eslint-disable-next-line no-redeclare
    Body,
    Param,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateMultipleQuestionDto } from './types/question-dtos';
import { ReadAllQuestionsResponse } from './types/question-responses';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Post('create-multiple/:sourceId')
    async createMultiple(
        @Param('sourceId') sourceId: string,
        @Body() createMultipleQuestionDto: CreateMultipleQuestionDto
    ): Promise<ResponseBase> {
        const response = await this.questionService.createMultiple(
            sourceId,
            createMultipleQuestionDto
        );
        return response;
    }

    @Get('read-all')
    async readAll(): Promise<ResponseBase> {
        const response = await this.readAll();
        return response;
    }

    @Get('read-by-id/:id')
    async readById(@Param('id') id: string): Promise<ResponseBase> {
        const response = await this.readById(id);
        return response;
    }

    @Get('read-all-by-source-id/:sourceId')
    async readAllBySourceId(@Param('sourceId') sourceId: string): Promise<ReadAllQuestionsResponse> {
        const response = await this.questionService.readAllBySourceId(sourceId);
        return response;
    }

    @Get('read-all-by-processed-source-id/:processedSourceId')
    async readAllByProcessedSourceId(@Param('processedSourceId') processedSourceId: string): Promise<ReadAllQuestionsResponse> {
        const response = await this.questionService.readAllByProcessedSourceId(processedSourceId);
        return response;
    }

    // @Patch('update-by-id')
    // async updateById(): ResponseBase {

    // }

    @Delete('delete-by-id/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = await this.deleteById(id);
        return response;
    }
}
