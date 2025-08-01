import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConnectionModule } from './db/db-connection.module';
import { DbModelsModule } from './db/db-models.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SourceModule } from './source/source.module';
import { ProcessedSourceModule } from './processed-source/processed-source.module';
import { QuestionModule } from './question/question.module';
import { OpenaiModule } from './openai/openai.module';

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
        QuestionModule,
        OpenaiModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
