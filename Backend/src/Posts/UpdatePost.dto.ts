import { IsOptional, IsNotEmpty } from "class-validator";

export class UpdatePostDto {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    user!:number;
}