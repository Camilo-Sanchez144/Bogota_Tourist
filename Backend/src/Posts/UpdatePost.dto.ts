import { IsOptional, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdatePostDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    user!:number;
}