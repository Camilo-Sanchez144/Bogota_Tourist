import { IsNotEmpty, IsString, IsNumber } from "class-validator";
export class PostDto{

    @IsNotEmpty()
    @IsString()
    title!:string;

    @IsNotEmpty()
    @IsString()
    description!:string
}