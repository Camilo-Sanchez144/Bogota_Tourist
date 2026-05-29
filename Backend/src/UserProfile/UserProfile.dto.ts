import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";
export class UserProfileDto{

        @IsNotEmpty()
        @IsString()
        bio!:String;

        @IsNotEmpty()
        @Type(() => Date)
        @IsDate()
        date_of_birth!:Date
}