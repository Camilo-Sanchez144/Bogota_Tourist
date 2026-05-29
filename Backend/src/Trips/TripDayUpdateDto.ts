import { IsOptional, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TripPlaceUpdateDto } from "./TripPlaceUpdateDto";

export class TripDayUpdateDto {

    @IsOptional()
    @IsNumber()
    day_number?: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TripPlaceUpdateDto)
    places?: TripPlaceUpdateDto[];
}