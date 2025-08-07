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
                { role: 'developer', content: 'you are an document analyst' },
                {
                    role: 'user',
                    content: `here is a document: "\n${text}\n"\nrearrange this document and make a shorter version by depending on these principles:\n"
                        - Rearrange content for smoother readability and better understanding. Be free to rearrange document's order if needed for smoother understanding.\n
                        - Eliminate redundancy while retaining key details.\n
                        - Ensure all sections and supplementary topics are included.\n
                        - Introduce brief clarifications, examples, or context where beneficial to deepen the reader's understanding.\n
                        - Use a clear, professional tone; simplify complex concepts for wider accessibility. Simplify complex ideas without losing important details.\n
                        - Retain all factual details and improve clarity of delivery.\n
                        - Stick to the document's intent without adding unrelated ideas."`,
                },
            ],
        });
        return {
            isSuccess: true,
            message: 'completion is done',
            completion: completion.choices[0].message.content!,
        };
    }
}
