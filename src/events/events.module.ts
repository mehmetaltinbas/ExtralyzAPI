import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EventsGateway } from 'src/events/events.gateway';
import { ExerciseSetModule } from 'src/exercise-set/exercise-set.module';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { ProcessedSourceModule } from 'src/processed-source/processed-source.module';
import { SourceModule } from 'src/source/source.module';

@Module({
    imports: [
        AuthModule,
        SourceModule,
        ProcessedSourceModule,
        ExerciseSetModule,
        ExerciseModule,
    ],
    providers: [EventsGateway],
    exports: [],
})
export class EventsModule {}
