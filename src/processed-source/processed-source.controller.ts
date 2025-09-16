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
import {
    CreateProcessedSourceDto,
    UpdateProcessedSourceDto,
} from './types/processed-source-dtos';
import {
    ReadAllProcessedSourcesResponse,
    ReadSingleProcessedSourceResponse,
} from './types/processed-source-responses';
import { AuthGuard } from '../auth/auth.guard';
import User from '../shared/custom-decorators/user.decorator';
import JwtPayload from '../auth/types/jwt-payload.interface';

@Controller('processed-source')
@UseGuards(AuthGuard)
export class ProcessedSourceController {
    constructor(private processedSourceService: ProcessedSourceService) {}

    // @Post('create')
    // async create(@Body() createProcessedSourceDto: CreateProcessedSourceDto): Promise<ResponseBase> {
    //     const response = await this.processedSourceService.create(createProcessedSourceDto);
    //     return response;
    // }

    @Get('read-all')
    async readAll(): Promise<ReadAllProcessedSourcesResponse> {
        const response = await this.processedSourceService.readAll();
        return response;
    }

    @Get('read-by-id/:id')
    async readById(@Param('id') id: string): Promise<ReadSingleProcessedSourceResponse> {
        const response = await this.processedSourceService.readById(id);
        return response;
    }

    @Get('read-all-by-user-id')
    async readAllByUserId(@User() user: JwtPayload): Promise<ReadAllProcessedSourcesResponse> {
        const response = await this.processedSourceService.readAllByUserId(user.sub);
        return response;
    }

    @Get('read-all-by-source-id/:sourceId')
    async readAllBySourceId(
        @Param('sourceId') sourceId: string
    ): Promise<ReadAllProcessedSourcesResponse> {
        const response = await this.processedSourceService.readAllBySourceId(sourceId);
        return response;
    }

    @Patch('update-by-id/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateProcessedSourceDto: UpdateProcessedSourceDto
    ): Promise<ResponseBase> {
        const response = await this.processedSourceService.updateById(
            id,
            updateProcessedSourceDto
        );
        return response;
    }

    @Delete('delete-by-id/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = await this.processedSourceService.deleteById(id);
        return response;
    }
}
