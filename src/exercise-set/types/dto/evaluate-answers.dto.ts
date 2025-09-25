import { IsNotEmpty, IsOptional } from 'class-validator';

class Exercise {
    @IsNotEmpty()
    readonly id!: string;

    @IsNotEmpty()
    readonly answer!: string;
}

export class EvaluateAnswersDto {
    @IsNotEmpty()
    readonly exercises!: Exercise[];
}
