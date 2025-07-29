import { Inject, Injectable } from '@nestjs/common';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { CreateSourceDto, UpdateSourceDto } from './types/source-dtos';
import { Model } from 'mongoose';
import { SourceDocument } from './types/source-interfaces';
import { ReadAllSourcesResponse, ReadSingleSourceResponse } from './types/source-responses';

@Injectable()
export class SourceService {
    constructor(@Inject('DB_MODELS') private db: Record<'Source', Model<SourceDocument>>) {}

    async createAsync(
        userId: string,
        createSourceDto: CreateSourceDto
    ): Promise<ResponseBase> {
        const source = await this.db.Source.create(createSourceDto);
        if (!source) {
            return { isSuccess: false, message: "source couldn't created" };
        }
        return { isSuccess: true, message: 'source created' };
    }

    async readAllAsync(): Promise<ReadAllSourcesResponse> {
        const sources = await this.db.Source.find();
        if (sources.length === 0) {
            return { isSuccess: false, message: 'no source found' };
        }
        return { isSuccess: true, message: 'all sources read', sources };
    }

    async readByIdAsync(id: string): Promise<ReadSingleSourceResponse> {
        const source = await this.db.Source.findOne({ _id: id });
        if (!source) {
            return { isSuccess: false, message: "source couldn't read" };
        }
        return { isSuccess: true, message: `source read by id ${id}`, source };
    }

    async updateByIdAsync(
        id: string,
        updateSourceDto: UpdateSourceDto
    ): Promise<ResponseBase> {
        const source = await this.db.Source.findOneAndUpdate({ _id: id }, updateSourceDto, {
            new: true,
        });
        if (!source) {
            return { isSuccess: false, message: 'source not found' };
        }
        return { isSuccess: true, message: 'source updated' };
    }

    async deleteByIdAsync(id: string): Promise<ResponseBase> {
        const source = await this.db.Source.findOneAndDelete({ _id: id });
        if (!source) {
            return { isSuccess: false, message: 'source not found' };
        }
        return { isSuccess: true, message: 'source deleted' };
    }
}
