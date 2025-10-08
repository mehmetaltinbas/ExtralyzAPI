import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSourceDto {
    @IsOptional()
    readonly type!: string;

    @IsOptional()
    readonly title!: string;
}
