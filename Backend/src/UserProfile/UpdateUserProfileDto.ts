import { IsOptional, IsNotEmpty, IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
export class UpdateUserProfileDto{
    
    @IsNotEmpty()
    @IsOptional()
    bio!:String;

    @IsOptional()
    @IsNotEmpty()
    profile_picture!: String;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date_of_birth!:Date

    @IsNotEmpty()
    @IsOptional()
    user!: Number;

} 