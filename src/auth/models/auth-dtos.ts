import { IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    readonly userName!: string;
    @IsNotEmpty()
    readonly password!: string;
}
