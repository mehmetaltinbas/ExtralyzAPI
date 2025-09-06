import { Module } from '@nestjs/common';
import { ExerciseSetController } from './exercise-set.controller';
import { ExerciseSetService } from './exercise-set.service';
import { OpenaiModule } from '../openai/openai.module';
import { SourceModule } from '../source/source.module';
import { ProcessedSourceModule } from '../processed-source/processed-source.module';
import { ExerciseModule } from '../exercise/exercise.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule, ExerciseModule, OpenaiModule, SourceModule, ProcessedSourceModule],
    controllers: [ExerciseSetController],
    providers: [ExerciseSetService],
})
export class ExerciseSetModule {}
