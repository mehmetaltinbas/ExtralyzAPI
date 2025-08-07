import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProcessedSourceDto {
    title!: string;
    processedText!: string;
}

export class UpdateProcessedSourceDto {}
