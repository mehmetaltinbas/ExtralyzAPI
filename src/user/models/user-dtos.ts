export class SignUpUserDto {
    readonly userName: string | undefined;
    readonly email: string | undefined;
    readonly password: string | undefined;
}

export class UpdateUserDto {
    readonly userName: string | undefined;
    readonly password: string | undefined;
}
