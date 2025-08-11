import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { OpenaiModule } from '../openai/openai.module';
import { SourceModule } from '../source/source.module';
import { ProcessedSourceModule } from '../processed-source/processed-source.module';

@Module({
    imports: [OpenaiModule, SourceModule, ProcessedSourceModule],
    controllers: [ExerciseController],
    providers: [ExerciseService],
})
export class QuestionModule {}
