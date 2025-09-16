import { Module } from '@nestjs/common';
import { ExerciseSetController } from './exercise-set.controller';
import { ExerciseSetService } from './exercise-set.service';
import { OpenaiModule } from '../openai/openai.module';
import { SourceModule } from '../source/source.module';
import { ProcessedSourceModule } from '../processed-source/processed-source.module';
import { ExerciseModule } from '../exercise/exercise.module';
import { ShortTypeStrategyProvider } from 'src/exercise-set/strategies/type/short-type.strategy.provider';
import { MCQTypeStrategyProvider } from 'src/exercise-set/strategies/type/mcq-type.strategy.provider';
import { TrueFalseTypeStrategyProvider } from 'src/exercise-set/strategies/type/true-false-type.strategy.provider';
import { OpenEndedTypeStrategyProvider } from 'src/exercise-set/strategies/type/open-ended-type.strategy.provider';
import { ExerciseSetTypeStrategyResolverProvider } from 'src/exercise-set/strategies/type/exercise-set-type-strategy-resolver.provider';

@Module({
    imports: [ExerciseModule, OpenaiModule, SourceModule, ProcessedSourceModule],
    controllers: [ExerciseSetController],
    providers: [ExerciseSetService, ExerciseSetTypeStrategyResolverProvider, MCQTypeStrategyProvider, TrueFalseTypeStrategyProvider, OpenEndedTypeStrategyProvider, ShortTypeStrategyProvider],
})
export class ExerciseSetModule {}
