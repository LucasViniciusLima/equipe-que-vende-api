import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Seller } from "../interfaces/seller.entity";



export class CreateSellerDto extends Seller{
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

}