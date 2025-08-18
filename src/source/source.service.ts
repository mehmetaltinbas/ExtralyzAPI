import { Inject, Injectable } from '@nestjs/common';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateSourceDto, UpdateSourceDto } from './types/source-dtos';
import { Model } from 'mongoose';
import { SourceDocument } from './types/source-interfaces';
import { ReadAllSourcesResponse, ReadSingleSourceResponse } from './types/source-responses';
import { Express } from 'express';
import { TextExtractorService } from './text-extractor/text-extractor.service';
import { OpenaiService } from '../openai/openai.service';
import { ProcessedSourceService } from '../processed-source/processed-source.service';

@Injectable()
export class SourceService {
    constructor(
        @Inject('DB_MODELS') private db: Record<'Source', Model<SourceDocument>>,
        private textExtractorService: TextExtractorService,
        private openaiService: OpenaiService,
        private processedSourceService: ProcessedSourceService
    ) {}

    async create(
        userId: string,
        createSourceDto: CreateSourceDto,
        file: Express.Multer.File
    ): Promise<ResponseBase> {
        const textExtractor = this.textExtractorService.resolveExtractor(file.mimetype);
        const extractedText = await textExtractor.extractText(file.buffer);
        await this.db.Source.create({
            userId,
            type: 'document', // later text and youtubeUrl should be added using a pattern
            title: file.originalname,
            rawText: extractedText,
        });
        return { isSuccess: true, message: 'source created' };
    }

    async readAll(userId: string): Promise<ReadAllSourcesResponse> {
        const sources = await this.db.Source.find({ userId });
        if (sources.length === 0) {
            return { isSuccess: false, message: 'no source found' };
        }
        return { isSuccess: true, message: 'all sources read', sources };
    }

    async readById(id: string): Promise<ReadSingleSourceResponse> {
        const source = await this.db.Source.findOne({ _id: id });
        if (!source) {
            return { isSuccess: false, message: "source couldn't read" };
        }
        return { isSuccess: true, message: `source read by id ${id}`, source };
    }

    async readAllByUserId(userId: string): Promise<ReadAllSourcesResponse> {
        const sources = await this.db.Source.find({ userId });
        if (sources.length === 0) {
            return { isSuccess: false, message: 'no source found' };
        }
        return {
            isSuccess: true,
            message: `all sources read associated by userId: ${userId}`,
            sources,
        };
    }

    async updateById(id: string, updateSourceDto: UpdateSourceDto): Promise<ResponseBase> {
        const updatedSource = await this.db.Source.findOneAndUpdate(
            { _id: id },
            updateSourceDto,
            {
                new: true,
            }
        );
        if (!updatedSource) {
            return { isSuccess: false, message: 'source not found' };
        }
        return { isSuccess: true, message: 'source updated' };
    }

    async deleteById(id: string): Promise<ResponseBase> {
        const deletedSource = await this.db.Source.findOneAndDelete({ _id: id });
        if (!deletedSource) {
            return { isSuccess: false, message: 'source not found' };
        }
        return { isSuccess: true, message: 'source deleted' };
    }

    async processById(id: string): Promise<ResponseBase> {
        const source = await this.db.Source.findById(id);
        if (!source) {
            return { isSuccess: false, message: `source couldn't read with id: ${id}` };
        }
        const abstractiveSummarizationResponse =
            await this.openaiService.generateAbstractiveSummary(source.rawText);
        const processedSourceCreationResponse = await this.processedSourceService.create(
            source._id,
            {
                title: ``,
                processedText: abstractiveSummarizationResponse.completion,
            }
        );
        if (!processedSourceCreationResponse.isSuccess) {
            return processedSourceCreationResponse;
        }
        return { isSuccess: true, message: 'source processed, processed source created' };
    }
}
