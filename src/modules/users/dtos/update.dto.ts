import { IsEmail, MinLength } from 'class-validator';

export default class UpdateDto {
    public first_name: string;
    public last_name: string;
    @IsEmail()
    public email: string;
    @MinLength(6)
    public password: string;

    constructor(first_name: string, last_name: string, email: string, password: string) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}
