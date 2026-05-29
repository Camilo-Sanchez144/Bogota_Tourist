import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TripPlaceDto } from "./TripPlace.dto";

export class TripDayDto {

    @IsNotEmpty()
    @IsNumber()
    day_number!: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @ValidateNested({ each: true })
    @Type(() => TripPlaceDto)
    place!: TripPlaceDto[];
}