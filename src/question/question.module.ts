import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { OpenaiModule } from '../openai/openai.module';
import { SourceModule } from '../source/source.module';
import { ProcessedSourceModule } from '../processed-source/processed-source.module';

@Module({
    imports: [OpenaiModule, SourceModule, ProcessedSourceModule],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule {}
