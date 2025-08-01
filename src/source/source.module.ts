import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { AuthModule } from '../auth/auth.module';
import { TextExtractorModule } from './text-extractor/text-extractor.module';
import { OpenaiModule } from '../openai/openai.module';

@Module({
    imports: [AuthModule, TextExtractorModule, OpenaiModule],
    providers: [SourceService],
    controllers: [SourceController],
})
export class SourceModule {}
