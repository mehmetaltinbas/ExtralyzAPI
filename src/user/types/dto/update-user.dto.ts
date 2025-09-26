import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    readonly userName: string | undefined;

    @IsOptional()
    readonly password: string | undefined;
}
