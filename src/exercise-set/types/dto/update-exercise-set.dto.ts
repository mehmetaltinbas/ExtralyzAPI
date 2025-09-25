import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateExerciseSetDto {
    @IsOptional()
    readonly type?: string;

    @IsOptional()
    readonly difficulty?: string;

    @IsOptional()
    readonly count?: number;

    @IsOptional()
    readonly title?: string;
}
