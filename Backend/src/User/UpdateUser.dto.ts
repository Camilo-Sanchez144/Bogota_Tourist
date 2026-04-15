import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateUserDto{

    @IsNotEmpty()
    @IsOptional()
    username!:String;

    @IsNotEmpty()
    @IsOptional()
    email!:String;

    @IsNotEmpty()
    @IsOptional()
    password!:String;

    @IsNotEmpty()
    @IsOptional()
    first_name!:String;

    @IsNotEmpty()
    @IsOptional()
    last_name!:String;

    @IsNotEmpty()
    @IsOptional()
    cellphone!:number;
}