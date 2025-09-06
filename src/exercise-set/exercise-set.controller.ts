// eslint-disable-next-line no-redeclare
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';
import { AuthGuard } from '../auth/auth.guard';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateExerciseSetDto } from './types/dto/create-exercise-set.dto';
import { ReadAllExerciseSetsResponse } from './types/response/read-all-exercise-sets.response';
import User from '../shared/custom-decorators/user.decorator';
import JwtPayload from '../auth/types/jwt-payload.interface';

@Controller('exercise-set')
export class ExerciseSetController {
    constructor(private exerciseSetService: ExerciseSetService) {}

    @Post('create/:sourceId')
    @UseGuards(AuthGuard)
    async create(
        @Param('sourceId') sourceId: string,
        @Body() createExerciseSetDto: CreateExerciseSetDto
    ): Promise<ResponseBase> {
        console.log('exercise set hit!');
        const response = await this.exerciseSetService.create(sourceId, createExerciseSetDto);
        return response;
    }

    @Get('read-all-by-user-id')
    @UseGuards(AuthGuard)
    async readAllByUserId(@User() user: JwtPayload): Promise<ReadAllExerciseSetsResponse> {
        const response = await this.exerciseSetService.readAllByUserId(user.sub);
        return response;
    }
}
