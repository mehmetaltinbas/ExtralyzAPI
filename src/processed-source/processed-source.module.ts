import { forwardRef, Module } from '@nestjs/common';
import { ProcessedSourceController } from './processed-source.controller';
import { ProcessedSourceService } from './processed-source.service';
import { SourceModule } from '../source/source.module';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
    imports: [forwardRef(() => SourceModule), OpenaiModule],
    controllers: [ProcessedSourceController],
    providers: [ProcessedSourceService],
    exports: [ProcessedSourceService],
})
export class ProcessedSourceModule {}
