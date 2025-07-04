import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConnectionModule } from './db/dbConnection.module';
import { DbModelsModule } from './db/dbModels.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DbConnectionModule,
        DbModelsModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
