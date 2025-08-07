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
        const response = await this.sourceService.create(user.sub, createSourceDto, file);
        return response;
    }

    @Get('read-all')
    async readAll(): Promise<ReadAllSourcesResponse> {
        const response = await this.sourceService.readAll();
        return response;
    }

    @Get('read-by-id/:id')
    async readById(@Param('id') id: string): Promise<ReadSingleSourceResponse> {
        const response = await this.sourceService.readById(id);
        return response;
    }

    @Get('read-by-user-id/:userId')
    async readAllByUserId(@Param('userId') userId: string): Promise<ReadAllSourcesResponse> {
        const response = await this.sourceService.readAllByUserId(userId);
        return response;
    }

    @Patch('update-by-id/:id')
    @UseGuards(AuthGuard)
    async updateById(
        @Param('id') id: string,
        @Body() updateSourceDto: UpdateSourceDto
    ): Promise<ResponseBase> {
        const response = await this.sourceService.updateById(id, updateSourceDto);
        return response;
    }

    @Delete('delete-by-id/:id')
    @UseGuards(AuthGuard)
    async deleteById(@Param('id') id: string): Promise<ResponseBase> {
        const response = await this.sourceService.deleteById(id);
        return response;
    }

    @Post('process-by-id/:id')
    @UseGuards(AuthGuard)
    async processById(@Param('id') id: string): Promise<ResponseBase> {
        const response = await this.sourceService.processById(id);
        return response;
    }
}
