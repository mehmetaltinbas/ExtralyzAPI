import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMultipleExerciseDto {
    @IsNotEmpty()
    readonly intendedQuestionCount!: number;

    @IsNotEmpty()
    readonly type!: string;

    @IsNotEmpty()
    readonly difficulty!: string;
}
