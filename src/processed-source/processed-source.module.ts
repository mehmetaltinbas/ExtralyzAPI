import { Module } from '@nestjs/common';
import { ProcessedSourceController } from './processed-source.controller';
import { ProcessedSourceService } from './processed-source.service';

@Module({
    controllers: [ProcessedSourceController],
    providers: [ProcessedSourceService],
    exports: [ProcessedSourceService],
})
export class ProcessedSourceModule {}
