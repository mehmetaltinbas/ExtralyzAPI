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
import { ExerciseService } from './exercise.service';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateMultipleExerciseDto } from './types/exercise-dtos';
import { ReadAllQuestionsResponse } from './types/exercise-responses';

@Controller('exercise')
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Post('create-multiple/:sourceId')
    async createMultiple(
        @Param('sourceId') sourceId: string,
        @Body() createMultipleExerciseDto: CreateMultipleExerciseDto
    ): Promise<ResponseBase> {
        const response = await this.exerciseService.createMultiple(
            sourceId,
            createMultipleExerciseDto
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
        const response = await this.exerciseService.readAllBySourceId(sourceId);
        return response;
    }

    @Get('read-all-by-processed-source-id/:processedSourceId')
    async readAllByProcessedSourceId(@Param('processedSourceId') processedSourceId: string): Promise<ReadAllQuestionsResponse> {
        const response = await this.exerciseService.readAllByProcessedSourceId(processedSourceId);
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
