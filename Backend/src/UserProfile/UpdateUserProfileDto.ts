import { IsOptional, IsNotEmpty, IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
export class UpdateUserProfileDto{
    
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    bio?:string;

    @IsOptional()
    @IsNotEmpty()
    profile_picture?: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date_of_birth?:Date

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    user?: number;

} 