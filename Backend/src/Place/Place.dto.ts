import { IsString, IsOptional, MaxLength } from 'class-validator'

export class CreatePlaceDto {
    @IsString()
    @MaxLength(150)
    name!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    category?: string
}

export class EditPlaceDto {
    @IsOptional()
    @IsString()
    @MaxLength(150)
    name?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    category?: string
}