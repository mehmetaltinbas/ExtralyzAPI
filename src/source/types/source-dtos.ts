import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSourceDto {
    @IsOptional()
    readonly type!: string;
    @IsOptional()
    readonly rawText!: string;
    // readonly locationType!: string;
    // readonly location!: string;
    @IsOptional()
    readonly title!: string;
}

export class UpdateSourceDto {
    readonly type!: string;
    readonly rawText!: string;
    // readonly locationType!: string;
    // readonly location!: string;
    readonly title!: string;
}
