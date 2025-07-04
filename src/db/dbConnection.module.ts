import { Module } from '@nestjs/common';
import { dbConnectionProvider } from './dbConnection.provider';

@Module({
    providers: [dbConnectionProvider],
    exports: [dbConnectionProvider],
})
export class DbConnectionModule {}
