import { forwardRef, Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { TextExtractorModule } from './text-extractor/text-extractor.module';
import { OpenaiModule } from '../openai/openai.module';
import { ProcessedSourceModule } from '../processed-source/processed-source.module';

@Module({
    imports: [TextExtractorModule, OpenaiModule, ProcessedSourceModule],
    providers: [SourceService],
    controllers: [SourceController],
    exports: [SourceService],
})
export class SourceModule {}
