import { forwardRef, Inject, Injectable } from '@nestjs/common';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { Model } from 'mongoose';
import { ProcessedSourceDocument } from './types/processed-source-interfaces';
import {
    ReadAllProcessedSourcesResponse,
    ReadSingleProcessedSourceResponse,
} from './types/processed-source-responses';
import {
    CreateProcessedSourceDto,
    UpdateProcessedSourceDto,
} from './types/processed-source-dtos';
import { SourceService } from '../source/source.service';

@Injectable()
export class ProcessedSourceService {
    constructor(
        @Inject('DB_MODELS')
        private db: Record<'ProcessedSource', Model<ProcessedSourceDocument>>,
        @Inject(forwardRef(() => SourceService)) private sourceService: SourceService
    ) {}

    async create(
        sourceId: string,
        createProcessedSourceDto: CreateProcessedSourceDto
    ): Promise<ResponseBase> {
        await this.db.ProcessedSource.create({
            sourceId,
            ...createProcessedSourceDto,
        });
        return { isSuccess: true, message: 'processed source created' };
    }

    async readAll(): Promise<ReadAllProcessedSourcesResponse> {
        const processedSources = await this.db.ProcessedSource.find();
        if (processedSources.length === 0) {
            return { isSuccess: false, message: 'no processed sources found' };
        }
        return { isSuccess: true, message: 'all processed sources read', processedSources };
    }

    async readAllByUserId(userId: string): Promise<ReadAllProcessedSourcesResponse> {
        const response = await this.sourceService.readAllByUserId(userId);
        if (!response.isSuccess || response.sources === undefined) {
            return response;
        }
        const sourceIds = response.sources.map(source => source._id);
        const processedSources = await this.db.ProcessedSource.find({
            sourceId: { $in: sourceIds },
        });
        if (processedSources.length === 0) {
            return { isSuccess: false, message: 'no processed sources found' };
        }
        return { isSuccess: true, message: 'all processed sources read', processedSources };
    }

    async readById(id: string): Promise<ReadSingleProcessedSourceResponse> {
        const processedSource = await this.db.ProcessedSource.findById(id);
        if (!processedSource) {
            return { isSuccess: false, message: `no processed source found by id ${id}` };
        }
        return {
            isSuccess: true,
            message: `processed source read by id ${id}`,
            processedSource,
        };
    }

    async readAllBySourceId(sourceId: string): Promise<ReadAllProcessedSourcesResponse> {
        const processedSources = await this.db.ProcessedSource.find({ sourceId });
        if (processedSources.length === 0) {
            return {
                isSuccess: false,
                message: `processed sources couldn't read by sourceId: ${sourceId}`,
            };
        }
        return {
            isSuccess: true,
            message: `all processed sources read by sourceId: ${sourceId}`,
            processedSources,
        };
    }

    async updateById(
        id: string,
        updateProcessedSourceDto: UpdateProcessedSourceDto
    ): Promise<ResponseBase> {
        const updatedProcessedSource = await this.db.ProcessedSource.findOneAndUpdate(
            {
                _id: id,
            },
            updateProcessedSourceDto,
            { new: true }
        );
        if (!updateProcessedSourceDto) {
            return { isSuccess: false, message: `couldn't updated` };
        }
        return { isSuccess: true, message: 'updated' };
    }

    async deleteById(id: string): Promise<ResponseBase> {
        const deletedProcessedSource = await this.db.ProcessedSource.findOneAndDelete({
            _id: id,
        });
        if (!deletedProcessedSource) {
            return { isSuccess: false, message: `processed source couldn't deleted` };
        }
        return { isSuccess: true, message: 'processed source deleted' };
    }
}
