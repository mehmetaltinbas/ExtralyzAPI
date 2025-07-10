import { Global, Module } from '@nestjs/common';
import { dbModelsProvider } from './db-models.provider';
import { DbConnectionModule } from './db-connection.module';

@Global()
@Module({
    imports: [DbConnectionModule],
    providers: [dbModelsProvider],
    exports: [dbModelsProvider],
})
export class DbModelsModule {}
