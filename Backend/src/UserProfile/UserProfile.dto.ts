import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";
export class UserProfileDto{

        @IsNotEmpty()
        @IsString()
        bio!:String;

        @IsString()
        @IsNotEmpty()
        profile_picture!: String;

        @IsNotEmpty()
        @IsDate()
        date_of_birth!:Date

        @IsNotEmpty()
        @IsNumber()
        user!: Number;
}