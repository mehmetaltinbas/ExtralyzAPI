import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';

@Module({
    imports: [],
    providers: [OpenaiService],
    exports: [OpenaiService],
    controllers: [OpenaiController],
})
export class OpenaiModule {}
