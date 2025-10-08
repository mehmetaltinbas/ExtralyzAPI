import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSourceDto {
    readonly type!: string;
    readonly title!: string;
}
