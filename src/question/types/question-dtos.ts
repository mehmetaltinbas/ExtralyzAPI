import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMultipleQuestionDto {
    @IsNotEmpty()
    readonly intendedQuestionCount!: number;

    @IsNotEmpty()
    readonly type!: string;

    @IsNotEmpty()
    readonly difficulty!: string;
}
