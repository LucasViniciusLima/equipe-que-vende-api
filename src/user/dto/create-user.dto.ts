import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../interfaces/user.entity";


export class CreateUserDto extends User{
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'senha muito fraca',
    })
    password: string;

    @IsString()
    name: string;

    @IsString()
    checkout_id: string;
}