import { IsNotEmpty, IsString, IsNumber } from "class-validator";
export class UserDto{

    @IsNotEmpty()
    @IsString()
    username!:String;

    @IsNotEmpty()
    @IsString()
    email!:String;

    @IsNotEmpty()
    @IsString()
    password!:String;

    @IsNotEmpty()
    @IsString()
    first_name!:String;

    @IsNotEmpty()
    @IsString()
    last_name!:String;

    @IsNotEmpty()
    @IsNumber()
    cellphone!:number;
}