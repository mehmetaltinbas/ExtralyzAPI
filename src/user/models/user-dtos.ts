import { IsBoolean, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class SignUpUserDto {
    @IsNotEmpty()
    readonly userName!: string;
    @IsEmail()
    readonly email!: string;
    @IsNotEmpty()
    readonly password!: string;
}

export class UpdateUserDto {
    readonly userName: string | undefined;
    readonly password: string | undefined;
}
