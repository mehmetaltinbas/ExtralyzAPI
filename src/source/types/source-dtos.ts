import { IsNotEmpty } from 'class-validator';

export class CreateSourceDto {
    readonly type!: string;
    readonly rawText!: string;
    // readonly locationType!: string;
    // readonly location!: string;
    readonly title!: string;
}

export class UpdateSourceDto {
    readonly type!: string;
    readonly rawText!: string;
    // readonly locationType!: string;
    // readonly location!: string;
    readonly title!: string;
}
