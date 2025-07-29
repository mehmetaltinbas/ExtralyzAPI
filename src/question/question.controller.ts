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

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    // @Post('create')
    // async create(): ResponseBase {

    // }

    // @Get('read-all')
    // async readAll(): ResponseBase {

    // }

    // @Get('read-by-id')
    // async readById(): ResponseBase {

    // }

    // @Patch('update-by-id')
    // async updateById(): ResponseBase {

    // }

    // @Delete('delete-by-id')
    // async deleteById(): ResponseBase {

    // }
}
