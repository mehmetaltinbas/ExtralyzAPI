// eslint-disable-next-line no-redeclare
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';
import { AuthGuard } from '../auth/auth.guard';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateExerciseSetDto } from './types/dto/create-exercise-set.dto';

@Controller('exercise-set')
export class ExerciseSetController {
    constructor(private exerciseSetService: ExerciseSetService) {}

    @Post('create/:sourceId')
    @UseGuards(AuthGuard)
    async create(
        @Param('sourceId') sourceId: string,
        @Body() createExerciseSetDto: CreateExerciseSetDto
    ): Promise<ResponseBase> {
        console.log("exercise set hit!");
        const response = await this.exerciseSetService.create(sourceId, createExerciseSetDto);
        return response;
    }
}
