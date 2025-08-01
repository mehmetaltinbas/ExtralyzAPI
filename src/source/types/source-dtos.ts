import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSourceDto {
    @IsOptional()
    readonly type!: string;

    @IsOptional()
    readonly rawText!: string;

    @IsOptional()
    readonly title!: string;
}

export class UpdateSourceDto {
    readonly type!: string;
    readonly rawText!: string;
    readonly title!: string;
}
