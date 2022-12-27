import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export default class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    @MinLength(6)
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
