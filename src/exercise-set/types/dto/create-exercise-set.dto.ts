import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExerciseSetDto {
    @IsNotEmpty()
    readonly count!: number;

    @IsNotEmpty()
    readonly type!: string;

    @IsNotEmpty()
    readonly difficulty!: string;
}
