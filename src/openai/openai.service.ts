import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import ResponseBase from '../shared/interfaces/response-base.interface';
import { OpenaiCompletionResponse } from './types/openai-responses';

@Injectable()
export class OpenaiService {
    private readonly openaiApiKey: string;
    private readonly openaiClient: OpenAI;
    private readonly model = 'gpt-4.1-mini';

    constructor(private configService: ConfigService) {
        this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY')!;
        this.openaiClient = new OpenAI({
            apiKey: this.openaiApiKey,
        });
    }

    async generateAbstractiveSummary(text: string): Promise<OpenaiCompletionResponse> {
        const completion = await this.openaiClient.chat.completions.create({
            model: this.model,
            messages: [
                { role: 'developer', content: 'talk like a Ragnar Lothbrok' },
                { role: 'user', content: `Hey Ragnar! What do you think about my CV: ${text}` },
            ],
        });
        return {
            isSuccess: true,
            message: 'completion is done',
            completion: completion.choices[0].message.content!,
        };
    }
}
