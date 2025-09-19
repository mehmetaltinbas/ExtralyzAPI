import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProcessedSourceDto {
    @IsOptional()
    title!: string;

    @IsNotEmpty()
    tone!: string;

    @IsNotEmpty()
    style!: string;

    @IsNotEmpty()
    perspective!: string;

    @IsNotEmpty()
    comprehensionLevel!: string;

    @IsNotEmpty()
    length!: string;
}

export class UpdateProcessedSourceDto {}
