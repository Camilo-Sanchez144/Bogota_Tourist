import { IsNotEmpty, IsOptional, IsNumber, IsEmail, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    last_name?: string;
    
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    cellphone?: number;
}