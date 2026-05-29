import { IsOptional, IsNumber, IsString, IsDateString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TripDayUpdateDto } from "./TripDayUpdateDto";

export class TripUpdateDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    start_date?: Date;

    @IsOptional()
    @IsDateString()
    end_date?: Date;

    @IsOptional()
    @IsNumber()
    number_of_people?: number;

    @IsOptional()
    @IsNumber()
    total_budget?: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TripDayUpdateDto)
    days?: TripDayUpdateDto[];
}