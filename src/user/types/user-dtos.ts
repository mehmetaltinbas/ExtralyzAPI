import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpUserDto {
    @IsNotEmpty()
    readonly userName!: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email!: string;

    @IsNotEmpty()
    readonly password!: string;
}

export class UpdateUserDto {
    readonly userName: string | undefined;
    readonly password: string | undefined;
}
