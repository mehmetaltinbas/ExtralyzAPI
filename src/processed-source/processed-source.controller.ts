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
import { ProcessedSourceService } from './processed-source.service';
import ResponseBase from '../shared/interfaces/response-base.interface';

@Controller('processed-source')
export class ProcessedSourceController {
    constructor(private processedSourceService: ProcessedSourceService) {}

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
