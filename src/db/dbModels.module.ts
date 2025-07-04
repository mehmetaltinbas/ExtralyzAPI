import { Global, Module } from '@nestjs/common';
import { dbModelsProvider } from './dbModels.provider';
import { DbConnectionModule } from './dbConnection.module';

@Global()
@Module({
    imports: [DbConnectionModule],
    providers: [dbModelsProvider],
    exports: [dbModelsProvider],
})
export class DbModelsModule {}
