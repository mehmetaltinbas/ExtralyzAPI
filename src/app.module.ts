import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConnectionModule } from './db/db-connection.module';
import { DbModelsModule } from './db/db-models.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SourceModule } from './source/source.module';
import { ProcessedSourceModule } from './processed-source/processed-source.module';
import { ExerciseModule } from './exercise/exercise.module';
import { OpenaiModule } from './openai/openai.module';
import { ExerciseSetModule } from './exercise-set/exercise-set.module';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DbConnectionModule,
        DbModelsModule,
        UserModule,
        AuthModule,
        SourceModule,
        ProcessedSourceModule,
        ExerciseSetModule,
        ExerciseModule,
        OpenaiModule,
        EventsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
