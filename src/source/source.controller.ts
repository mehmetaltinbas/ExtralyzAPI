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
    Req,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto, UpdateSourceDto } from './types/source-dtos';
import { ReadAllSourcesResponse, ReadSingleSourceResponse } from './types/source-responses';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { AuthGuard } from '../auth/auth.guard';
import JwtPayload from '../auth/types/jwt-payload.interface';
import User from '../shared/custom-decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('source')
export class SourceController {
    constructor(private sourceService: SourceService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @User() user: JwtPayload,
        @Body() createSourceDto: CreateSourceDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ResponseBase> {
        const response = await this.sourceService.createAsync(user.sub, createSourceDto, file);
        return response;
    }

    @Get('read-all')
    async readAll(): Promise<ReadAllSourcesResponse> {
        const response = await this.sourceService.readAllAsync();
        return response;
    }

    @Get('read-by-id/:id')
    async readById(@Param('id') id: string): Promise<ReadSingleSourceResponse> {
        const response = await this.sourceService.readByIdAsync(id);
        return response;
    }

    @Patch('update-by-id/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateSourceDto: UpdateSourceDto
    ): Promise<ResponseBase> {
        const response = await this.sourceService.updateByIdAsync(id, updateSourceDto);
        return response;
    }

    @Delete('delete-by-id/:id')
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = await this.sourceService.deleteByIdAsync(id);
        return response;
    }
}
