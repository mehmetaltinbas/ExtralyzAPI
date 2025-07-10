import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConnectionModule } from './db/db-connection.module';
import { DbModelsModule } from './db/db-models.module';
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
