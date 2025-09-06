import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExerciseDto {
    @IsNotEmpty()
    readonly type!: string;

    @IsNotEmpty()
    readonly difficulty!: string;

    @IsNotEmpty()
    readonly prompt!: string;

    @IsOptional()
    solution?: string;

    @IsOptional()
    choices?: string[];

    @IsOptional()
    correctChoiceIndex?: number;
}
