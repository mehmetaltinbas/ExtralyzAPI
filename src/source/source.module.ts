import { forwardRef, Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { AuthModule } from '../auth/auth.module';
import { TextExtractorModule } from './text-extractor/text-extractor.module';
import { OpenaiModule } from '../openai/openai.module';
import { ProcessedSourceModule } from '../processed-source/processed-source.module';

@Module({
    imports: [AuthModule, TextExtractorModule, OpenaiModule, ProcessedSourceModule],
    providers: [SourceService],
    controllers: [SourceController],
    exports: [SourceService],
})
export class SourceModule {}
